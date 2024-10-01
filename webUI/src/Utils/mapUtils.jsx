export function generateNodesAndEdges(json) {
  const nodes = [];
  const edges = [];
  const edgeSet = new Set(); // To track created edges

  // Create nodes first
  Object.keys(json).forEach((key) => {
    const entity = json[key];
    var backgroundColor = "#fffff";
    var styling = {};
    if (entity.type === "Place") {
      backgroundColor = "#376443";
    }
    if (entity.type === "Thing") {
      backgroundColor = "#558aa1";
    }
    if (
      entity.name === "rand al'thor" ||
      entity.name === "perrin aybara" ||
      entity.name === "matrim cauthon"
    ) {
      nodes.push({
        id: entity.name,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: { label: entity.name },
        style: { background: "#901100", width: "10rem", height: "7rem" },
      });
    } else {
      nodes.push({
        id: entity.name,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
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
        const edgeId = `e${entity.name}-${person}`;
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
        const edgeId = `e${entity.name}-${person}`;
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
        const edgeId = `e${entity.name}-${place}`;
        const sortedEdge = [entity.name, place].sort(); // Sort to standardize
        const uniqueEdgeId = `e${sortedEdge[0]}-${sortedEdge[1]}`;

        if (!edgeSet.has(uniqueEdgeId)) {
          edges.push({
            id: uniqueEdgeId,
            source: sortedEdge[0],
            target: sortedEdge[1],
          });
          edgeSet.add(uniqueEdgeId);
        }
      });
    }
  });

  // Ensure all nodes and edges are generated
  console.log(
    "Nodes: ",
    nodes.map((node) => node.id)
  ); // Debugging
  console.log("Edges: ", edges); // Debugging
  return { nodes, edges };
}
