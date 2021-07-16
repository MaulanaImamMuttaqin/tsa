import React,{useState, useContext} from 'react'
import '../../assets/style/Login.css'
import '../../App.css'
import { Link, useHistory} from 'react-router-dom'
import Axios from 'axios'
import {ProductContext} from '../ParentComponent'
import Loading from '../general/Loading'
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function Login() {
    document.title = `KeudePeunajoh Login`
    const [nohp, setNoHp] = useState('')
    const [pass, setPass] = useState('')
    const [authfailed, setAuthfailed] = useState(false)
    const history = useHistory()
    const {
        User :{ 
            DispatchUserState, 
            UserState
        },
        url
    } = useContext(ProductContext)

    const submit = e => {
        e.preventDefault()
        DispatchUserState({type: "SET_LOADING_USER"})
        
        const fd = new FormData();
        fd.append('no_hp', nohp)
        fd.append('password', pass)

        Axios.post(`${url}Auth/login2`, fd).then(res1 => {
            let token = res1.data.JWT;
            localStorage.setItem("SavedToken", token);
            DispatchUserState({type: "SET_USER_STATE", payload: res1.data.data})
            history.push('/')

        }).catch(error => {
            DispatchUserState({type: "SET_USER_STATE_FAILED"})
            setAuthfailed(true)
            setNoHp('')
            setPass('')
        })
    }



    return (
        <div>
            <div className="auth-body">
                <div className="login">
                    <h2>Masuk</h2>
                    {
                        authfailed && <Alert variant="danger">Password Salah</Alert>
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
                UserState.loading && <Loading color=""/>
            }
        </div>
    )
}

export default Login
