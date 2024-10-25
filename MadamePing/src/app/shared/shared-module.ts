import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
imports: [FormsModule, ReactiveFormsModule, CommonModule],
exports: [FormsModule, ReactiveFormsModule],
})
export class SharedModule{}