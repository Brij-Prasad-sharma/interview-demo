import { Injectable } from '@angular/core';
import {ColumnDataType} from '../../../services/main.service';
import {ColumnType} from '../../../mockData/columnType';
import {Router} from '@angular/router';


export interface DataTableValueType<T> {
  value: T;
  type: string;
}

export class Team {
  Name: DataTableValueType<string>;
  Pld: DataTableValueType<number>;
  W: DataTableValueType<number>;
  L: DataTableValueType<number>;
  D: DataTableValueType<number>;
  Pts: DataTableValueType<number>;
  Pos: DataTableValueType<number>;
}

export class ResultType {
  id: number;
  teamOne: string;
  teamTwo: string;
  scoreOne: number;
  scoreTwo: number;
  matchDate: Date;
  winner: string;
  looser: string;
  draw: string;
}


@Injectable({
  providedIn: 'root'
})

export class ResultService {

  private resultList: ResultType[] = [];
  private readonly columnDataType: ColumnDataType[] = ColumnType;

  constructor(private readonly router: Router) { }

  // fetch data from localstorage if exists
  getOfflineData(): ResultType[] {
    return localStorage.getItem('resultSystem') ? JSON.parse(localStorage.getItem('resultSystem')) : [];
  }

  getCollectionType(): Array<ColumnDataType> {
    return this.columnDataType;
  }

  // saving the result data tp local storage
  saveResult(resultData: ResultType): void {
    if (resultData.teamOne === resultData.teamTwo) return; // If both team name is same then exit the function
    this.resultList = this.getOfflineData();

    // For updating the result
    const index = this.resultList.findIndex((result) => result.id === resultData.id);
    if (index !== -1) {
      this.resultList[index] = resultData;
    } else {
      this.resultList.push(resultData);
    }

    // storing the data in localstorage
    localStorage.setItem('resultSystem', JSON.stringify(this.resultList));
    this.router.navigateByUrl('result/league-table');
  }

  getResults(): ResultType[] | [] {
    return this.getOfflineData();
  }

}
