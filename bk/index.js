const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3010;

const app = express();

app.use(bodyParser.json());



app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});




const todoItems = require('./api/todo-items.json');
app.get('/api/todo-items', (req, res) => {
 res.json({ data: todoItems });
});



// ---------------------------------------------------- IN CART ------------------------------------------------------------------------

const inCart = require('./api/in-cart.json');
app.get('/api/in-cart', (req, res) => {
 res.json({ data: inCart });
});


app.post('/api/add-in-cart', (req, res) => {
    fs.readFile('./api/in-cart.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка сервера');
        }

        
        const items = JSON.parse(data);

       
        const newItem = req.body;
        // newItem.id = items.length + 1; // Присвоить уникальный ID
        items.push(newItem);

        
        fs.writeFile('./api/in-cart.json', JSON.stringify(items, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Ошибка сервера');
            }

            
            res.status(200).send('Новый объект успешно добавлен');
        });
    });
});

app.delete('/api/remove-in-cart/:id', (req, res)=>{
    const itemIdToRemove = req.params.id;

    fs.readFile('./api/in-cart.json', 'utf8', (err, data) => {

        if(err) {
            console.error(err);
            return res.status(500).send('Ошибка сервера');
        }

        let items = JSON.parse(data);

        const indexToRemove = items.findIndex(item=> item.id === itemIdToRemove)
        if (indexToRemove === -1) {
            console.error(err);
            return res.status(404).send('Элемент не найден')
        }

        items.splice(indexToRemove, 1)

        fs.writeFile('./api/in-cart.json', JSON.stringify(items, null, 2), (err)=> {
            if (err) {
                console.error(err);
                return res.status(500).send('Ошибка сервера')
            }
            res.status(200).send(`Элемент с id ${itemIdToRemove} успешно удален`)
        })
    })
})

app.delete('/api/remove-all-from-cart', (req, res)=>{
    


        fs.writeFile('./api/in-cart.json', JSON.stringify([], null, 2), (err)=> {
            if (err) {
                console.error(err);
                return res.status(500).send('Ошибка сервера')
            }
            res.status(200).send(`cart is empty`)
        })
    
})
// ------------------------------------------------------------- FAVORITES --------------------------------------------------------------

const favorites = require('./api/favorites.json');
app.get('/api/favorites', (req, res) => {
 res.json({ data: favorites });
});


app.post('/api/add-in-favorites', (req, res) => {
    fs.readFile('./api/favorites.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('server error')
        }

        const items = JSON.parse(data)

        const newItem = req.body

        items.push(newItem)

        fs.writeFile('./api/favorites.json', JSON.stringify(items, null, 2), (err) => {
            if (err) {
                console.error(err)
                return res.status(500).send('server error')
            }

            res.status(200).send('new object is added in favorites')
        })
    })
})


app.delete('/api/delete-from-favorites/:id', (req, res) => {
    const itemIdToRemove = parseInt(req.params.id);

    fs.readFile('./api/favorites.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка сервера');
        }

        let itemsFavorites = JSON.parse(data)

        const indexToFavoriteRemove = itemsFavorites.findIndex(item=> item.id === itemIdToRemove)
        console.log(indexToFavoriteRemove);
        if (indexToFavoriteRemove === -1) {
            console.error(err);
            return res.status(404).send('Элемент не найден')
        }

        itemsFavorites.splice(indexToFavoriteRemove, 1)

        fs.writeFile('./api/favorites.json', JSON.stringify(itemsFavorites, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Ошибка сервера')
            }
            res.status(200).send(`element with id ${itemIdToRemove} deleted`)
        })
    })
})


// ------------------------------------------------------------- ORDERS --------------------------------------------------------------

const orders = require('./api/orders.json');
app.get('/api/orders', (req, res) => {
 res.json({ data: orders });
});

app.post('/api/add-in-orders', (req, res) => {
    fs.readFile('./api/orders.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('server error')
        }

        const items = JSON.parse(data)

        const newItem = req.body

        items.push(newItem)

        fs.writeFile('./api/orders.json', JSON.stringify(items, null, 2), (err) => {
            if (err) {
                console.error(err)
                return res.status(500).send('server error')
            }

            res.status(200).send('new object is added in orders')
        })
    })
})


app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})