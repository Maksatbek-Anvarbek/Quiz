import React, { useState }from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/button";
import Input from "../../components/UI/Input/Input";
import { is } from 'is_js'

const Auth = () => {
    const [formControl, setFormControl] = useState({
        email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Введите корректный Email',
            valid: false,
            touched: false,
            validated: {
                required: true,
                email: true
            }
        },
        password: {
            value: '',
            type: 'password',
            label: 'Password',
            errorMessage: 'Введите корректный пароль',
            valid: false,
            touched: false,
            Validate: {
                required: true,
                minlength: 6
            }
        }
    })

    const [isFormValid, setIsFormValid ] = useState(false)

    const handleLogin = () => {

    }

    const registerHandler = () => {

    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    const validateControl = (value, Validate) => {
        if (!Validate) {
            return true
        }

        let isValid = true

        if (Validate.required) {
            isValid = value.trim() !== ` ` && isValid
        }

        if (Validate.email){
            isValid = is.email(value) && isValid
        }

        if (Validate.minlength){
            isValid = value.length >= Validate.minlength && isValid
        }

        return isValid
    }

    const onChangeHandle = (e, controlName) => {
        const formControls = { ...formControl }

        //Возврашать не новый объект а текущий
        const control = formControls[controlName]

        control.value = e.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.Validate)

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        // formControls[control] = control

        setFormControl(formControls)
        setIsFormValid(isFormValid)
    }

    const renderInput = () => {
        return Object.keys(formControl).map((controlName, idx) => {
            const control =  formControl[controlName]
            return (
                <Input
                key={controlName +idx}
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                validate={control.Validate}
                errorMessage={control.errorMessage}
                onChange={(e) => onChangeHandle(e, controlName)}
                />
            )
        })

    }
    return (
        <div className={classes.auth}>
            <div>
           <h1>Авторизация</h1>
            <form
                onSubmit={submitHandler}
                className={classes.authForm}
            >
                {
                  renderInput()
                }

                <Button
                type='success'
                onClick={handleLogin}
                disabled={!isFormValid}
                >Войти</Button>
                <Button
                type='primary'
                onClick={registerHandler}
                disabled={!isFormValid}
                >Регистрация</Button>
            </form>
            </div>
        </div>
    );
};

export default Auth;