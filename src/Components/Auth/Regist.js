import React from 'react'
import './style/Regist.css'
import Logo from '../../assets/image/logo4.png'

import { Link } from 'react-router-dom'
function Regist() {
    return (
        <div className="auth-body">
            <div className="regist-content">
                <div className="logo">
                    <img src={Logo} alt="" className="logi"/>
                </div>
                <div className="regist-form">
                    <h2>Daftar Sekarang</h2>
                    <p>Sudah Punya Akun? <Link to="/Login">Masuk</Link></p>

                    <form action="" className="form">
                        <input type="text" value="" placeholder="Masukkan Nama Anda"/>
                        <input type="text" value="" placeholder="Masukkan no HP Anda"/>
                        <input type="text" value="" placeholder="Masukkan Alamat"/>
                        <input type="text" value="" placeholder="Masukkkan Alamat Email (Optional)"/>
                        <input type="text" value="" placeholder="Masukkan Password"/>
                        <input type="text" value="" placeholder="Konfirmasi Password"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Regist
