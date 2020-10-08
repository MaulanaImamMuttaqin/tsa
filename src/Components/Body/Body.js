import React from 'react'
// import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import HomeBody from './SubComponents/HomeBody'
import SearchBody from './SubComponents/SearchBody'
import DetailBody from './SubComponents/DetailBody'
import {Switch, Route} from "react-router-dom";
// import TokoBody from './SubComponents/TokoBody'
import TokoUser from './SubComponents/TokoUser';
import TokoForm from './SubComponents/TokoForm';
import ProfileBody from './SubComponents/ProfileBody';

function Body() {
    return (
        
            <Switch>
            <Route path='/Product/:id' component={DetailBody}/>
            <Route path='/Search/:key' component={SearchBody} />
            <Route path='/Toko_Saya' component={TokoUser}/>
            <Route path='/Buat_Toko' component={TokoForm}/>
            <Route path='/Profile' component={ProfileBody}/>
            <Route path='/' component={HomeBody}/>
            
            </Switch>
           

            
       
    )
}

export default Body
