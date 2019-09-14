import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
import {ControlStepService} from '../../../services/control-step-service';
import {ControlStepTitulModel} from '../../../models/control-step-titul-model';

@Component({
  selector: 'app-check-point',
  templateUrl: './check-point.component.html',
  styleUrls: ['./check-point.component.scss'],
  providers: [ControlStepService]
})
export class CheckPointComponent implements OnInit {
  checkpointsh = 'checkpointsh';
  // @ts-ignore
  positionOptions: TooltipPosition[] = ['Шаблон №1', 'Шаблон №2'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['jobNumber', 'jobType', 'jobName', 'planStartDate', 'planEndDate', 'pd', 'factStartDate', 'factEndDate',
    'fd', 'ot', 'defaultReason', 'suggestions', 'planCost', 'factCost', 'completionPercent', 'sd'];
  dataSource: Array<ControlStepTitulModel>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ID;
  sh = 1;
  format = 'dd/MM/yyyy';

  constructor(private controlStepService: ControlStepService, private activatedRoute: ActivatedRoute,
              private router: Router, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.paramMap.get('id');
    this.controlStepService.getTitulControlStepJobs(this.ID, this.sh).subscribe(data => {
      this.dataSource = data;
    });
  }

  Return() {
    window.history.back();
  }

  redirect() {
    this.router.navigateByUrl('/checkpointsh');
  }

  changePosition(position: number) {
    this.sh = position;
    this.controlStepService.getTitulControlStepJobs(this.ID, this.sh).subscribe(data => {
      this.dataSource = data;
      this.changeDetectorRefs.detectChanges();
    });
  }

  createTitulControlSteps() {
    this.controlStepService.createTitulControlSteps(this.ID, this.sh).subscribe(data => {
      this.dataSource = data;
      this.changeDetectorRefs.detectChanges();
    });
  }
}
