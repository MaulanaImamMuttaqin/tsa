import React,{useContext, useEffect} from 'react'
import '../style/HomeBody.css'
import '../style/food.css'
import Food from './Food';
import {ProductContext} from '../../ParentComponent'
import axios from 'axios'
import Loading from '../../general/Loading';
import { useParams } from 'react-router-dom'
function SearchBody() {
    const {SearchProduct: {
            SearchProductState, 
            DispatchSearchProductState
        }, 
            Product:{
                ProductState
        }, 
            ButtClickSearch:{
                ButtSearch
        }
    } = useContext(ProductContext)


    let {key} = useParams()

    useEffect(() => {
        DispatchSearchProductState({type: 'SET_LOADING'})
        axios.get(`http://localhost/keudepeunajoh-rest-api/api/Data?search=${key}`)
            .then(response => {
                DispatchSearchProductState({type: 'FETCH_SUCCESS', payload:response.data.data})
            })
            .catch(error =>{
                console.log('error')
                DispatchSearchProductState({type: 'FETCH_ERROR'})
            })
    
    },[ButtSearch])

    return (
        <div style={
            ProductState.loading ? { height : "100%"}:
            {height: ""}
        }>
            {
                SearchProductState.loading ? <Loading color="loading-white"/> :
            <div className="content"
            style={
                ProductState.loading ? { height : "100%"}:
                {height: "auto"}
            }
            >
                
                <div className="container">
                    <div className="content-header">
                        <h4>Hasil berdasarkan pencarian "{key}"</h4>
                    </div>
                    <div className="foods">
                        
                                <div>
                                    {SearchProductState.data.product === false
                                        ? <p>Tidak hasil pencarian untuk {ButtSearch}</p>
                                        : <div className="foods">
                                        {
                                             SearchProductState.data.product.map(data => 
                                                <Food key={data.id} Data={data}/>
                                            )
                                        }
                                        
                                    </div>
                                    }
                                    
                                </div>
                             
                    </div>
                </div>
                 
                <div className="clear"></div>
            </div>
            } 
        </div>
    )
}

export default SearchBody
