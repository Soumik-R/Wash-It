const PriorityQueue = require("./priorityQueue");

const orderQueue = new PriorityQueue();

const addOrderToQueue = (order) => {
  orderQueue.enqueue(order);
};

const processNextOrder = () => {
  if (orderQueue.isEmpty()) return null;
  return orderQueue.dequeue();
};

module.exports = {
  addOrderToQueue,
  processNextOrder
};
