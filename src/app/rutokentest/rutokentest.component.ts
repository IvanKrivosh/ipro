import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

declare function sign(sourrce: string, b: boolean): any;
declare function verify(): any;
@Component({
  selector: 'app-rutoken',
  templateUrl: './rutokentest.component.html',
  styleUrls: ['./rutokentest.component.scss']
})

export class RutokentestComponent implements OnInit, AfterViewInit {

  src: string;
  strKey: string;

  @Input() type: string;

  @ViewChild('script', {static: true}) script: ElementRef;

  ngOnInit(): void {

  }

  signDoc() {
    this.strKey = sign( this.src, false);
  }

  ngAfterViewInit() {
  }

  verifyDoc() {
    verify();
  }
}
