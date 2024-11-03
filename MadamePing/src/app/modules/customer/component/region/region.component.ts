import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Region } from '../../_model/region';
import { RegionService } from '../../_service/region.service';
import { SharedModule } from '../../../../shared/shared-module';
import { SwalMessages } from '../../../../shared/swal-messages';
declare var $: any;

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regions: Region[] = [];
  form: FormGroup;
  submitted = false;
  loading = false;
  current_date = new Date();
  swal: SwalMessages = new SwalMessages();
  region_id = 0;

  constructor(
    private regionService: RegionService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      region: ['', Validators.required],
      tag: ['', Validators.required]
    });
  }

  showModalForm(isEdit: boolean = false) {
    if (!isEdit) {
      this.resetVariables();
    }
    $("#modalForm").modal("show");
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  getRegions() {
    this.loading = true;
    this.regionService.getRegions().subscribe({
      next: (v) => {
        this.regions = v;
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.getRegions();
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    console.log('region_id:', this.region_id);
    console.log('form data:', this.form.value);
    if (this.region_id === 0) {
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate() {
    this.regionService.createRegion(this.form.value).subscribe({
      next: (response) => {
        console.log('Región creada:', response);
        this.swal.successMessage("Se creó una nueva región");
        this.getRegions();
        this.hideModalForm();
      },
      error: (error) => {
        console.error('Error al crear la región', error);
        this.swal.errorMessage(error.error.message || 'Error desconocido');
      }
    });
  }

  onSubmitUpdate() {
    this.regionService.updateRegion(this.form.value, this.region_id).subscribe({
      next: (response) => {
        this.swal.successMessage("Región actualizada correctamente");
        this.getRegions();
        this.hideModalForm();
      },
      error: (error) => {
        console.error('Error al actualizar la región', error);
        this.swal.errorMessage(error.error.message || 'Error desconocido');
      }
    });
  }  

  updateRegion(region: Region) {
    this.region_id = region.region_id; 
    this.form.patchValue(region);
    console.log('Actualizando región con ID:', this.region_id, 'y datos:', region);
    this.showModalForm(true);
  }

  enableRegion(id: number) {
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la activación",
      text: "¿Está seguro de que desea activar esta región?",
    }).then((result) => {
      if (result.isConfirmed) {
        this.regionService.enableRegion(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message); 
            this.getRegions();
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });
  }

  disableRegion(id: number) {
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la desactivación",
      text: "¿Está seguro de que desea desactivar esta región?",
    }).then((result) => {
      if (result.isConfirmed) {
        this.regionService.disableRegion(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.message); 
            this.getRegions(); // Cargar las regiones después de desactivar
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error.message);
          }
        });
      }
    });
  }  

  resetVariables() {
    this.form.reset();
    this.submitted = false;
    this.region_id = 0;
  }
}