import { Directive } from '@angular/core';

/**
 * Generated class for the AuthenticationDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[authentication]' // Attribute selector
})
export class AuthenticationDirective {

  constructor() {
    console.log('Hello AuthenticationDirective Directive');
  }

}
