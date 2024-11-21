
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Homepage from "./pages/Homepage";
import ProductDetails from "./pages/productDetails";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Checkout from "./pages/checkout";
import CompleteOrder from "./pages/completeOrder";
import OrderHistory from "./pages/orderHistory";


function App() {



  const userLoginReducer = useSelector((state)=>state.userLoginReducer)
  const {userInfo}= userLoginReducer

  
  
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Homepage/>}/>
      <Route exact path='/login' element={userInfo ? <Navigate to={'/'}/>  : <Login/>}/>
      <Route exact path='/register' element={userInfo ? <Navigate to={'/'}/>  : <Register/>}/>
      <Route exact path='/details/:id' element={<ProductDetails/>}/>
      <Route exact path='/checkout' element={<Checkout/>}/>
      <Route exact path='/payments' element={<CompleteOrder/>}/>
      <Route exact path='/order-history' element={<OrderHistory/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
