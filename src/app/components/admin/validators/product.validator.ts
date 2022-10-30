import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export class ProductValidator{
    //check image type of file
    static imageTypeValidator(control: AbstractControl): ValidationErrors | null{
        const file = control.value;
        if(file){
            const fileType = file.type;
            if(fileType.match(/image\/*/) == null){
                return {invalidImageType: true};
            }
        }
        return null;
    }
    
}