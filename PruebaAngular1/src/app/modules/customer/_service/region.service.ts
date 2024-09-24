import { Injectable } from '@angular/core';
import { Region } from '../_model/region';

@Injectable({
    providedIn: 'root'
})
export class RegionService {
    getRegions(): Region[] {
        let regions: Region[] = [];

        let region: Region = new Region(0, "Norte", "N", 1); regions.push(region);
        region = new Region(1, "Sur", "S", 1); regions.push(region);
        region = new Region(2, "Noreste", "NE", 0); regions.push(region);
        region = new Region(3, "Pacífico", "P", 0); regions.push(region);
        region = new Region(4, "Oeste", "O", 1); regions.push(region);
        region = new Region(5, "Sureste", "SE", 0); regions.push(region);

        return regions;
    }
}