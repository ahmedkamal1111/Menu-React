import React from 'react';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import {connect} from 'react-redux';

const sideDrawer = ( props ) => { 
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <div>
        <Backdrop show={props.open} clicked={props.closed}/>
       <div className={attachedClasses.join(' ')} >
           <nav isAuthenticated={props.isAuth}>
           <div >
           <h2 style={{color:'white'}} >TEK</h2> 
           </div>
           <hr className={classes.hr}/>
           <ul className={classes.NavigationItems}>
               
                 <li className={classes.NavigationItem}>
                   <NavLink to="/" exact>TEK</NavLink>
                </li>
                {props.isAuth?
                <li className={classes.NavigationItem}>
                <NavLink to="/OurResturants">OurResturants</NavLink>
                </li>:null}
                {props.isAuth?
                <li className={classes.NavigationItem}>
                     <NavLink to="/about">About</NavLink>
                </li>:null}
                {!props.isAuth?
                <li className={classes.NavigationItem}>
                     <NavLink to="/auth">Authentication</NavLink>
                </li>:null}
                {props.isAuth?
                <li className={classes.NavigationItem}>
                     <NavLink to="/logout">Logout</NavLink>
                </li>:null}

                
           </ul>
           </nav>
       </div>
   </div>

    );
};

const mapStateToProps = state => {
    return {
        isAuthentication:state.auth.token !==null
    };
};
export default connect( mapStateToProps)( sideDrawer );