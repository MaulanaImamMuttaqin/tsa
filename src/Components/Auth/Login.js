import React,{useState, useContext} from 'react'
import './style/Login.css'
import '../../App.css'
import { Link, useHistory} from 'react-router-dom'
import Axios from 'axios'
import {ProductContext} from '../ParentComponent'
import Loading from '../general/Loading'
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function Login() {
    const [nohp, setNoHp] = useState('')
    const [pass, setPass] = useState('')
    const [auth, setAuth] = useState({
        success: true,
        alert: '',
        text: ''
    })
    const history = useHistory()
    const productContext = useContext(ProductContext)

    const submit = e => {
        e.preventDefault()
        productContext.User.DispatchUserState({type: "SET_LOADING_USER"})
        Axios.post('http://keudepeunajoh.jsmiot.com/Data/login', {
            no_hp: nohp,
            password : pass
        }).then(res => {
            productContext.User.DispatchUserState({type: "SET_USER_STATE", data: res.data})
            if(res.data.error === false){
                setAuth({
                    success: false,
                    alert: res.data.alert,
                    text: res.data.text
                })
                setNoHp('')
                setPass('')
            }else{
                history.push('/')
            }
        }).catch(error => {
            productContext.User.DispatchUserState({type: "SET_USER_STATE_FAILED"})
        })
    }
    return (
        <div style={{height: "100%"}}>
            <div className="auth-body">
                <div className="login">
                    <h2>Masuk</h2>
                    {
                        auth.success === false ?
                        <Alert variant={auth.alert}>{auth.text}</Alert>:
                        <span></span>
                    }
                    <form action="" onSubmit={submit} className="form">
                        <input type="text" value={nohp} onChange={e => setNoHp(e.target.value)} placeholder="Masukkan no HP" required/>
                        <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Masukkan Password" required/>
                        <button type="submit"> Masuk</button>
                    </form>
                    <p>Belum Punya Akun? <Link to="/Register">Daftar</Link> </p>
                </div>
            
            </div>
            {
                productContext.User.UserState.loading ?
                <Loading color=""/>
                    
                :
                <div></div>
            }
        </div>
    )
}

export default Login
