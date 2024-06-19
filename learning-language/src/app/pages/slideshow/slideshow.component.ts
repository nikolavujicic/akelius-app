import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from '@components/slide/slide.component'
import { ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { ApiService } from '@services/api.service';
import { DataService } from '@services/data.service';
import { GetSlideshowsResponse, Slide } from '@models/slideshow.model';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
  standalone: true,
  imports: [CommonModule, SlideComponent],
})
export class SlideshowComponent implements OnInit, OnDestroy {
  slides: Slide[] = [];
  slideIndex = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private dataService: DataService) {
    this.dataService.currentData.subscribe(data => {
      if (!!this.slides.length) {
        this.onClickNext();
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('slideshowId');
      if (id !== null) this.onSlideshowIdLoaded(id)
    });
    this.lockScreenOrientation();
  }


  async lockScreenOrientation() {
    await ScreenOrientation.lock({ orientation: 'landscape' });
  }

  async ngOnDestroy() {
    await ScreenOrientation.lock({ orientation: 'portrait' });
  }

  onSlideshowIdLoaded(id: string) {
    this.apiService.getSlideshows(id).subscribe(
      (data: GetSlideshowsResponse) => {
        const sortSlides = data?.slides?.sort((a: Slide, b: Slide) => a.order - b.order)
        this.slides = sortSlides;
      }
    );
  }

  onClickNext() {
    if (this.slideIndex === this.slides.length - 1) {
      this.slideIndex = 0;
      return;
    }
    this.slideIndex = this.slideIndex + 1;
  }
}
