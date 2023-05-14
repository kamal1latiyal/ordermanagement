const express = require("express");
const Order = require("../models/order");
const { expect } = require("chai");

describe("Order", () => {
  it("should create an order", async () => {
    const order = new Order({
      datetime: "2023-05-14T11:11:11.111Z",
      totalfee: 100,
      services: [
        {
          id: 123,
        }
      ]
    });

    await order.save();

    expect(order).to.be.an.instanceof(Order);
    expect(order.id).to.be.a.number;
    expect(order.datetime).to.be.a.string;
    expect(order.totalfee).to.be.a.number;
    expect(order.services).to.be.an.array;
    expect(order.services[0].id).to.be.a.number;
  });

  it("should update an order", async () => {
    const order = await Order.findById(1);
    order.datetime = "2023-05-15T11:11:11.111Z";
    await order.save();

    expect(order.datetime).to.be.equal("2023-05-15T11:11:11.111Z");
  });

  it("should delete an order", async () => {
    const order = await Order.findById(1);
    await order.destroy();

    expect(await Order.findById(1)).to.be.null;
  });
});