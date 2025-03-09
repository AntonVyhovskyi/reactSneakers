
import { useEffect, useState } from 'react';

import axios from 'axios';
import { v4 as uuid } from 'uuid';

import App from './App';

function AppContainer() {
  const [cartOpen, setCartOpen] = useState(false)
  const [sneakers, setSneakers] = useState([])
  const [sneakersInCart, setSneakersInCart] = useState([])
  const [totalPrice, setTotalPrice] = useState()
  const [preloaderInCart, setPreloaderInCart] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [orderIsProcessed, setOrderIsProcessed] = useState(false)
  const [siLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([])


  // ------------------------------------------------- USE EFFECTS -----------------------------------------------------


  // total price ------------------------------------------


  useEffect(() => {
    const newTotalPrice = sneakersInCart.reduce((total, sneakers) => total + sneakers.price, 0)
    setTotalPrice(newTotalPrice.toFixed(2))
  }, [sneakersInCart])

  // all sneakers ----------------------------------------

  useEffect(() => {
    setIsLoading(true)
    axios.get('http://localhost:3010/api/todo-items')
      .then(response => {


        setSneakers(response.data.data)
        setIsLoading(false)

      }).catch((error) => {
        console.log(error);
      })
  }, [])

  // favorites -------------------------------------------


  useEffect(() => {
    setIsLoading(true)
    axios.get('http://localhost:3010/api/favorites')
      .then(response => {


        setFavorites(response.data.data)
        setIsLoading(false)
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  // in cart -------------------------------------------


  useEffect(() => {
    setIsLoading(true)
    axios.get('http://localhost:3010/api/in-cart')
      .then(response => {



        setSneakersInCart(response.data.data)
        setIsLoading(false)




      }).catch((error) => {
        console.log(error);
      })
  }, [])

  // orders --------------------------------------------------

  useEffect(()=>{
    axios.get('http://localhost:3010/api/orders')
    .then(response=> {
       setOrders(response.data.data)
    }).catch((error)=> {
      console.log(error);
    })
  }, [])


  //--------------------------------------------------- FUNCTIONS -------------------------------------------------------


  // add in cart --------------------------------------------

  function addSneakersInCart(id) {
    const foundSneakers = sneakers.find((e) => e.id === id)

    if (foundSneakers) {
      const newId = uuid()
      const newSneakers = { ...foundSneakers, id: newId }
      setSneakersInCart([...sneakersInCart, newSneakers])
      axios.post('http://localhost:3010/api/add-in-cart', newSneakers, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {


      }).catch(error => {
        console.error('Ошибка при выполнении POST-запроса:', error);

      });
    }
  }

  // delete from cart --------------------------------------------

  function deleteFromCart(id) {
    const newArray = sneakersInCart.filter((e) => e.id !== id)
    if (newArray) {

      setPreloaderInCart(true)
      axios.delete(`http://localhost:3010/api/remove-in-cart/${id}`).then(response => {

        setPreloaderInCart(false)
        setSneakersInCart(newArray)
      })
        .catch(err => {
          console.error('Ошибка при выполнении DELETE-запроса:', err);
          setPreloaderInCart(false)
        })
    }
  }

  // add in favorites --------------------------------------------

  function addInFavorite(id) {
    const checkObj = favorites.find((e) => e.id === id)
    if (!checkObj) {
      const newObj = sneakers.find((e) => e.id === id)
      axios.post('http://localhost:3010/api/add-in-favorites', newObj, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        setFavorites(prev => [...prev, newObj])

      }).catch(error => {
        console.error('Ошибка при выполнении POST-запроса:', error);

      });

    }
  }

  // delete from favorites ----------------------------------------

  function deleteFromFavorites(id) {
    const newArray = favorites.filter((e) => e.id !== id)


    axios.delete(`http://localhost:3010/api/delete-from-favorites/${id}`).then(response => {
      if (response.status === 200)
        setFavorites(newArray)

    })
      .catch(err => {
        console.error('Ошибка при выполнении DELETE-запроса:', err);

      })
  }



// order Is Processed -----------------------------------------------

async function updateOrderIsProcessed(status) {
  if (!status) {
    setOrderIsProcessed(false);
  }

  if (status) {
    try {
      const response = await axios.post('http://localhost:3010/api/add-in-orders', {id: uuid(), items:sneakersInCart}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setOrders(prev => [...prev, {id: uuid(), items:sneakersInCart}]);

        await axios.delete('http://localhost:3010/api/remove-all-from-cart');
        setSneakersInCart([]);
        setOrderIsProcessed(true);
      }
    } catch (error) {
      console.error('Помилка під час виконання POST-запиту:', error);
    }
  }
}

  return (
    <>
    <App
     totalPrice={totalPrice}
     deleteFromFavorites={deleteFromFavorites}
     addInFavorite={addInFavorite}
     favorites={favorites}
     sneakers={sneakers}
     addSneakersInCart={addSneakersInCart}
     preloaderInCart={preloaderInCart} 
     sneakersInCart={sneakersInCart} 
     setCartOpen={setCartOpen}
     deleteFromCart={deleteFromCart}
     cartOpen={cartOpen}
     orderIsProcessed={orderIsProcessed}
     updateOrderIsProcessed={updateOrderIsProcessed}
     siLoading={siLoading}
     orders={orders}
    />
    </>
  );
}

export default AppContainer;
