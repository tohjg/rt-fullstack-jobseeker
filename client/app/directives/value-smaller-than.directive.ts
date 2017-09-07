import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, NgModel } from "@angular/forms";

function checkIfCurrentValueisLargerThan(field:HTMLInputElement) {
  
}

@Directive({
  selector: '[valueSmallerThan]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: ValueSmallerThanDirective, multi: true
  }]
})
export class ValueSmallerThanDirective implements Validator {
  @Input() valueSmallerThan:NgModel;

  validate(control: AbstractControl) {
    if (this.valueSmallerThan) {  
      if (this.valueSmallerThan.value != null && this.valueSmallerThan.value < control.value) {
        // target value is too small
        return {
          valueIsSmaller:true
        };
      } else {
        // value is equal or larger
        this.valueSmallerThan.control.setErrors(null);
      }
    }

    return null;
  }
}
