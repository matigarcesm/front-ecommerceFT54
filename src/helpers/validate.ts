import { ILoginErrors, ILoginProps, IRegisterErrors, IRegisterProps } from "@/types";

export function validateLoginForm (values: ILoginProps) {
    const errors: ILoginErrors = {}

    if(values.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
        errors.email = "Email is not valid"
    
    } else if (values.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
        errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and at least 8 characters in total"
    }

    return errors


}

export function validateRegisterForm (values: IRegisterProps) {
    const errors: IRegisterErrors = {}

    if(values.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
        errors.email = "Email is not valid"
    
    } else if (values.email && values.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
        errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and at least 8 characters in total"
    }

    return errors

}