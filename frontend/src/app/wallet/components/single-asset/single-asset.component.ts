import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-single-asset',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './single-asset.component.html',
  styleUrl: './single-asset.component.scss'
})
export class SingleAssetComponent {}
