import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidators{
    //check passwords
    static checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordsNotMatch': true } : null;
    }
}