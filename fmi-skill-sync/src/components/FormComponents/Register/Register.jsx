import classNames from 'classnames/bind';
import styles from './Register.module.css';
import formStyles from '../../FormComponents/Form.module.css';

import * as authService from '../../../services/authService';

import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { errorMessages, getErrorMessage } from '../../../utils/errorUtil';
import { storage } from "../../../firebase/base.js";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";


let cx = classNames.bind(styles);
let cxForms = classNames.bind(formStyles);

export const Register = () => {
	const navigate = useNavigate();
	const { currentUser } = useAuthContext();

	const [imageUrls, setImageUrls] = useState([]);

	const imagesListRef = ref(storage, "images/");
	const uploadFile = (uid) => {
		if (values.image == null) return;
		const imageRef = ref(storage, `images/${uid}`);
		uploadBytes(imageRef, values.image).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				setImageUrls((prev) => [...prev, url]);
			});
		});
	};

	useEffect(() => {
		listAll(imagesListRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					setImageUrls((prev) => [...prev, url]);
				});
			});
		});
	}, []);


	const [values, setValues] = useState({
		email: '',
		password: '',
		rePass: '',
		image: null,
	});

	const [errors, setErrors] = useState({
		emailError: false,
		passwordError: false,
		rePassError: false,
		generalError: false
	});

	const changeHandler = (e) => {
		setValues(state => ({
			...state,
			[e.target.name]: e.target.value,
		}))
	}

	const changeImageHandler = (e) => {
		setValues(state => ({
			...state,
			[e.target.name]: e.target.files[0],
		}))
	}

	const setError = (errorField, value) => {
		setErrors(state => ({
			...state,
			[`${errorField}Error`]: getErrorMessage(errorField, value),
			generalError: ''
		}))
	}

	const onErrorHandler = (e) => {
		const errorField = e.target.name;
		const value = e.target.value;

		setError(errorField, value)
	}

	const registerHandler = async (e) => {
		e.preventDefault();

		const userData = Object.fromEntries(new FormData(e.target));
		const { email, password, rePass, image } = userData;

		if (password !== rePass) {
			setErrors(state => ({ ...state, rePassError: errorMessages.rePassError }));
			return;
		}

		Object.keys(userData).forEach(key => setError(key, userData[key]));
		const hasDataErrors = Object.values(errors).some(error => error.length !== 0 || error === false);

		if (!currentUser || hasDataErrors) {
			try {
				const CredentialsUser = await authService.register(email, password);

				const userEmail = CredentialsUser.user.email;
				uploadFile(userEmail);
				navigate('/');


			} catch (error) {
				const errorMessage = error.message.split('Firebase: ').pop();

				setErrors(state => ({
					...state,
					generalError: errorMessage
				}))
			}
		}
	}

	return (
		<>
			<div className={cx('register-background')}>
				<div className={cx('shape')} />
				<div className={cx('shape')} />
			</div>
			<form className={cx('register-form')} onSubmit={registerHandler}>
				<h3>Register Here</h3>

				<label htmlFor="email">Email</label>
				<input type="text" placeholder="Email" id="email" name='email' value={values.email} onChange={changeHandler} onBlur={onErrorHandler} className={errors.emailError.length > 0 ? cxForms('is-invalid') : 'a'} />
				<span>{errors.emailError}</span>

				<label htmlFor="password">Password</label>
				<input type="password" placeholder="Password" id="password" name='password' value={values.password} onChange={changeHandler} onBlur={onErrorHandler} className={errors.passwordError.length > 0 ? cxForms('is-invalid') : 'a'} />
				<span>{errors.passwordError}</span>

				<label htmlFor="rePass">Repeat password</label>
				<input type="password" placeholder="Repeat password" id="rePass" name='rePass' value={values.rePass} onChange={changeHandler} onBlur={onErrorHandler} className={errors.rePassError.length > 0 ? cxForms('is-invalid') : 'a'} />
				<span>{errors.rePassError}</span>
				<span>{errors.generalError}</span>

				<label htmlFor="image">Profile image</label>
				<input type="file" required accept="image/*" placeholder="Profile picture" id="image" name='image' className={cx("choose-image-button")} onChange={changeImageHandler} />
				<span>{errors.profileImageError}</span>

				<button>Sign Up</button>

				<div className={cxForms('social')}>
					<p>or you could also <Link to="/login">Log In</Link></p>
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