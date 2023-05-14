const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/allorders', orderController.getAllOrders);

router.get('/order/:id', orderController.getOrderById);

router.post('/create/order', orderController.createOrder);

router.post('/create/service', orderController.createService);

router.put('/update/order/:id', orderController.updateOrder);

router.delete('/remove/order/:id', orderController.deleteOrder);

module.exports = router;
