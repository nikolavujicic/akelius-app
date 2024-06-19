import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, from, switchMap, tap } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@capacitor/network';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //to get Network IP address you can type this command in terminal and replace baseUrl with result
  //ifconfig en0 | grep 'inet ' | grep -v '127.0.0.1' | awk '{ print $2 }'
  private wifiIP = `http://192.168.1.5`;
  private baseUrl = `${this.wifiIP}:3000`;
  private storage: Storage | null = null;

  constructor(private http: HttpClient, private toastController: ToastController, private location: Location) {
    this.initStorage();
  }

  async initStorage() {
    const storage = new Storage();
    this.storage = await storage.create();
  }

  getLanguages(): Observable<any> {
    return this.fetchAndCacheData('languages', `${this.baseUrl}/languages`);
  }

  getLevels(): Observable<any> {
    return this.fetchAndCacheData('levels', `${this.baseUrl}/levels`);
  }

  getLevelSteps(levelId: string): Observable<any> {
    return this.fetchAndCacheData(`/levels/${levelId}`, `${this.baseUrl}/levels/${levelId}`);
  }

  getSlideshows(slideshowId: string): Observable<any> {
    const redirect = () => this.location.back();
    return this.fetchAndCacheData(`/slideshows/${slideshowId}`, `${this.baseUrl}/slideshows/${slideshowId}`, redirect);
  }

  getSlide(slideId: number): Observable<any> {
    return this.fetchAndCacheData(`/slides/${slideId}`, `${this.baseUrl}/slides/${slideId}`);
  }

  private fetchAndCacheData(key: string, url: string, toastDismiss?: () => void): Observable<any> {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        if (status.connected) {
          return this.http.get(url).pipe(
            tap(async (data: any) => {
              await this.storage?.set(key, data);
            }),
            catchError((error) => {
              console.error(`Error fetching ${key}`, error);
              this.presentToast(`Error fetching ${key} : ${error?.message}`, toastDismiss);
              return this.getDataFromStorage(key);
            })
          );
        } else {
          this.presentToast(`No network`);
          console.error('No network');
          return this.getDataFromStorage(key, toastDismiss);
        }
      })
    );
  }

  private getDataFromStorage(key: string, toastDismiss?: () => void): Observable<any> {
    if (!this.storage) {
      return of([]);
    }

    return from(this.storage.get(key)).pipe(
      tap((data) => {
        if (!data) {
          this.presentToast(`Error fetching ${key} from storage`, toastDismiss);
        }
      })
    );
  }

  async presentToast(message: string, toastDismiss?: () => void) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });

    toast.onDidDismiss().then(() => {
      if (toastDismiss) {
        toastDismiss();
      }
    });
    await toast.present();
  }
}
