import React,{useContext, useEffect} from 'react'
import Food from './Food';
import {ProductContext} from '../../ParentComponent'
import axios from 'axios'
import Loading from '../../general/Loading';
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap';
function SearchBody() {
    const {SearchProduct: {
            SearchProductState, 
            DispatchSearchProductState
        }, 
            Product:{
                ProductState
        }
    } = useContext(ProductContext)


    let {key} = useParams()

    useEffect(() => {
        document.title = `KeudePeunajoh Cari ${key}`
        DispatchSearchProductState({type: 'SET_LOADING'})
        axios.get(`http://keudepeunajohapi.jsmiot.com/Data?search=${key}`)
            .then(response => {
                DispatchSearchProductState({type: 'FETCH_SUCCESS', payload:response.data.data})
            })
            .catch(error =>{
                console.log('error')
                DispatchSearchProductState({type: 'FETCH_ERROR'})
            })
        
    },[key])
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
                
                <Container>
                    <div className="content-header">
                        <h4>Hasil berdasarkan pencarian "{key}"</h4>
                    </div>
                    <div className="foods">
                        
                                <div>
                                    {SearchProductState.data.product === false
                                        ? <p>Tidak hasil pencarian untuk {key}</p>
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
                </Container>
                 
                <div className="clear"></div>
            </div>
            } 
        </div>
    )
}

export default SearchBody
