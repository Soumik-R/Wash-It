// Dijkstra's Algorithm for Shortest Path
class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(name) {
    if (!this.nodes.has(name)) {
      this.nodes.set(name, []);
    }
  }

  addEdge(from, to, distance) {
    this.addNode(from);
    this.addNode(to);
    this.nodes.get(from).push({ node: to, distance });
  }

  dijkstra(start, end) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();

    // Initialize
    for (let node of this.nodes.keys()) {
      distances.set(node, Infinity);
      previous.set(node, null);
      unvisited.add(node);
    }
    distances.set(start, 0);

    while (unvisited.size > 0) {
      // Find node with minimum distance
      let current = null;
      let minDistance = Infinity;
      
      for (let node of unvisited) {
        if (distances.get(node) < minDistance) {
          minDistance = distances.get(node);
          current = node;
        }
      }

      if (current === null || current === end) break;

      unvisited.delete(current);

      // Update distances to neighbors
      const neighbors = this.nodes.get(current) || [];
      for (let { node, distance } of neighbors) {
        if (unvisited.has(node)) {
          const newDistance = distances.get(current) + distance;
          if (newDistance < distances.get(node)) {
            distances.set(node, newDistance);
            previous.set(node, current);
          }
        }
      }
    }

    // Build path
    const path = [];
    let current = end;
    
    while (current !== null) {
      path.unshift(current);
      current = previous.get(current);
    }

    // Check if path exists
    if (path[0] !== start) {
      return { distance: Infinity, path: [] };
    }

    return {
      distance: distances.get(end),
      path
    };
  }
}

function optimizeRoute(locations, start, end) {
  const graph = new Graph();

  // Build graph from locations
  for (let location of locations) {
    graph.addNode(location.name);
    
    for (let connection of location.connections) {
      graph.addEdge(location.name, connection.to, connection.distance);
    }
  }

  // Run Dijkstra's algorithm
  return graph.dijkstra(start, end);
}

module.exports = { optimizeRoute };
