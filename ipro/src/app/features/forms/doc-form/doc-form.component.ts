import { Component, OnInit } from '@angular/core';
import {DocInfo} from "../../../models/doc-model";

@Component({
  selector: 'app-doc-form',
  templateUrl: './doc-form.component.html',
  styleUrls: ['./doc-form.component.scss']
})
export class DocFormComponent implements OnInit {

  docInfo : DocInfo;
  constructor() { }
  typesDoc = [{name: 'Тип №1', id : 1}, {name: 'Тип №2', id : 2}, {name: 'Тип №3', id : 3}];
  vidsDoc = [{name: 'Общий', id : 1}, {name: 'Уникальный для проекта', id : 2}];
  orgs = [{name: 'Подразделение №1', id : 1}, {name: 'Подразделение №2', id : 2}, {name: 'Подразделение №3', id : 3}];
  proc_nds = [{name: '20%', id : 20}, {name: '18%', id : 18}, {name: '10%', id : 10}];

  displayedColumns: string[] = ['id', 'type_doc', 'num_doc', 'date_start'];
  dataSource = [
    {id: 1, type_doc: 'Тип 1', num_doc: '21323-123', date: new Date()},
    {id: 2, type_doc: 'Тип 2', num_doc: '12312', date: new Date()},
    {id: 3, type_doc: 'Тип 3', num_doc: 'б/н', date: new Date()},
  ];

  ngOnInit() {
    this.docInfo = { id: 1, id_titul: 1113, num_titul: 1000256366, id_type_doc: 2, id_vid_doc: 1, type_doc: 'Карта схема-объекта', num_doc: 'б/н', prim: '*Примечание', date : new Date(), sum: 500, sum_nds: 26, direct: 'ДтИПР', close: 1, id_direct : 3, name_doc: 'doc_2.pdf', proc_nds: 20, spec:'*Описание'};
  }

  OpenDoc(element) {

  }


}
