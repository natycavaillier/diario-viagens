import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { map, Observable } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-common-locals',
  templateUrl: './common-locals.component.html',
  styleUrls: ['./common-locals.component.scss'],
})
export class CommonLocalsComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  chartData$?: Observable<ChartData>;

  config: ChartConfiguration['options'] = {
    responsive: false,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
      },
    },
  };

  ngOnInit(): void {
    this.chartData$ = this.dashboardService.getCommonLocals().pipe(
      map((data) => {
        return {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
            },
          ],
        };
      })
    );
  }
}
