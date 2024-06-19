import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Participant } from '@models/progress.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ProgressComponent implements OnInit {
  participants: Participant[] = [
    { name: 'Alice', progress: 80, avatar: 'https://assets.codepen.io/1480814/av+1.png', data: [10, 40, 20, 50, 10, 60, 20] },
    { name: 'Bob', progress: 60, avatar: 'https://xsgames.co/randomusers/assets/images/favicon.png', data: [40, 30, 20, 40, 10, 80, 70] },
    { name: 'Charlie', progress: 40, avatar: 'https://avatar.iran.liara.run/public/92', data: [80, 10, 20, 50, 30, 20, 40] },
  ];

  private chart: Chart | undefined;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.createChart();
  }
  ngOnDestroy() {
    this.destroyChart();
  }

  createChart(data?: number[], name?: string) {
    this.destroyChart();
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: `${name ?? 'Nikola'}'s Progress (%)`,
            data: data ?? [10, 40, 20, 40, 50, 60, 70],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.chart = new Chart(ctx, chartConfig);
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

  onParticipantsClick(data?: number[], name?: string) {
    this.createChart(data, name);
  }
}
