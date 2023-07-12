import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {
    const isComingFromLogin = history.state?.fromLogin || false;

    if (!isComingFromLogin) {
      sessionStorage.clear();
      // this.location.replaceState('/');
    }
  }
}