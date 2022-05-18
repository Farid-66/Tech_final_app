import './Scss/style.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home/Home'
import Products from './page/Products/Products';
import Details from './page/Products/Details';
import Cart from './page/Cart/Cart';
import commerce from './Ecommerce'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Checkout from './page/Cart/Checkout';
import { useState, useEffect } from 'react';
import Login from './page/Register/Login'
import Register from './page/Register/Register'
import Changepass from './page/Register/Changepass';

function App() {

  // Cart==============================

  const [cart, setCart] = useState({});

  const fetchCart = () => {
    commerce.cart.retrieve().then((cart) => {
      setCart(cart)
    })
  }

  const handleAddToCart = (productId, quantity) => {
    commerce.cart.add(productId, quantity).then((item) => {
      setCart(item.cart);
    })
  }

  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart.remove(lineItemId).then((resp) => {
      setCart(resp.cart);
    })
  }

  const handleUpdateCartQty = (lineItemId, quantity) => {
    commerce.cart.update(lineItemId, { quantity }).then((resp) => {
      setCart(resp.cart);
    })
  }

  // console.log(cart)

  useEffect(() => {
    fetchCart();
  }, []);
  // ====================================================

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar cartTotalItems={cart.total_items} />
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<Cart
              cart={cart}
              removeFromCart={handleRemoveFromCart}
              updateCartQty={handleUpdateCartQty}
            />} />
            <Route path="products/:cat" element={<Products />} />
            <Route path="login" element={<Login />} />
            <Route path="changepassword" element={<Changepass />} />
            <Route path="register" element={<Register />} />
            <Route path="checkout/" element={<Checkout cart={cart} />} />
            <Route path="prducts/:productsId" element={<Details addToCart={handleAddToCart} />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
