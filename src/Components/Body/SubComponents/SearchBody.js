import React,{useContext, useEffect} from 'react'
import Food from './Food';
import {ProductContext} from '../../ParentComponent'
import axios from 'axios'
import Loading from '../../general/Loading';
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Error from '../../general/Error';
function SearchBody() {
    const {SearchProduct: {
            SearchProductState, 
            DispatchSearchProductState
        }, 
            Product:{
                ProductState
        },
        url
    } = useContext(ProductContext)


    let {key} = useParams()

    useEffect(() => {
        document.title = `KeudePeunajoh Cari ${key}`
        DispatchSearchProductState({type: 'SET_LOADING'})
        axios.get(`${url}Data?search=${key}`)
            .then(response => {
                DispatchSearchProductState({type: 'FETCH_SUCCESS', payload:response.data.data})
            })
            .catch(error =>{
                console.log('error')
                DispatchSearchProductState({type: 'FETCH_ERROR'})
            })
        
    },[key, DispatchSearchProductState, url])
    
    if(SearchProductState.error){
        return(
               <Error/>
        )
    }else{

        return (
            <div >
                {
                    SearchProductState.loading ? <Loading color="loading-white"/> :
                        <div className="content">
                            
                            <Container>
                                <div className="content-header">
                                    <h4>Hasil berdasarkan pencarian "{key}"</h4>
                                </div>
                                <div className="foods">
                                    
                                            <div>
                                                {Object.keys(SearchProductState.data.product).length === 0
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
}

export default SearchBody
