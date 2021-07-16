import React,{useState, useContext} from 'react'
import '../../assets/style/Regist.css'
import Loading from '../general/Loading'
import Logo from '../../assets/image/logo4.png'
import {useForm } from 'react-hook-form'
import {ProductContext} from '../ParentComponent'
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'

function Regist() {
    document.title = `KeudePeunajoh Daftar`
    const {
        url
    } = useContext(ProductContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const [registOnLoad, setRegistOnLoad] = useState(false)
    const history = useHistory()
    const onSubmit = data => {
        setRegistOnLoad(true)
        Axios.post(`${url}Auth/regist`, {
            username:data.username,
            password:data.pass1,
            alamat:data.alamat,
            email:data.email,
            nohp:data.nohp
        }).then(res => {
            setRegistOnLoad(false)
            if(res.data.regist === false){
                alert('something is wrong')
            }else{
                alert('akun anda berhasil di tambah, Silakan Login')
                history.push('/Login')
            }
        }).catch(error => {
            setRegistOnLoad(false)
            console.log('error')
        })
    };
    return (
        <div style={{height: "100%"}}>
            <div className="auth-body">
                <div className="regist-content">
                    <div className="logo">
                        <img src={Logo} alt="" className="logi"/>
                    </div>
                    <div className="regist-form">
                        <h2>Daftar Sekarang</h2>
                        <p>Sudah Punya Akun? <Link to="/Login">Masuk</Link></p>

                        <form onSubmit={handleSubmit(onSubmit)} action="" className="form">
                            <input name="username" type="text" placeholder="Masukkan Nama Anda" ref={register} required/>
                            <input name="nohp" type="text" placeholder="Masukkan no HP Anda" ref={register} required/>
                            <input name="alamat" type="text" placeholder="Masukkan Alamat" ref={register} required/>
                            <input name="email" type="text" placeholder="Masukkkan Alamat Email (Optional)" ref={register}/>
                            <input name="pass1" type="password" placeholder="Masukkan Password" ref={register}/>
                            <input name="pass2" type="password" placeholder="Konfirmasi Password" ref={register({
                                validate: (value) => {
                                    return value === watch('pass1'); // value is from password2 and watch will return value from password1
                                }
                                })} />
                            {errors.pass2 && <p><small style={{color: "red"}}>password harus sama</small></p>}
                            <button type="submit">Daftar</button>
                            
                        </form>
                    </div>
                </div>
            </div>
            {
                registOnLoad && <Loading color=""/>
            }
        </div>
    )
}

export default Regist
