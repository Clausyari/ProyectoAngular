import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPhotoEditorModule } from 'ngx-photo-editor';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, NgxPhotoEditorModule, CommonModule],
    exports: [FormsModule, ReactiveFormsModule, NgxPhotoEditorModule],
})
export class SharedModule {}