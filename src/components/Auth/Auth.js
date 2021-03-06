import React,{Component} from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './Auth.css';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
class Auth extends Component{
state={
    controls:{
        email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'your email'
            },
            value:'',
            validation:{
                required:true,
                isEmail:true
            },
            valid:false,
            touched:false
        },
        password:{
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder:'your password'
            },
            value:'',
            validation:{
                required:true,
                minLength:6
            },
            valid:false,
            touched:false
        }
    },
    signUp:true
}

checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}
inputChangedHandler=(event, controlName)=>{
    const updatedControls={
        ...this.state.controls,
        [controlName]:{
            ...this.state.controls[controlName],
            value: event.target.value,
            valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
            touched:true
        }
    };
    this.setState({controls:updatedControls});
}

submitHandler=(event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.signUp);
}
switchAuthModeHandler=()=>{
    this.setState(prevState=>{
        return{signUp:!prevState.signUp};
    }
    )
}

render(){
    const formElementsArray = [];
    for (let key in this.state.controls) {
        formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        });
    }

    const form=formElementsArray.map(formElement => (
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ));
    let authRedirect = null;
    if (this.props.isAuthentication) {
        authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
    return(
        <div className={classes.Auth} >
                {authRedirect}
            <form onSubmit={this.submitHandler} >
                {form}
                <Button             
                btnType="Success">{this.state.signUp?'Sign Up': 'Sign In' }</Button>
            </form>
            <Button 
            clicked={this.switchAuthModeHandler}
            btnType="Danger">Switch To {this.state.signUp?'Sign In': 'Sign Up' } </Button>
        </div>



    )
}
}
const mapStateToProps = state => {
    return {
        isAuthentication:state.auth.token !==null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,signUp)=>dispatch(actions.auth(email,password,signUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Auth );