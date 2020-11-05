import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { useForm } from '../../hooks/useForm';

import { setError,removeError } from '../../actions/ui';
import { startRegister } from '../../actions/auth';


export const RegisterScreen = () => {
    const {msgError} = useSelector(state => state.ui )
    const [value,handleInputChange]=useForm({
        name:'',
        email: '',
        password:'',
        password2:''
    });
    const dispatch = useDispatch();
    const handleRegister=(e)=>{
        e.preventDefault();
        
        if(isFormValid()){
            dispatch(startRegister(email,password,name))
        }

    }
    const isFormValid=()=>{
        if( name.trim().length === 0){
            dispatch(setError('Name is required'))
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'))
            return false;
        }else if(password!==password2 || password.length<5){
            dispatch(setError('Password should be at least 6 characters and match'))
            return false

        }
        dispatch(removeError());
        return true;
    }
    const {name,email,password,password2 }=value;
    return (
        <>
            <h3 className="auth__title">Register</h3>
                {
                    msgError &&
                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                }
            <form onSubmit={handleRegister}>
           
                 <input
                    type="text"
                    placeholder="name"
                    name="name"
                    className="auth__input"
                    value={name}
                    onChange={handleInputChange}

                />
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}

                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
               
                <Link className="link " to="/auth/login">
                    Already registered?
                </Link>
               
            </form>
        </>
    )
}
