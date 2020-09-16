import React,{useContext, useState} from 'react'
import {useForm } from 'react-hook-form'
import Loading from '../../general/Loading';
import '../style/TokoBody.css'
import {ProductContext} from '../../ParentComponent'
import {useHistory} from "react-router-dom"
import Axios from 'axios';

function TokoForm() {
    const { register, handleSubmit, errors } = useForm();
    const [buatToko, setBuatToko] = useState(false)
    const history = useHistory()
    const productContext = useContext(ProductContext)
    const onSubmit = data => {
        setBuatToko(true)
        const fd = new FormData();
        fd.append('id', productContext.User.UserState.user.id)
        fd.append('nama', data.nama)
        fd.append('alamat', data.alamat)
        fd.append('deskripsi',data.deskripsi)
        fd.append('gambar', data.gambar[0], data.gambar[0].name )
        Axios.post('http://keudepeunajoh.jsmiot.com/Data/buat_toko2',fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
        .then(res => {
            setBuatToko(false)
            console.log(res.data)
            history.push('/Toko_Saya')
        }).catch(error => {
            setBuatToko(false)
            console.log('error')
        })

    };
    
    if(productContext.User.UserState.login){
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
                    {
                        buatToko && <Loading color=""/>
                    }    
                </div>
        )
    }else{
        history.push('/Login')
        return null
    }
}



export default TokoForm
