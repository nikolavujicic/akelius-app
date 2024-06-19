import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel]
})
export class MenuPage {

}
