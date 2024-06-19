import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { QrCodeScannerComponent } from '@components/qr-code-scanner/qr-code-scanner.component'
import { ApiService } from '@services/api.service';
import { GetStepsResponse, Step } from '@models/steps.model';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, QrCodeScannerComponent]
})
export class StepsComponent implements OnInit {
  steps: Step[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('levelId');
      if (id !== null) this.onStepsIdLoaded(id)
    });
    this.lockScreenOrientation();
  }

  onStepsIdLoaded(id: string) {
    this.apiService.getLevelSteps(id).subscribe(
      (data: GetStepsResponse) => {
        this.steps = data.steps;
      }
    );
  }

  async lockScreenOrientation() {
    await ScreenOrientation.lock({ orientation: 'portrait' });
  }

  codeScanned(event: any) {
    if (event?.barcodes?.length) {
      const displayValue = event?.barcodes?.[0].displayValue;
      this.router.navigate([`/slideshow/${displayValue}`]);
    }
  }
}
