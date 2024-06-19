import { Component, OnInit, Input } from '@angular/core';
import { IonRadioGroup, IonLabel, IonRadio, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { CommonModule } from '@angular/common';
import { ControlComponent } from '@components/slide/control/control.component';
import { MultipleChoiceTextSlide, Option } from '@models/slideshow.model';




@Component({
  selector: 'app-multiple-choice-text',
  templateUrl: './multiple-choice-text.component.html',
  styleUrls: ['./multiple-choice-text.component.scss'],
  standalone: true,
  imports: [CommonModule, IonRadioGroup, IonLabel, IonRadio, IonRow, IonCol, FormsModule, IonGrid, ControlComponent]
})
export class MultipleChoiceTextComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  @Input() templateId: any = "";
  slideData!: MultipleChoiceTextSlide;
  options!: Option[];
  selectedOption!: Option;


  ngOnInit() {
    this.apiService.getSlide(this.templateId).subscribe(
      (data: MultipleChoiceTextSlide) => {
        this.slideData = data;
        this.options = data?.textOptions;
      }
    );
  }
}
