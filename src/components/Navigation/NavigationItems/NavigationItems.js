import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>TEK</NavigationItem>
        <NavigationItem link="/OurResturants">OurResturants</NavigationItem> 
        <NavigationItem link="/about">About</NavigationItem> 
{   !props.isAuthenticated 
       ? <NavigationItem link="/auth">Authentication</NavigationItem>
       : <NavigationItem link="/logout">Logout</NavigationItem>
}  
  </ul>
);

export default navigationItems;