import { Injectable } from '@angular/core';
import { Region } from '../_model/region';

@Injectable({
    providedIn: 'root'
})
export class RegionService {
    private regions: Region[] = []; // Define el array de regiones a nivel de clase

    constructor() {
        // Inicializa las regiones aquí
        this.regions.push(new Region(0, "Norte", "N", 1));
        this.regions.push(new Region(1, "Sur", "S", 1));
        this.regions.push(new Region(2, "Noreste", "NE", 0));
        this.regions.push(new Region(3, "Pacífico", "P", 0));
        this.regions.push(new Region(4, "Oeste", "O", 1));
        this.regions.push(new Region(5, "Sureste", "SE", 0));
    }

    getRegions(): Region[] {
        return this.regions; // Devuelve la lista de regiones almacenadas
    }

    addRegion(region: Region): void {
        this.regions.push(region); // o cualquier otra lógica que necesites
    }
}