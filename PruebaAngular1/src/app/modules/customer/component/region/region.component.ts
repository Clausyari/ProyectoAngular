import { Component, OnInit } from '@angular/core';
import { Region } from '../../_model/region';
import { RegionService } from '../../_service/region.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared-module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../../authentication/component/login.component';
import Swal from 'sweetalert2';
import { SwalMessages } from '../../../../shared/swal-messages';

declare var $: any;

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [SharedModule, CommonModule, ReactiveFormsModule, LoginComponent],
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regions: Region[] = [];
  form: FormGroup;
  loading = false;
  swal: SwalMessages = new SwalMessages();
  current_date = new Date();

  constructor(
    private regionService: RegionService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      region: ['', Validators.required],
      tag: ['', Validators.required]
    });    
  }

  ngOnInit() {
    this.getRegions();
  }

  showModalForm() {
    $("#modalForm").modal("show");
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  getRegions() {
    this.regions = this.regionService.getRegions();
    /*this.loading = true; // Activar el gif de loading
    this.regionService.getRegions().subscribe({
      next: (data) => {
        this.regions = data; // Asignar los datos recuperados de la API a la lista de regiones
        this.loading = false; // Desactivar el gif de loading
        this.current_date = new Date(); // Actualizar la fecha actual
      },
      error: (error) => {
        console.error('Error al obtener las regiones', error);
        this.loading = false;
        alert('Error al cargar las regiones. Por favor, intenta más tarde.');
      }
    });*/
  }

  onSubmit() {
    if (this.form.invalid) {
      this.swal.errorMessage('Por favor, completa los campos obligatorios.');
      return;
    }
  
    this.loading = true;
  
    let id = this.regions.length + 1;
    let region = new Region(
      id,
      this.form.controls['region'].value!,
      this.form.controls['tag'].value!,
      1
    );
  
    /*this.regionService.addRegion(region).subscribe({
      next: (response) => {
        console.log('Región registrada con éxito', response);
        this.getRegions();
        this.hideModalForm();
        this.loading = false;
        Swal.fire('Éxito', 'La región ha sido registrada.', 'success');
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al registrar la región', error);
        Swal.fire('Error', 'Ocurrió un error al registrar la región.', 'error');
      }
    });*/
    // Agregar la nueva región a la lista local
    this.regions.push(region);

    // Mostrar mensaje de confirmación
    this.swal.successMessage("La región ha sido registrada");

    // Limpiar el formulario
    this.form.reset();
    
    // Cerrar el modal
    this.hideModalForm();
    this.loading = false;
  }
}