import { Component, OnInit } from '@angular/core';
import { CarrucelService } from '../../../../services/animations/carrucel.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private carrucelService: CarrucelService) {}

  ngOnInit(): void {
    this.carrucelService.carrucel();
  }
}
