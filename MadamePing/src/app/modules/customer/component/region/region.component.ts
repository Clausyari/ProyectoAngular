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
    // Indicar que el formulario fue enviado
    this.submitted = true;
    
    // Validar si el formulario es inválido (si los campos están vacíos o no cumplen validaciones)
    if (this.form.invalid) return;

    // Si el formulario es válido, proceder a agregar la nueva región
    let id = this.regions.length + 1; // Asignar un ID basado en el tamaño actual de la lista de regiones
    let region = new Region(
        id,
        this.form.controls['region'].value!, // Obtener el valor del control 'region'
        this.form.controls['tag'].value!,    // Obtener el valor del control 'tag'
        0                                   // Status por defecto (suponiendo que es 1)
    );

    // Agregar la nueva región a la lista de regiones
    this.regions.push(region);

    // Mostrar un mensaje de éxito usando SweetAlert2
    this.swal.successMessage("La región ha sido registrada");

    // Resetear la variable `submitted` para permitir el envío de otro formulario
    this.submitted = false;

    // Resetear el formulario y cerrar el modal
    this.form.reset();  // Limpiar los campos del formulario
    this.hideModalForm();  // Cerrar el modal
  }
}