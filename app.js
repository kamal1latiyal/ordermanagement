const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require("./config/db");
const Order = require("./models/order");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

//parse request body json
app.use(bodyparser.json());

//want default behaviour on the url
app.use(bodyparser.urlencoded({extended : false}));

//we don't want the cors problem so setting up the headers on the
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//test routes
app.get('/', (req, res, next) =>{
  res.send('Hello World!');
});

//order management routes
app.use("/api/v1", orderRoutes);

//error handling

app.use((error, req, res, next) =>{
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({message: message});
})

//sync database
sequelize
  .sync()
  .then(result =>{
    console.log('Database connected');
    app.listen(3500);
  })
  .catch(err => console.log(err));
