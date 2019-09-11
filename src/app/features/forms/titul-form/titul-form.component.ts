import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TitulInfo} from "../../../models/titul-model";

@Component({
  selector: 'app-titul-form',
  templateUrl: './titul-form.component.html',
  styleUrls: ['./titul-form.component.scss']
})
export class TitulFormComponent implements OnInit {
  titul : TitulInfo;
  ID = '0';
  constructor(private activatedRoute: ActivatedRoute) { }

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
    this.ID = this.activatedRoute.snapshot.paramMap.get('id');
    this.titul = {id: 123,
    name: '123        22222222222222222222222 222222222222222222222222222222222221231e12e12e12e12 12312312312312312312312312312322222222222222222222',
    number: '100001231230',
    statusId: '1',
    startYear: 2000,
    startMonth: 1,
    endYear: 2020,
    endMonth: 12,
    customerId: 1,
    performerId: 2,
    investmentDirectionId: 2,
    investmentSectionId: 3,
    belonging: '*Принадлежность к важным объектам, программам',
    includeCriteria: '*Критерий включения в ИПР',
    includePriority: '*Приоритет включения',
    targetProgram: '*Целевая программа',
    minenergoCriteria: '*Критерий Минэнерго',
    sociallySignificant: '*Признак социально значимого объекта',
    titulType: '*Тип титула',
    importance: '*Степень важности',
    curator: '*Куратор',
    aims: '*Цели проекта',
    problems: '*Решаемые задачи',
    address: '*Адрес',
    comments: '*Примечания'
  }
  }

}
