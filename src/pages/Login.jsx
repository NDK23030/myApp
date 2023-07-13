import React, { useContext } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';

const Login = () => {
    const {setIsAuth} = useContext(AuthContext);

    const login = (e) => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }

    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput 
                    type="text"
                    placeholder="Введидте логин"/>
                <MyInput 
                    type="password"
                    placeholder="Введидте пароль"/>
                    <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;