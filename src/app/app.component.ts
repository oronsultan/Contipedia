import { Component, OnInit, ViewChild, EventEmitter } from "@angular/core";
import { DataService } from "./services/data.service";
import { Observable } from "rxjs";
import { Idata } from "../models/iData";
import "hammerjs";
import { MatGridList } from "@angular/material";

const gridByBreakpoint = [
  { width: 1200, col: 3 },
  { width: 992, col: 2 },
  { width: 768, col: 2 },
  { width: 450, col: 1 }
];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  data: Idata[];
  currentContinent: Idata;
  traveledClr: string;
  traveledClrHover: string;
  title = "Country Information";
  newTraveledValue: string;
  divVisibilty = false;
  breakpoint = gridByBreakpoint[0].col;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const self = this;
    this.dataService.getData().subscribe(res => {
      self.data = res;
      // this.data = this.dataService.getData() as Idata[];
      // console.log('My Items', item);
      this.traveledClr = "#c2d87f";
      this.traveledClrHover = "#488743";
      this.currentContinent = this.data[0];
    });

    this.onResize(window.innerWidth);
  }

  onResize(width) {
    for (let i = 0; i < gridByBreakpoint.length; i++) {
      if (width <= gridByBreakpoint[i].width) {
        this.breakpoint = gridByBreakpoint[i].col;
      } else {
        break;
      }
    }

    console.log(this.breakpoint)
  }

  onChange(newValue) {
    this.currentContinent = this.data[newValue - 1];
  }
  onRowClicked() {
    this.divVisibilty = true;
  }
  onKey(e) {
    this.newTraveledValue = e.target.value;
  }
  updateItem() {
    this.currentContinent.Traveled = this.newTraveledValue;
    this.data[this.currentContinent.id - 1] = this.currentContinent;
    alert("Continent " + this.currentContinent.name + " successfully updated ");
    this.divVisibilty = false;
  }
}
