import React from "react";
import cls from './loader.module.css';

const Loader: React.FC = () => {
    return <div className={cls.loader}>
            <img src='https://i.pinimg.com/originals/fa/b9/81/fab9819978039ed6367e112b1ce4ce80.gif'/>
        </div>
}

export default Loader;