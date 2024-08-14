const express = require('express');
const app = express();
const cors = require('cors');
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")});

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);

app.get("/api/v1", (req, res) => {
    res.send("Welcome to the Server!");
  });


// if(process.env.NODE_ENV === "production") {
    
//     app.use(express.static(path.join(__dirname, 'https://easy-buy-fe.vercel.app')));
    
//     app.get('*', (req, res) =>{
       
//         res.send('EasyBuy E-Commerce Backend Running Successfully')
//     })
// }

app.use(errorMiddleware)

module.exports = app;