import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImageTitleSentenceComponent } from './image-title-sentence/image-title-sentence.component';
import { LetterPresentationComponent } from './letter-presentation/letter-presentation.component'
import { MultipleChoiceTextComponent } from './multiple-choice-text/multiple-choice-text.component';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ImageTitleSentenceComponent, LetterPresentationComponent, MultipleChoiceTextComponent]
})
export class SlideComponent {

  @Input() template: string = '';
  @Input() templateId!: number;

  constructor() { }

}
