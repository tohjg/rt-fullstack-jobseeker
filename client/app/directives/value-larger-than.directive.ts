import { Directive, Input, ElementRef, Renderer, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, NgModel } from "@angular/forms";

function checkIfCurrentValueisLargerThan(field:HTMLInputElement) {
  
}

@Directive({
  selector: '[valueLargerThan]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: ValueLargerThanDirective, multi:true
  }]
})
export class ValueLargerThanDirective implements Validator {
  @Input() valueLargerThan:NgModel;

  validate(control: AbstractControl) {
    if (this.valueLargerThan) {
      if (this.valueLargerThan.value != null && this.valueLargerThan.value > control.value) {
        // target's value is larger than current value
        return {
          valueIsLarger: true
        }
      } else {
        // value is smaller or equal
        this.valueLargerThan.control.setErrors(null);
      }
    }
    
    return null;
  }
}
