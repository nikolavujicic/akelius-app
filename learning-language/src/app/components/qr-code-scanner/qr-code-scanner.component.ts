import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { addIcons } from "ionicons";
import { cameraOutline } from 'ionicons/icons';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton]
})
export class QrCodeScannerComponent implements OnInit {
  @Output() codeScanned = new EventEmitter<any>();

  constructor() { addIcons({ cameraOutline }) }

  ngOnInit() {
    this.checkAndInstallBarcodeModule();
  }

  async checkAndInstallBarcodeModule() {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  async startScan() {
    const status = await BarcodeScanner.checkPermissions();

    if (status.camera === 'granted') {
      const result: any = await BarcodeScanner.scan();
      this.codeScanned.emit(result);
    } else {
      console.log('Camera permission denied');
      await BarcodeScanner.requestPermissions();
    }
  }

  stopScan() {
    BarcodeScanner.stopScan();
  }
}