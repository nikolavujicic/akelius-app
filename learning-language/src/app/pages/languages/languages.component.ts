import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { ApiService } from '@services/api.service';
import { RouterLink } from '@angular/router';
import { GetLanguagesResponse, LanguageModel } from '@models/language.model'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem]
})
export class LanguagesComponent {
  languages: LanguageModel[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getLanguages().subscribe(
      (data: GetLanguagesResponse) => {
        this.languages = data.languages;
      }
    );
    this.lockScreenOrientation();
  }

  async lockScreenOrientation() {
    await ScreenOrientation.lock({ orientation: 'portrait' });
  }
}
