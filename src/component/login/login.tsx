import React from "react";
import { useDispatch } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../../general/formsControl/forms-control";
import { maxLengthVC } from "../../general/validate";
import { loginTC } from "../../redux/auth-reducer";
import cls from './login.module.css';

const maxLength25 = maxLengthVC(25)

const LoginForms: React.FC<InjectedFormProps<dataLogin>> = ({handleSubmit, ...props}) => {
    return (
        <form className={cls.login__forms} onSubmit={handleSubmit}>
            <Field name='login' component={Input} type='text' placeholder='Enter your login'
            validate={[maxLength25]}/>
            <Field name='password' component={Input} type='text' placeholder='Enter your password'
            validate={[maxLength25]}/>
            <Field id='checkbox__login' name='rememberMe' component={Input} type='checkbox'/>
            <button>Send</button>
        </form>
    )
} 

const LoginFormsWrapped = reduxForm<dataLogin>({form: 'login-forms'})(LoginForms)

type dataLogin = {
    login: string
    password: string
    rememberMe: boolean
}

const Login: React.FC = () => {
    let dispatch = useDispatch()
    const LogIn = (data: dataLogin) => {
        dispatch(loginTC(data.login, data.password, data.rememberMe))
    }
    return (
        <div className={cls.login}>
            <div className={cls.login__body}>
                <span>
                    Please log in
                </span>
                {/* @ts-ignore */}
                <LoginFormsWrapped onSubmit={LogIn}/>
            </div>
        </div>
    )
}

export default Login;