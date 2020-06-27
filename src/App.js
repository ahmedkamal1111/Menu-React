import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Tek from './components/Tek/Tek';
import OurResturants from './components/OurResturants/OurResturants';
import Layout from './hoc/Layout/Layout';
import ResturantDetails from './components/ResturantDetails/ResturantDetails';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';
import About from './components/About/About';
class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
           <Route path="/OurResturants"  component={OurResturants} />
           <Route path="/auth"  component={Auth} />
           <Route path="/about"  component={About} />
           <Route path="/logout"  component={Logout} />
            <Route path="/rest/:id"component={ResturantDetails}/>
            <Route path="/" exact component={Tek} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
