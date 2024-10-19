export function generateNodesAndEdges(json) {
  const nodes = [];
  const edges = [];
  const edgeSet = new Set(); // To track created edges

  // Create nodes first
  Object.keys(json).forEach((key) => {
    const entity = json[key];
    var backgroundColor = "#636567"; // Default background
    if (entity.type === "Place") {
      backgroundColor = "#376443"; // Greenish color for places
    }
    if (entity.type === "Thing") {
      backgroundColor = "#558aa1"; // Bluish color for things
    }

    // Centralize "rand al'thor", "perrin aybara", and "matrim cauthon"
    if (
      entity.name === "rand al'thor" ||
      entity.name === "perrin aybara" ||
      entity.name === "matrim cauthon"
    ) {
      nodes.push({
        id: entity.name,
        position: { x: Math.random() * 3, y: Math.random() * 3 }, // Place near the center
        data: { label: entity.name },
        style: { background: "#901100", width: "15rem", height: "15rem" }, // Unique style for these nodes
      });
    } else {
      nodes.push({
        id: entity.name,
        position: {
          x: Math.random() * 500 - 250,
          y: Math.random() * 500 - 250,
        }, // Spread around the map
        data: { label: entity.name },
        style: { background: backgroundColor },
      });
    }
  });

  // Create edges between places and people, and between people
  Object.keys(json).forEach((key) => {
    const entity = json[key];

    // Create edges between places and people
    if (entity.type === "Place") {
      entity.people.forEach((person) => {
        const sortedEdge = [entity.name, person].sort(); // Sort to standardize
        const uniqueEdgeId = `e${sortedEdge[0]}-${sortedEdge[1]}`;

        if (!edgeSet.has(uniqueEdgeId)) {
          edges.push({
            id: uniqueEdgeId,
            source: sortedEdge[0],
            target: sortedEdge[1],
            style: { stroke: "#796b40" },
            type: "smoothstep",
          });
          edgeSet.add(uniqueEdgeId);
        }
      });
    }

    // Create edges between people
    if (entity.type === "Person") {
      entity.people.forEach((person) => {
        const sortedEdge = [entity.name, person].sort(); // Sort to standardize
        const uniqueEdgeId = `e${sortedEdge[0]}-${sortedEdge[1]}`;

        if (!edgeSet.has(uniqueEdgeId) && json[person]) {
          edges.push({
            id: uniqueEdgeId,
            source: sortedEdge[0],
            target: sortedEdge[1],
          });
          edgeSet.add(uniqueEdgeId);
        }
      });

      // Create edges between people and places they are associated with
      entity.places.forEach((place) => {
        const sortedEdge = [entity.name, place].sort(); // Sort to standardize
        const uniqueEdgeId = `e${sortedEdge[0]}-${sortedEdge[1]}`;

        if (!edgeSet.has(uniqueEdgeId)) {
          edges.push({
            id: uniqueEdgeId,
            source: sortedEdge[0],
            target: sortedEdge[1],
            style: { stroke: "#796b40" },
            type: "smoothstep",
          });
          edgeSet.add(uniqueEdgeId);
        }
      });
    }
  });

  // Create edges between Place nodes
  Object.keys(json).forEach((key) => {
    const entity = json[key];

    if (entity.type === "Place") {
      entity.places.forEach((place) => {
        if (json[place] && json[place].type === "Place") {
          const sortedEdge = [entity.name, place].sort(); // Sort to standardize
          const uniqueEdgeId = `e${sortedEdge[0]}-${sortedEdge[1]}`;

          if (!edgeSet.has(uniqueEdgeId)) {
            edges.push({
              id: uniqueEdgeId,
              source: sortedEdge[0],
              target: sortedEdge[1],
              style: { stroke: "#376443" }, // Different stroke color for Place-to-Place edges
              type: "smoothstep",
            });
            edgeSet.add(uniqueEdgeId);
          }
        }
      });
    }
  });

  return { nodes, edges };
}
