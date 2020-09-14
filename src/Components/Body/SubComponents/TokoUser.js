import React from 'react'
import {useForm} from 'react-hook-form'
import {ProductContext} from '../../ParentComponent'
import Food from './Food'

function TokoUser() {
    const { register, handleSubmit, watch, errors } = useForm();
    const productContext = useContext(ProductContext)
    useEffect(() => {
        if(productContext.User.UserState.login){
            productContext.Toko.DispatchTokoState({type: "SET_LOADING"})
            Axios.post('http://keudepeunajoh.jsmiot.com/Data/toko', {
                id: productContext.User.UserState.user.id,
                role_id : productContext.User.UserState.user.role_id
            }).then(res => {
                productContext.Toko.DispatchTokoState({type: "FETCH_SUCCESS", payload: res.data})
                
            }).catch(error => {
                productContext.Toko.DispatchTokoState({type: "FETCH_ERROR"})
            })
        }
    },[])


    const onSubmit = data => {
        console.log(data.gambar[0].size)
    }
    console.log("props= ", productContext.Toko.TokoState.data.toko)

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
                        <div className="toko">
                            <div className="logo-toko">
                                <img src="" alt="gambar-toko"/>
                            </div>
                            {/* <h2>{props.data.toko.nama_toko}</h2> */}
                            <p className="toko-ex">Alamat Toko: </p>
                            {/* <p>{props.data.toko.alamat_toko}</p> */}
                            <p className="toko-ex">Deskripsi: </p>
                            {/* <p className="toko-desc">{props.data.toko.deskripsi}</p> */}
                        </div>
                        <div className="content-header">
                            <h4>Tambah Produk</h4>
                        </div>
                        <div className="toko-form">
                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" action="" className="form">
                                <p>Masukkan Gambar Produk: </p>
                                <input className="file" type="file" name="gambar" ref={register({
                                validate: (value) => {
                                    return value[0].size < 2048000
                                }
                                })} required/>
                                {errors.gambar && <p><small style={{color: "red"}}>ukuran gambar tidak boleh lebih dari 2MB </small></p>}
                                <input type="text" name="nama" placeholder="Masukkan Nama Produk"  ref={register()} required/>
                                
                                <input type="number" name="harga" placeholder="Masukkan Harga"  ref={register} required/>
                                <textarea name="deskripsi" id="" cols="80" rows="8" placeholder="Deskripsi Produk"  ref={register} required></textarea>
                                <button type="submit" name="button">Buat</button>
                            </form>
                        </div>

                        <div className="content-header">
                            <h4>Product Yang di Promosikan</h4>
                        </div>
                        {/* {
                            props.data.product.j_prod == 0 ?
                            <p>Belum ada Produk yang di promosikan</p>:
                            props.data.product.map(data => 
                                <Food key={data.id} Data={data}/>
                            )
                        } */}
                    </div>
                </div>
            }       
        </div>
    )
}


export default TokoUser
