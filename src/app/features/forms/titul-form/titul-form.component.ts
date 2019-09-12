import { Component, OnInit } from '@angular/core';
import {TitulInfo} from '../../../models/titul-model';
import {ActivatedRoute} from '@angular/router';
import {TitulService} from '../../../services/titul-service';

@Component({
  selector: 'app-titul-form',
  templateUrl: './titul-form.component.html',
  styleUrls: ['./titul-form.component.scss'],
  providers: [TitulService]
})
export class TitulFormComponent implements OnInit {
  titul: TitulInfo;
  ID = 0;
  constructor(private activatedRoute: ActivatedRoute, private titulservice: TitulService) { }
  checkpoint = 'checkpoint';
  orgs = [{name: 'Подразделение №1', id : 1}, {name: 'Подразделение №2', id : 2}, {name: 'Подразделение №3', id : 3}];
  typesIPR = [{name: 'Раздел №1', id : 1}, {name: 'Раздел №2', id : 2}, {name: 'Раздел №3', id : 3}];
  directions = [{name: 'Направление №1', id : 1}, {name: 'Направление №2', id : 2}, {name: 'Направление №3', id : 3}];

  months = [
    {name: 'январь', id : 1},
    {name: 'февраль', id : 2},
    {name: 'март', id : 3},
    {name: 'апрель', id : 4},
    {name: 'май', id : 5},
    {name: 'июнь', id : 6},
    {name: 'июль', id : 7},
    {name: 'август', id : 8},
    {name: 'сентябрь', id : 9},
    {name: 'октябрь', id : 10},
    {name: 'ноябрь', id : 11},
    {name: 'декабрь', id : 12}
    ];

  ngOnInit() {
    this.ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const filterVlaue: Array<{name: string, value: any}> = new Array<{name: string, value: string}>();
    filterVlaue.push({name: 'id', value: this.ID});
    this.titulservice.getTituls(filterVlaue).subscribe( data => {
      this.titul = data[0];
    });
  }

}
