import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerImageService } from '../../commons/_service/customer-image.service'; 
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-customer-image',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './customer-image.component.html',
    styleUrls: ['./customer-image.component.css']
})
export class CustomerImageComponent implements OnInit {
    customer: any = {}; // Datos del cliente
    customerImages: any[] = []; // Arreglo para almacenar imágenes del cliente

    constructor(
        private customerImageService: CustomerImageService, 
        private ngxService: NgxPhotoEditorService,
        private router: Router // Inyecta el servicio Router
    ) { }

    ngOnInit() {
        this.loadCustomerData(); // Carga la información del cliente
    }

    // Cargar datos del cliente
    loadCustomerData() {
        this.customerImageService.getCustomerData().subscribe({
            next: (data: any) => {
                // Maneja los datos del cliente
                this.customer = data; // Guarda los datos del cliente en el objeto customer
                this.customerImages = data.images; // Asumiendo que el servidor devuelve un campo 'images'
                console.log('Datos del cliente:', this.customer);
                console.log('Imágenes del cliente:', this.customerImages);
            },
            error: (err: any) => {
                console.error('Error al obtener los datos del cliente:', err);
            }
        });
    }

    // Manejo del cambio de archivo (subir nueva imagen)
    fileChangeHandler(event: any) {
        this.ngxService.open(event.target.files[0], {
            aspectRatio: 1 / 1,
            autoCropArea: 1,
            resizeToWidth: 360,
            resizeToHeight: 360,
        }).subscribe(data => {
            this.updateCustomerImage(data.base64!);
        });
    }

    // Actualización de imagen del cliente
    updateCustomerImage(image: string) {
        let customerImage: any = { customer_image_id: this.customer.image.customer_image_id, image: image };
        this.customerImageService.updateCustomerImage(customerImage).subscribe({
            next: (v) => {
                Swal.fire('Éxito', v.message, 'success');
                this.loadCustomerData(); // Refresca los datos después de actualizar
            },
            error: (e) => {
                console.error(e);
                Swal.fire('Error', e.error.message, 'error');
            }
        });
    }

    // Redirección a otra página
    redirect(url: string) {
        this.router.navigate([url]);
    }

    // Redirige a la imagen del cliente
    redirectToImageEditor() {
        this.redirect('/customer-image');
    }
}