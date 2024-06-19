import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ApiService } from '../../../services/api.service';
import { ControlComponent } from '../control/control.component';
import { LetterPresentationSlide } from '@src/app/models/slideshow.model';

@Component({
  selector: 'app-letter-presentation',
  templateUrl: './letter-presentation.component.html',
  styleUrls: ['./letter-presentation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonGrid, IonRow, IonCol, ControlComponent],
})
export class LetterPresentationComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  @Input() templateId!: number;
  slideData!: LetterPresentationSlide;

  ngOnInit() {
    this.apiService.getSlide(this.templateId).subscribe(
      (data: LetterPresentationSlide) => {
        this.slideData = data
      }
    );
  }
}
