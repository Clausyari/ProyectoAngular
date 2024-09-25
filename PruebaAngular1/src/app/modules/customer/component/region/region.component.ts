import { Component, OnInit } from '@angular/core';
import { Region } from '../../_model/region';
import { RegionService } from '../../_service/region.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regions: Region[] = [];
  form!: FormGroup;
  submitted = false;
  formSubmitted = false; // Nueva variable para evitar duplicaciones

  constructor(
    private regionService: RegionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getRegions();

    this.form = this.formBuilder.group({
      region: ['', Validators.required],
      tag: ['', Validators.required]
    });
  }

  getRegions() {
    this.regions = this.regionService.getRegions();
  }

  showModalForm() {
    this.formSubmitted = false; // Resetear este estado cuando se muestra el modal
    $("#modalForm").modal("show");
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  onSubmit() {
    console.log("Formulario enviado");
    this.submitted = true;

    // Verificar si el formulario es inválido o si ya ha sido enviado
    if (this.form.invalid || this.formSubmitted) {
      return;
    }

    // Marcar como enviado para evitar duplicación
    this.formSubmitted = true;

    const newRegion: Region = {
      region_id: 0,
      region: this.form.value.region,
      tag: this.form.value.tag,
      status: 1
    };

    // Solo agregar la región si no está ya duplicada
    this.regions.push(newRegion);
    this.regionService.addRegion(newRegion);

    this.hideModalForm();
    this.form.reset();
    this.submitted = false;
    this.formSubmitted = false; // Restablecer el estado después de la finalización
  }
}