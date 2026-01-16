const Graph = require("../utils/graph");
const dijkstra = require("../utils/dijkstra");

exports.optimizeRoute = (req, res) => {
  const { locations, start, end } = req.body;

  const graph = new Graph();

  // Add vertices
  locations.forEach(loc => graph.addVertex(loc.name));

  // Add edges
  locations.forEach(loc => {
    loc.connections.forEach(conn => {
      graph.addEdge(loc.name, conn.to, conn.distance);
    });
  });

  const result = dijkstra(graph, start, end);
  res.json(result);
};
