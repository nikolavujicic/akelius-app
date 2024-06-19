import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { chevronForwardOutline, refreshOutline } from 'ionicons/icons';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCol, IonButton, IonIcon]
})
export class ControlComponent implements OnChanges {
  @Input() audioSrc: string = "";
  @Input() btnDisabled: boolean = true;
  constructor(private dataService: DataService) { addIcons({ chevronForwardOutline, refreshOutline }) }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['audioSrc']?.currentValue) {
      this.playSound()
    }
  }

  playSound() {
    let audio = new Audio();
    audio.src = this.audioSrc;
    audio.load();
    audio.play();
  }

  nextSlide() {
    this.dataService.changeData('some data');
  }

}
