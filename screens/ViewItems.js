import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

function ViewItems() {

    const [items, setItems] = useState([])

    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get(`${config.url}/viewitems`)
            .then(items => setItems(items.data))
            .catch(err => console.log(err))
    }, [items])
    return (
    
            <div className='items-container'>
                <h4>View Items</h4>
                <div className='search-box'>
                    <form>
                        <input type='search' placeholder='Search Here....' onChange={(e) => setSearch(e.target.value)}/>
                    </form>
                    <Link to='/additems' className='additem'>Add Item</Link>
                </div>
                <div className='items-card-container'>
                    {
                        items && items.filter(item => {
                            return search.toLowerCase() === ''
                            ? item
                            : item.Itemname.toLowerCase().includes(search);
                        }).map((item) => {
                            return (

                                <div class="card" key={item._id}>
                                    <img src={`/uploads/${item.image}`} class="card-img-top" alt="" />
                                    <div class="card-body">
                                        <h5 class="card-title">{item.Itemname}</h5>
                                        <p class="card-text">Price : {item.Price}</p>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        
    )
}

export default ViewItems