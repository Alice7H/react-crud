import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MainUser from './pages/user/main';
import Details from './pages/user/details';
import Create from './pages/user/create';
import Edit from './pages/user/edit';
import Delete from './pages/user/delete';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={MainUser} />
            <Route path='/users/:id' component={Details} />
            <Route path='/create-user' component={Create}/>
            <Route path='/edit-user/:id' component={Edit}/>
            <Route path='/delete-user/:id' component={Delete}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;