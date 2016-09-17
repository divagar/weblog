import { Component, Directive, ElementRef } from '@angular/core';

declare var hljs: any;

@Directive({
  selector: 'code[highlight]'
})
export class HighlightCodeDirective {
  constructor(private eltRef:ElementRef) {
  }

  ngAfterViewInit() {
    console.log('Hello HL js')
    hljs.highlightBlock(this.eltRef.nativeElement);
  }
}