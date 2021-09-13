import React, { Component } from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './sign-up.styles.scss';

class SignUp extends Component{

    constructor(){
        super();
        this.state={
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({[name] : value});

    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            alert('Password mismatch!!');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});

            this.state={
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }

        } catch (error) {
            console.error(error);
        }

    }

    render(){
        const { displayName, email, password, confirmPassword } = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I don't have a account</h2>
                <span>Sign up with email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        handleChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        handleChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        handleChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton>SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;
