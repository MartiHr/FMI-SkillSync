import classNames from 'classnames/bind';
import loginStyles from './Login.module.css';
import formStyles from '../../FormComponents/Form.module.css';

import * as authService from '../../../services/authService';

import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useState } from 'react';

let cx = classNames.bind(loginStyles);
let cxForms = classNames.bind(formStyles);

export const Login = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuthContext();

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [hasErrors, setHasErrors] = useState(false);

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    }

    const loginHandler = async (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.target));

        if (!currentUser) {
            try {
                await authService.login(email, password);
                navigate('/');
            } catch (error) {
                setHasErrors(true);
            }
        }
        
    }

    return (
        <>
            <div className={cx('login-background')}>
                <div className={cx('shape')} />
                <div className={cx('shape')} />
            </div>
            <form className={cx('login-form')} onSubmit={loginHandler}>
                <h3>Login Here</h3>

                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Email" id="email" name='email' value={values.email} onChange={changeHandler} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" name='password' value={values.password} onChange={changeHandler} />
                {hasErrors
                    ? <span>Invalid email or password</span>
                    : null
                }

                <button>Log In</button>

                <div className={cxForms('social')}>
                    <p>or you could also <Link to="/register">Sign Up</Link></p>
                     {/* <div className={cxForms('go')}>
                        <i className="fab fa-google" /> Google
                    </div>
                    <div className={cxForms('fb')}>
                        <i className="fab fa-facebook" /> Facebook
                    </div> */}
                </div>
            </form> 
        </>
    );
}