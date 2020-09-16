import React, {useContext, useEffect} from 'react'
import Loading from '../../general/Loading';
import Error from '../../general/Error';
import {ProductContext} from '../../ParentComponent'
import '../style/TokoBody.css'
import {useForm } from 'react-hook-form'
import {useHistory} from "react-router-dom";
import TokoUser from './TokoUser'

function TokoBody() {
    const history = useHistory()
    const productContext = useContext(ProductContext)

    if(productContext.User.UserState.login){
            return (
                <div style={
                    productContext.Toko.TokoState.loading ? { height : "100%"}:
                        {height: ""}
                }>

                    {
                        productContext.User.UserState.user.role_id === "0" ? <TokoForm/>:
                        <TokoUser/>
                    }                
                </div>
            )
    }else{
        history.push('/Login')
        return null
    }
    }


function TokoForm() {
    const { register, handleSubmit, watch, errors } = useForm();
    const productContext = useContext(ProductContext)
    
    const onSubmit = data => {
        console.log(data)
    }
    return(
        <div style={
            productContext.Toko.TokoState.loading ? { height : "100%"}:
                {height: ""}
        }>
            {
                false ? <Loading color="loading-white"/>:
                    <div className="content"
                        style={
                            productContext.Toko.TokoState.loading ? { height : "100%"}:
                            {height: "auto"}
                        }
                    >
                        
                        <div className="container" style={{height: "100%"}}>
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
                    </div>
            }       
        </div>
    )
}




export default TokoBody
