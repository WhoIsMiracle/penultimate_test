import cls from './formsControl.module.css';


export const Input = ({input, type, meta, ...props}) => {
    return (
        <div className={meta.error && meta.touched ? cls.error : cls.input__control}>
                <input {...input} placeholder={props.placeholder} type={type}/>
            {meta.error && meta.touched
                ? <span>{meta.error}</span>
                : false
            }
        </div>
    )
}