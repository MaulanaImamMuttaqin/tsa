import React,{useContext} from 'react'
// import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import HomeBody from './SubComponents/HomeBody'
import SearchBody from './SubComponents/SearchBody'
import {ProductContext} from '../ParentComponent'
import DetailBody from './SubComponents/DetailBody'
import {Switch, Route} from "react-router-dom";

function Body() {
    const productContext = useContext(ProductContext)
    return (
        
            <Switch>
            <Route path='/Product/:id' component={DetailBody}/>
            <Route path='/Search/:key' component={SearchBody} />
            <Route path='/' component={HomeBody}/>
            
            </Switch>
           

            
       
    )
}

export default Body
