const PriorityQueue = require("./priorityQueue");

const dijkstra = (graph, start, end) => {
  const distances = {};
  const pq = new PriorityQueue();
  const previous = {};

  for (let vertex in graph.adjacencyList) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }

  distances[start] = 0;
  pq.enqueue({ vertex: start, priority: 0 });

  while (!pq.isEmpty()) {
    const { vertex } = pq.dequeue();

    if (vertex === end) break;

    for (let neighbor of graph.adjacencyList[vertex]) {
      const alt = distances[vertex] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        previous[neighbor.node] = vertex;
        pq.enqueue({ vertex: neighbor.node, priority: alt });
      }
    }
  }

  // Build path
  const path = [];
  let current = end;
  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    distance: distances[end],
    path
  };
};

module.exports = dijkstra;
