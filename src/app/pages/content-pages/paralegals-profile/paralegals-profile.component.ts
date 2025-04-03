import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ClaimProfileService } from '../claim-profile/claimProfile.service';
export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  colors: string[],
  chart: NgApexchartsModule;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[],
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels,
  stroke: ApexStroke,
  grid: ApexGrid,
  legend?: ApexLegend,
  tooltip?: ApexTooltip,
  // crosshairs?:
  plotOptions?: ApexPlotOptions,
  labels?: string[],
  fill: ApexFill,
  markers?: ApexMarkers,
  theme: ApexTheme,
  responsive: ApexResponsive[]
};

@Component({
  selector: 'app-paralegals-profile',
  templateUrl: './paralegals-profile.component.html',
  styleUrls: ['./paralegals-profile.component.scss']
})
export class ParalegalsProfileComponent implements OnInit {
  activeTab: string = 'overview'; // Default active tab
  selectedParalegal: any = null;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  testimonials = [
    {
      name: 'Michael Carter',
      review: 'Jane is incredibly detail-oriented and efficient. She made the legal process seamless.',
      date: 'April 5, 2021',
      designation: 'Attorney'
    },
    {
      name: 'Sophia Reynolds',
      review: 'Her research skills are outstanding, and she always delivers on time.',
      date: 'June 15, 2022',
      designation: 'Legal Consultant'
    },
    {
      name: 'Daniel Harris',
      review: 'Jane is professional and thorough, ensuring every document is flawless.',
      date: 'August 3, 2020',
      designation: 'Senior Partner'
    },
    {
      name: 'Emily Turner',
      review: 'She provided invaluable support on a complex case. Highly reliable!',
      date: 'November 20, 2019',
      designation: 'Law Firm Manager'
    },
    {
      name: 'James Mitchell',
      review: 'Jane’s dedication and precision make her an asset to any legal team.',
      date: 'September 8, 2023',
      designation: 'Litigation Specialist'
    }
  ];
  

  currentIndex = 0;
  progressData = [
    { name: "Appeals", percentage: 20, color: "#B3BAC4" },  // Gray
    { name: "Child Custody", percentage: 100, color: "#0077C8" }, // Blue
    { name: "Child Support", percentage: 20, color: "#33C5BF" }, // Teal
    { name: "Divorce & Separation", percentage: 20, color: "#99C9E9" }, // Light Blue
    { name: "Family", percentage: 20, color: "#F59280" } // Coral
  ];

  progressWidths: number[] = [];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  constructor(private claimProfileService: ClaimProfileService) {

    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut",
        width: 400

      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      colors: ["#0077C8", "#33C5BF", "#99C9E9", "#F59280", "#B3BAC4"],
      legend: {
        show: false // Hide legend
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }

  ngOnInit(): void {
    // Try to get data from service first
    this.claimProfileService.selectedParalegal$.subscribe(paralegal => {
      if (paralegal) {
        this.selectedParalegal = paralegal;
        localStorage.setItem('selectedParalegal', JSON.stringify(paralegal));
      }
    });

    // If no data in service, check localStorage
    if (!this.selectedParalegal) {
      const storedParalegal = localStorage.getItem('selectedParalegal');
      if (storedParalegal) {
        this.selectedParalegal = JSON.parse(storedParalegal);
      }
    }
  }
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }
}
