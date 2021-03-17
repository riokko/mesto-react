import React, { useState } from 'react';
import Form from './Form';

const Login = ({ handleLogin }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = data;

        if (!email || !password) {
            return;
        }
        handleLogin(email, password);
    }

    return (
        <>
            <Form name="login-form" title="Вход" onSubmit={handleSubmit}>
                <label className="authform__label">
                    <input
                        type="email"
                        className="authform__input authform__input_type_email"
                        id="email-input"
                        value={data.email}
                        name="email"
                        placeholder="Email"
                        required
                        minLength="2"
                        maxLength="40"
                        onChange={handleChange}
                    />
                    <span className="form__error" id="email-input-error" />
                </label>
                <label className="form__label">
                    <input
                        type="password"
                        className="authform__input authform__input_type_password"
                        id="password-input"
                        value={data.password}
                        name="password"
                        placeholder="Пароль"
                        required
                        minLength="8"
                        maxLength="200"
                        onChange={handleChange}
                    />
                    <span className="form__error" id="password-input-error" />
                </label>
                <button type="submit" className="authform__button" onClick={handleSubmit}>
                    Войти
                </button>
            </Form>

        </>
    );
};

export default Login;
