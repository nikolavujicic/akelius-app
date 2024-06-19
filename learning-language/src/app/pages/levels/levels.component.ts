import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ApiService } from '@services/api.service';
import { GetLevelsResponse, Level } from '@models/levels.model';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink]
})
export class LevelsComponent implements OnInit {
  levels: Level[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getLevels().subscribe(
      (data: GetLevelsResponse) => {
        this.levels = data.levels;
      }
    );
  }
}
