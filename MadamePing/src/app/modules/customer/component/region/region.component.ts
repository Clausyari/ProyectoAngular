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
export class RegionComponent {
  regions:Region[] = [];
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

  showModalForm() {
    this.submitted = false;
    this.form.reset();
    this.region_id = 0; // Resetear ID al abrir el modal
    $("#modalForm").modal("show");
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  getRegions(){
    this.regionService.getRegions().subscribe({
      next: (v) => {
        console.log(v);
        this.regions = v;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  
  ngOnInit(){
    this.getRegions();
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    if (this.region_id === 0) {
      this.onCreateRegion(this.form.value);
    } else {
      this.onUpdateRegion(this.form.value, this.region_id);
    }
  }

  onCreateRegion(region: any) {
    this.regionService.createRegion(region).subscribe({
      next: (response) => {
        console.log('Región creada:', response);
        this.regions.push(response); // Agregar la nueva región a la lista
        this.swal.successMessage("La región ha sido registrada");
        this.form.reset();
        this.hideModalForm();
        this.getRegions(); // Actualizar la lista
      },
      error: (error) => {
        console.error('Error al crear la región', error);
        this.swal.errorMessage(error.error.message); // Mostrar error
      }
    });
  }

  onUpdateRegion(region: any, id: number) {
    this.regionService.updateRegion(region, id).subscribe({
      next: (response) => {
        console.log('Región actualizada:', response);
        this.swal.successMessage("La región ha sido actualizada");
        this.form.reset();
        this.hideModalForm();
        this.getRegions(); // Actualizar la lista
      },
      error: (error) => {
        console.error('Error al actualizar la región', error);
        this.swal.errorMessage(error.error.message); // Mostrar error
      }
    });
  }

  updateRegion(region: Region) {
    this.region_id = region.region_id; // Asignar ID de la región a actualizar
    this.form.controls['region'].setValue(region.region);
    this.form.controls['tag'].setValue(region.tag);
    this.showModalForm();
  }

  enableRegion(id: number) {
    this.regionService.enableRegion(id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message);
        this.getRegions(); // Actualizar la lista
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error.message); // Mostrar error
      }
    });
  }

  disableRegion(id: number) {
    this.regionService.disableRegion(id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message);
        this.getRegions(); // Actualizar la lista
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error.message); // Mostrar error
      }
    });
  }
}