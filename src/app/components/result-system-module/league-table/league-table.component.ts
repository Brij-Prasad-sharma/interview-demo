import { Component, OnInit } from '@angular/core';
import {ResultService, ResultType} from '../result-service/result.service';
import {DataTableModel} from '../../../services/main.service';
import {ColumnType} from '../../../mockData/columnType';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit {

  public dataTable: DataTableModel<ResultType> = new DataTableModel<ResultType>();
  constructor(private resultService: ResultService) {
  }

  ngOnInit() {
    this.dataTable.columnType = this.resultService.getCollectionType();
    this.dataTable.data = this.resultService.getResults();
  }

}
