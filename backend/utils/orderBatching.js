const getDistance = require("./distance");

const batchOrdersGreedy = (agentLocation, orders, maxOrders = 5) => {
  // Sort orders by distance (GREEDY)
  const sortedOrders = orders.sort((a, b) => {
    const distA = getDistance(agentLocation, a.location);
    const distB = getDistance(agentLocation, b.location);
    return distA - distB;
  });

  // Pick closest orders
  return sortedOrders.slice(0, maxOrders);
};

module.exports = batchOrdersGreedy;
