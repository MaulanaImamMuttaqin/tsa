import React from 'react'
import './style/Login.css'
import '../../App.css'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className="auth-body">
            <div className="login">
                <h2>Masuk</h2>
                <form action="" className="form">
                    <input type="text" placeholder="Masukkan no HP"/>
                    <input type="text" placeholder="Masukkan Password"/>
                    <button type="submit"> Masuk</button>
                </form>
                <p>Belum Punya Akun? <Link to="/Register">Daftar</Link> </p>
            </div>
           
        </div>
    )
}

export default Login
