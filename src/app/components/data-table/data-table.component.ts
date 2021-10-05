import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataTableModel} from '../../services/main.service';
import {ResultType, Team} from '../result-system-module/result-service/result.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input()
  public tableData: DataTableModel<ResultType> = new DataTableModel<ResultType>();
  // Final List of team model
  public finalData: Team[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  // Only Runs if the change detection is triggered
  ngOnChanges(changes: SimpleChanges) {
    this.preparingLeagueTableData(this.tableData.data);
  }

  // Preparing the league table
  preparingLeagueTableData(result: ResultType[]) {
    // calculating who is winner , looser or draw
    result.forEach((re: ResultType) => {
      if (re.scoreOne === re.scoreTwo) {
        re.draw = `${re.teamOne}:${re.teamTwo}`;
      } else if (re.scoreOne > re.scoreTwo) {
        re.winner = re.teamOne;
        re.looser = re.teamTwo;
      } else if (re.scoreTwo > re.scoreOne) {
        re.winner = re.teamTwo;
        re.looser = re.teamOne;
      }
    });

    // Find unique teams from the resultList from both team names
    const uniqueTeams = new Set([
      ...new Set(result.map((item: ResultType ) => item.teamOne)),
      ...new Set(result.map((item: ResultType ) => item.teamTwo))
    ]);

    // Preparing Team Model
    uniqueTeams.forEach((team: string) => {
      const data: Team = new Team();
      data.Name = {value: team, type: 'Name'};
      data.Pld = { value: result.filter((t) => (t.teamOne === data.Name.value || t.teamTwo === data.Name.value )).length
        , type: 'Pld'};
      data.W = { value: result.filter((t) => t.winner === team).length, type: 'W' };
      data.L = { value: result.filter((t) => t.looser === team).length, type: 'L'};
      data.D = { value: result.filter((t) => (t.draw) ? t.draw.includes(team) : null).length, type: 'D'};
      data.Pts = { value: (data.W.value * 3) + data.D.value, type: 'Pts'};
      this.finalData.push(data);
    });

    // Sorting according to the points and Assigning the position
    this.finalData.sort((a , b) => b.Pts.value - a.Pts.value ).
      forEach((d, index) => {
      d.Pos = { value: index + 1, type: 'Position'};
    });
  }

}
