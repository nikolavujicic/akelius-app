import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ControlComponent } from '@components/slide/control/control.component'
import { ImageTitleSentenceSlide } from '@models/slideshow.model';

@Component({
  selector: 'app-image-title-sentence',
  templateUrl: './image-title-sentence.component.html',
  styleUrls: ['./image-title-sentence.component.scss'],
  standalone: true,
  imports: [CommonModule, IonGrid, IonRow, IonCol, ControlComponent]
})
export class ImageTitleSentenceComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }
  @Input() templateId!: number;
  slideData!: ImageTitleSentenceSlide;


  ngOnInit() {
    this.apiService.getSlide(this.templateId).subscribe(
      (data: ImageTitleSentenceSlide) => {
        this.slideData = data
      }
    );
  }
}
