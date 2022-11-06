import { compileDeclareInjectableFromMetadata } from "@angular/compiler";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { SharedUserService } from "../../shared/services/shared-user.service";
import jwt_decode from 'jwt-decode';


export class RegexValidators{
  
  static validateCardNumber: ValidatorFn = (control: any): ValidationErrors | null => {
    const cardNumber = control.get('cardNumber');
    const regexValue = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
    let result = regexValue.test(cardNumber.value)
    if(result){
      return null;
    }else{
      return {'CardNumberMissmatch': true}
    }   
}
    static dateValidator: ValidatorFn = (control: AbstractControl ): ValidationErrors | null => {
      try{


      }catch{}//swallow init error
      let dataArr:any;
      const date = control.get('date');
      const curYear = new Date().getFullYear();
      const curMonth = new Date().getMonth();
      const dateValues:any = date?.value
      if(typeof dateValues === 'string'){
        dataArr = dateValues.split("-");
      }
      if(!dataArr) return {"cardDateMissmatch": true};
      if((dataArr[0] - curYear > 5 || curYear - dataArr[1]  < 5)){
        return {"cardDateMissmatch": true};
      }else if(dateValues[0] - curYear === 0){
        if(dataArr[1] > curMonth){
          return {"cardDateMissmatch": true};
        }
      }
      return null
    }
    
    static validateId: ValidatorFn = (control: AbstractControl ): ValidationErrors | null => {
      const token = localStorage.getItem('token');
      const decoded:any = jwt_decode(token!)
      const curUserId = decoded.idNumber;
      const inputId = control.get('id');
      if(inputId?.value == curUserId){
        return null;
      }else{
        return {'userIdMismatch': true}
      }
    }

}

