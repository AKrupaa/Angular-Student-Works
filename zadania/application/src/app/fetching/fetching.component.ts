import { Component, OnInit } from '@angular/core';
import { NameService } from '../services/name.service';
import { RecordsService } from '../services/records.service';

@Component({
  selector: 'app-fetching',
  templateUrl: './fetching.component.html',
  styleUrls: ['./fetching.component.css']
})
export class FetchingComponent implements OnInit {

  records = {}

  constructor(private recordsService: RecordsService, private nameService: NameService) { }

  ngOnInit(): void {
    this.records = this.recordsService.getMockData();
    this.nameService.getName();
  }

}
