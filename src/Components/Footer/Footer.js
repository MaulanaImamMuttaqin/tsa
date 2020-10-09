import React from 'react'
import '../../assets/style/Footer.css'
import Logo from "../../assets/image/logo4.png"
import { Container } from 'react-bootstrap'
function Footer() {
    return (
        <footer>
            <Container>
                <img src={Logo} alt=""/>
            </Container>
        </footer>
    )
}

export default Footer
