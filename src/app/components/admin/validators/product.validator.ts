import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export class ProductValidator{
    //check image type of file
    static imageTypeValidator(control: AbstractControl): ValidationErrors | null{
        const file = control.value;
        if(file){
            
            if(file.match(/\.(png|bmp|jpe?g)$/i) == null){
                alert('not image');
                return {'invalidImageType': true};
            }            
        }
        return null;
    }
    
}