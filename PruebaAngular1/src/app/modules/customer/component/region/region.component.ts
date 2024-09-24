import { Component, OnInit } from '@angular/core';
import { Region } from '../../_model/region';
import { RegionService } from '../../_service/region.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  regions: Region[] = [];

  constructor(private regionService: RegionService) {}

  ngOnInit() {
    this.getRegions();
  }

  getRegions() {
    this.regions = this.regionService.getRegions();
  }
}