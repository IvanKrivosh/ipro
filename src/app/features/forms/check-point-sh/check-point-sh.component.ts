import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {ControlStepService} from '../../../services/control-step-service';
import {ControlStepJobModel} from '../../../models/control-step-job-model';
import {ContractService} from "../../../services/contract-service";

export interface CheckPointSh1Element {
  position: number;
  nm: string;
  ds: string;
}

const ELEMENT_DATA1: CheckPointSh1Element[] = [
  {position: 1, nm: 'Контрольные этапы 2017 год', ds: '2017 год'},
  {position: 2, nm: 'КЭ для ТП', ds: 'с 2019 года'}
];

@Component({
  selector: 'app-check-point-sh',
  templateUrl: './check-point-sh.component.html',
  styleUrls: ['./check-point-sh.component.scss'],
  providers: [ControlStepService]
})
export class CheckPointShComponent implements OnInit {

  constructor(private controlStepService: ControlStepService, private changeDetectorRefs: ChangeDetectorRef) {
  }

  currentTemplate: CheckPointSh1Element;
  displayedColumns1: string[] = ['select', 'position', 'nm', 'ds'];
  dataSource1 = new MatTableDataSource(ELEMENT_DATA1);
  displayedColumns2: string[] = ['number', 'type', 'isHeadString', 'name', 'minenergoName', 'planStartDate', 'planEndDate',
    'factStartDate', 'factEndDate', 'planCost', 'factCost', 'completionPercent', 'documentConnection'];
  dataSource2: Array<ControlStepJobModel>;

  @ViewChild(MatSort, {static: true}) sort1: MatSort;

  selection = new SelectionModel<CheckPointSh1Element>(false, [ELEMENT_DATA1[0]]);

  ngOnInit() {
    this.currentTemplate = this.dataSource1.data[0];
    this.dataSource1.sort = this.sort1;
    this.controlStepService.getControlStepJobs(1).subscribe(data => {
      this.dataSource2 = data;
    });
  }

  Return() {
    window.history.back();
  }

  selectRow(row) {
    if (this.currentTemplate.position !== row.position) {
      this.currentTemplate = row;
      this.fillChildTable();
    }
  }

  fillChildTable() {
    if (this.currentTemplate != null) {

      this.controlStepService.getControlStepJobs(this.currentTemplate.position).subscribe(data => {
        this.dataSource2 = data;
        this.changeDetectorRefs.detectChanges();
      });
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource1.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CheckPointSh1Element): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}

