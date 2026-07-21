import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { DashboardService, DashboardStats } from '../../core/services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  stats = signal<DashboardStats | null>(null);

  pieChartData: ChartData<'pie'> = { labels: [], datasets: [{ data: [] }] };
  pieChartOptions: ChartConfiguration<'pie'>['options'] = { responsive: true };

  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartConfiguration<'line'>['options'] = { responsive: true };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.stats.set(data);
        this.buildPieChart(data);
        this.buildLineChart(data);
      },
    });
  }

  private buildPieChart(data: DashboardStats): void {
    this.pieChartData = {
      labels: Object.keys(data.depensesByCategory),
      datasets: [{ data: Object.values(data.depensesByCategory) }],
    };
  }

  private buildLineChart(data: DashboardStats): void {
    this.lineChartData = {
      labels: data.monthlyEvolution.map((m) => m.month),
      datasets: [
        {
          label: 'Revenus',
          data: data.monthlyEvolution.map((m) => m.revenus),
          borderColor: '#4caf50',
          fill: false,
        },
        {
          label: 'Dépenses',
          data: data.monthlyEvolution.map((m) => m.depenses),
          borderColor: '#f44336',
          fill: false,
        },
      ],
    };
  }
}
