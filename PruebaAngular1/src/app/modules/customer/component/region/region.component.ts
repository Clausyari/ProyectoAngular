import { Component, OnInit } from '@angular/core';
import { Region } from '../../_model/region';
import { RegionService } from '../../_service/region.service';
import { FormBuilder, FormGroup } from '@angular/forms'; // Importa FormBuilder y FormGroup
import { SharedModule } from '../../../../shared/shared-module';// Importa el SharedModule
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [SharedModule, CommonModule], // Agrega SharedModule a los imports
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regions: Region[] = [];
  form: FormGroup; // Define el formulario

  constructor(
    private regionService: RegionService,
    private formBuilder: FormBuilder // Inyecta FormBuilder
  ) {
    // Inicializa el formulario reactivo
    this.form = this.formBuilder.group({
      region: [''],
      tag: ['']
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
  }
  onSubmit() {
    let id = this.regions.length + 1; // Generar ID basado en la cantidad de regiones
    let region = new Region(
      id, 
      this.form.controls['region'].value!, // Obtener el valor del control 'region'
      this.form.controls['tag'].value!,    // Obtener el valor del control 'tag'
      1 // Estatus por defecto
    );
    this.regions.push(region); // Agregar la nueva región al array
    this.hideModalForm(); // Ocultar el modal
    alert("La región ha sido registrada"); // Mostrar mensaje de confirmación
  }
}
