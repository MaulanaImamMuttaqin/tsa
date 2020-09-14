import React from 'react'
import {useForm } from 'react-hook-form'

function TokoForm() {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data)
    }
    return(
        <div>
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
    )
}



export default TokoForm
