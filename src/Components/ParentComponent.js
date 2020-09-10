import React from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Footer from './Footer/Footer'

function ParentComponent() {
    return (
        <div>
           <Header/>
           <Body/>
           <Footer/>
        </div>
    )
}

export default ParentComponent
