import React from 'react'
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom'
import HomeBody from './SubComponents/HomeBody'
import SearchBody from './SubComponents/SearchBody'
function Body() {
    return (
        <div>
            <Router>
                
                <Switch>
                    <Route path='/Search' component={SearchBody}/>
                    <Route path='/' component={HomeBody}/> 
                </Switch>
                <ul>
                    <li>
                        <Link to='/'>home</Link>
                    </li>
                    <li>
                        <Link to='/Search'>search</Link>
                    </li>
                </ul>
            </Router>
        </div>
    )
}

export default Body
