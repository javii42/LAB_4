import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColor]'
})


export class ColorDirective {


  constructor(private el: ElementRef<HTMLInputElement>) {
    
       el.nativeElement.style.backgroundColor = "#9c9b9b";
  }

}