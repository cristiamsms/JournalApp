import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
    const {loading} = useSelector(state => state.ui )
    const [value,handleInputChange]=useForm({
        email: '',
        password:''
    });
    const {email,password }=value;
    const dispatch = useDispatch();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isFormValid()){
        dispatch( startLoginEmailPassword(email,password))
        }
    }
    const isFormValid=()=>{
        
        if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'))
            return false;
        }else if(password.length<5){
            dispatch(setError('Password should be at least 6 characters and match'))
            return false

        }
        dispatch(removeError());
        return true;
    }
    
    const handleGoogleLogin=()=>{
        dispatch( startGoogleLogin());

    }
    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit= {handleSubmit}>

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
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>
                <hr/>
                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}>
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b>Sign in with google</b>
                            </p>
                     </div>
                </div>
                <Link className="link" to="/auth/register">
                    Create new account
                </Link>
               
            </form>
        </>
    )
}
