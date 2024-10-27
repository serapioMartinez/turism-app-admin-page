import { PlaceEntity } from "./entities/Place"

export class Validations {

    private static readonly emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    private static readonly passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\W).{8,16}$/
    private static readonly phoneRegExp = /^[1-9][0-9]{9}$/
    private static readonly textRegExp = /^[\w-., ']{5,}/
    private static readonly yearRegExp = /^[0-9]{1,4}$/

    static validateEMail(input: HTMLInputElement) {
        let result = this.emailRegexp.test(input.value);

        this.setFieldValidity(input, result);
        return result;
    }


    static validatePassword(input: HTMLInputElement) {
        let result = this.passwordRegExp.test(input.value)
        this.setFieldValidity(input, result);
        return result;
    }

    static validatePhoneNumber(input: HTMLInputElement) {
        let result = this.phoneRegExp.test(input.value);
        this.setFieldValidity(input, result);
        return result;
    }

    static validateText(input: HTMLInputElement) {
        let result = this.textRegExp.test(input.value);
        this.setFieldValidity(input, result);
        return result;
    }

    static validateYear(input: HTMLInputElement) {
        let result = this.yearRegExp.test(input.value);
        this.setFieldValidity(input, result);
        return result;
    }

    static validateOption(tipoZona: any[], input: HTMLSelectElement): boolean {
        let z = tipoZona.find((zona) => zona.tipo == input.value);
        let result = z != undefined;
        this.setFieldValidity(input, result);
        return result;
    }

    private static setFieldValidity(input: HTMLInputElement | HTMLSelectElement, result: boolean) {
        if (!result) {
            input.setCustomValidity("invalid")
        } else {
            input.setCustomValidity("")
        }
    }
}