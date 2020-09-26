import React,{useContext, useState} from 'react'
import {useForm } from 'react-hook-form'
import Loading from '../../general/Loading';
import '../style/TokoBody.css'
import {ProductContext} from '../../ParentComponent'
import {useHistory} from "react-router-dom"
import Axios from 'axios';

function TokoForm() {
    const { register, handleSubmit, errors } = useForm();
    
    const {User:{UserState}} = useContext(ProductContext)

    const history = useHistory()
    
    const onSubmit = data => {
    
        const fd = new FormData();
        fd.append('id', UserState.user.id)
        fd.append('nama', data.nama)
        fd.append('alamat', data.alamat)
        fd.append('deskripsi',data.deskripsi)
        fd.append('gambar', data.gambar[0], data.gambar[0].name )
        Axios.post('http://localhost/keudepeunajoh-rest-api/api/Data/BuatToko',fd)
        .then(res => {
            history.push('/Toko_Saya')

        }).catch(error => {
            console.log(error)
        })

    };
    
    if(UserState.login){
        return (
                <div style={ { height : "100%"}}>
                    <div className="content">
                        <div className="container">
                            <div className="content-header">
                                <h4>Profil Toko</h4>
                            </div>
                            <div className="message">
                                <p>Anda belum memiliki toko</p>
                            </div>
                            <div className="toko-form">
                                <h2>Buat Toko</h2>
                                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" action="" className="form">
                                    <label htmlFor="file">foto untuk toko anda (opsional)</label>
                                    <input type="file" className="file" name="gambar" ref={register({
                                    validate: (value) => {
                                        return value[0].size < 2048000
                                    }
                                    })} />
                                    {errors.gambar && <p><small style={{color: "red"}}>ukuran gambar tidak boleh lebih dari 2MB </small></p>}
                                    <input type="text" name="nama" placeholder="Masukkan Nama Toko Anda" ref={register} required/>
                                    <input type="text" name="alamat" placeholder="Masukkan Alamat Toko Anda" ref={register} required/>
                                    <textarea name="deskripsi" id="" cols="80" rows="8" placeholder="Deskripsi Toko (opsional)" ref={register}></textarea>
                                    <button type="submit">Buat</button>
                                </form>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div> 
                </div>
        )
    }else{
        history.push('/Login')
        return null
    }
}



export default TokoForm
