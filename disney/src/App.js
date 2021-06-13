import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Link} from 'react-router-dom'
import Main from './components/Main';
import ProductDetails from './components/ProductDetails';
import { useEffect, useState } from 'react';
import axios from "axios"
import Cart from './components/Cart'
import {useClickToClose} from './CTC'

function App() {
  const [cartItems,setCartItems] = useState()
  const [isOpen,setIsOpen] = useState(false)
  
  const handleAddItem = (item)=>{
    setCartItems([...cartItems,item])
  }
  
  const getCart = async()=> {
    try{
      const {data} = await axios.get("http://localhost:5000/cart")
      setCartItems(data)
    }catch(err){
      console.log(err)
    }
  }
 
  const deleteCartItem = async(id)=> {
    try{
      const {data} = await axios.post(`http://localhost:5000/delitem`,{id})
      if(data.success){
        console.log("mmmmmmmmmmm")
        setCartItems(cartItems.filter(e => e._id != id ))
      }
    }catch(err){
      console.log(err)
    }
  }

  const node = useClickToClose(()=>setIsOpen(false),"#cart")
  
  useEffect(() => {
    getCart()
  }, [])

  return <BrowserRouter>
  <div className="w-5/6 mx-auto flex flex-col items-center">
      <Link to="/" className="font-bold text-2xl mt-4">Disney Shop</Link>
      <div className="w-full flex items-center justify-end relative" onClick={()=>setIsOpen(true)}>
            <div className="w-max p-2 border rounded-md flex items-center justify-between cursor-pointer" >
                <img src="../cart.png" className="w-10 h-10 mr-4" />
                <span>{`My Cart (${cartItems?.length})`}</span>
                <button className="px-4 focus:outline-none py-2">v</button>
            </div>
            {isOpen&&<Cart items={cartItems} handleDel={deleteCartItem} node={node} />}
      </div>
      <Route path="/" exact={true} component={Main} />
      <Route path="/product/:page" component={ProductDetails} x="mmmmmmmmmm" />
  </div> 


  </BrowserRouter>

}
export default App;
