import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Login from './components/LoginSignupPage/Login';
import { useEffect, useState } from 'react';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';


function App() {
    const [navbar,setNavebar]=useState(false)
    const [userId,setUserId]=useState(-1)
    const [category,setCategory]=useState("all")
    const filterData=(product)=>{
        if(category=="all")return product;
        let filteredData=[];
        filteredData=product.filter((ele)=>ele.category==category);
        return filteredData;
    }
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    {navbar && <Navbar setNavebar={setNavebar} setCategory={setCategory}/>}
                    <Routes>
                        <Route path="/" element={<Login setUserId={setUserId}/>}></Route>
                        <Route path="/Home" element={<Home setNavebar={setNavebar} userId={userId} filterData={filterData} setCategory={setCategory}/>}></Route>
                        <Route path="/cart" element={<Cart setNavebar={setNavebar} userId={userId}/>}></Route>
                        <Route path="/checkout" element={<PlaceOrder  setNavebar={setNavebar}/>}></Route>
                    </Routes>
                    
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
