import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ResultService, ResultType} from '../result-service/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public resultList: ResultType[] = [];
  public matchDates: { date: Date }[];

  constructor(private resultService: ResultService,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchData();
  }


  fetchData(): void {
    this.resultList = this.resultService.getResults();
    const matchDates: any[] = this.resultList.map((result) => result.matchDate);
    this.matchDates = Array.from(new Set<string>(matchDates)).map((d) => {
      return {
        date: new Date(d)
      };
    }).sort((a: any, b: any) => b.date - a.date);
  }

  editResult(value: ResultType): void {
    this.router.navigateByUrl(`result/edit/${value.id}`);
  }


}
