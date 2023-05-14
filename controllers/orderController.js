const { Sequelize } = require('sequelize');
const Orderdb = require('../models/order');
const Servicedb = require('../models/service');
const moment = require('moment');

module.exports = {
  async getAllOrders(req, res) {
    try {
      const orders = await Orderdb.findAll();
      return res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getOrderById(req, res) {
    try {
      const order = await Orderdb.findByPk(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createOrder(req, res) {
    try {
      const { datetime, totalfee, services } = req.body;
      //here we are flexible when order would be created(timestamp) so we are checking the add and substraction both cases.
      const existingOrder = await Orderdb.findOne({
        where: {
          datetime: {
            [Sequelize.Op.between]: [
              moment(datetime).subtract(3, 'hours').toDate(),
              moment(datetime).add(3, 'hours').toDate(),
            ],
          },
        },
      });
      if (existingOrder) {
        return res.status(400).json({
          message: 'Order creation failed. Another order exists within 3 hours of this order',
        });
      }
      const order = await Orderdb.create({ datetime, totalfee,services });
      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateOrder(req, res) {
    try {
      const { datetime, totalfee, services } = req.body;
      const existingOrder = await Orderdb.findOne({
        where: {
          datetime: {
            [Sequelize.Op.between]: [
              moment(datetime).subtract(3, 'hours').toDate(),
              moment(datetime).add(3, 'hours').toDate(),
            ],
          },
          id: {
            [Sequelize.Op.eq]: req.params.id,
          },
        },
      });
      if (existingOrder) {
        return res.status(400).json({
          message: 'Order update failed. Another order exists within 3 hours of this order',
        });
      }
      const order = await Orderdb.findByPk(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      await order.update({ datetime, totalfee, services });
      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createService(req, res) {
    try {
      // Get the name from the request body
      const { name } = req.body;

      const existingService = await Servicedb.findOne({ where: { name: name } });
      if (existingService) {
        return res.status(304).json({ message: 'service is already present with given name' });
      }
  
      // Create a new Service record in the database
      const service = await Servicedb.create({
        name,
      });
  
      // Return the newly created Service record as the response
      return res.status(200).json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      const order = await Orderdb.findByPk(orderId);
      
      if (!order) {
        return res.status(404).json({ message: `Order with id ${orderId} not found` });
      }
      
      await order.destroy();
      
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
