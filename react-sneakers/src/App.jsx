

import cls from './App.module.scss';
import AllSneakers from './Components/AllSneakers/AllSneakers';

import Header from './Components/Header/Header';
import Cart from './Components/Cart/Cart';

import { Routes, Route } from 'react-router-dom';
import Orders from './Components/Orders/Orders';

function App({
  totalPrice,
  deleteFromFavorites,
  addInFavorite,
  favorites,
  sneakers,
  addSneakersInCart,
  preloaderInCart,
  sneakersInCart,
  setCartOpen,
  deleteFromCart,
  cartOpen,
  orderIsProcessed,
  updateOrderIsProcessed,
  siLoading,
  orders

}) {

  return (
    <div className={cls.app}>
      <div className={cls.appContainer}>
        <Header totalPrice={totalPrice} setCartOpen={setCartOpen} />
        <Routes>
          <Route path="/likes" element={<AllSneakers deleteFromFavorites={deleteFromFavorites}
            addInFavorite={addInFavorite}
            favorites={favorites}
            sneakers={favorites}
            addSneakersInCart={addSneakersInCart}
            filter={true}
            title='Favorites'
          />} />

          <Route path="/" element={<AllSneakers  deleteFromFavorites={deleteFromFavorites}
            addInFavorite={addInFavorite}
            favorites={favorites}
            sneakers={sneakers}
            addSneakersInCart={addSneakersInCart}
            siLoading={siLoading}
            filter={true}
            title='All Sneakers' />} />

            <Route path="/orders" element={<Orders  deleteFromFavorites={deleteFromFavorites}
            addInFavorite={addInFavorite}
            favorites={favorites}
            orders={orders}
            addSneakersInCart={addSneakersInCart}
            siLoading={siLoading}
            
            />} />

        </Routes>


         <Cart cartOpen={cartOpen} preloaderInCart={preloaderInCart} 
        totalPrice={totalPrice} sneakers={sneakersInCart} 
        setCartOpen={setCartOpen} deleteFromCart={deleteFromCart}
        orderIsProcessed={orderIsProcessed} updateOrderIsProcessed={updateOrderIsProcessed}
         />


       


      </div>
    </div>
  );
}

export default App;
