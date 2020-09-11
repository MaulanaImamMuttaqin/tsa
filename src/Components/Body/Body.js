import React,{useContext} from 'react'
// import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import HomeBody from './SubComponents/HomeBody'
import SearchBody from './SubComponents/SearchBody'
import {ProductContext} from '../ParentComponent'
import DetailBody from './SubComponents/DetailBody'

function Body() {
    const productContext = useContext(ProductContext)
    return (
        <div>
            {
                (productContext.Component.ComponentState === 1) ? <HomeBody/> :
                (productContext.Component.ComponentState === 2) ? <SearchBody/> :
                <DetailBody/>
                
            }   

            
        </div>
    )
}

export default Body
