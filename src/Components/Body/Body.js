import React from 'react'
// import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import HomeBody from './SubComponents/HomeBody'
import SearchBody from './SubComponents/SearchBody'
import DetailBody from './SubComponents/DetailBody'
import {Switch, Route} from "react-router-dom";
import TokoBody from './SubComponents/TokoBody'
import TokoUser from './SubComponents/TokoUser';
import TokoForm from './SubComponents/TokoForm';

function Body() {
    return (
        
            <Switch>
            <Route path='/Product/:id' component={DetailBody}/>
            <Route path='/Search/:key' component={SearchBody} />
            <Route path='/Toko_Saya' component={TokoUser}/>
            <Route path='/Buat_Toko' component={TokoForm}/>
            <Route path='/' component={HomeBody}/>
            
            {/* <Route path='/Product/:id'><DetailBody/></Route>
            <Route path='/Search/:key'><SearchBody/></Route>
            <Route path='/Toko_Saya'><TokoBody/></Route>
            <Route  path='/'><HomeBody/></Route> */}
            </Switch>
           

            
       
    )
}

export default Body
