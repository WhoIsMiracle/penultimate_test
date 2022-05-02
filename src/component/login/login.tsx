import React from "react";
import { useDispatch } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../../general/formsControl/forms-control";
import { maxLengthVC } from "../../general/validate";
import { loginTC } from "../../redux/auth-reducer";
import cls from './login.module.scss';

const maxLength25 = maxLengthVC(25)

const LoginForms: React.FC<InjectedFormProps<dataLogin>> = ({handleSubmit, ...props}) => {
    return (
        <form className={cls.login__forms} onSubmit={handleSubmit}>
            <div className={cls.login__inputs}>
                <Field name='login' component={Input} type='text' placeholder='Enter your login'
                validate={[maxLength25]}/>
                <Field name='password' component={Input} type='text' placeholder='Enter your password'
                validate={[maxLength25]}/>
            </div>
            <div className={cls.login__checkbox}>
                <div className={cls.checkbox__wrap}>
                    <Field id='checkbox__login' name='rememberMe' component={Input} type='checkbox'/>
                </div>
                <div className={cls.checkbox__text}>Remember Me</div>
            </div>
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
        //@ts-ignore
        dispatch(loginTC(data.login, data.password, data.rememberMe))
    }
    return (
        <div className={cls.login}>
            <div className={cls.login__body}>
                <span>
                    Sign in
                </span>
                {/* @ts-ignore */}
                <LoginFormsWrapped onSubmit={LogIn}/>
            </div>
        </div>
    )
}

export default Login;