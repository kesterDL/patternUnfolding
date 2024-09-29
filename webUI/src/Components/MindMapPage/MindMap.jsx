import React, { useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider, // Import the provider
} from "react-flow-renderer";

function MindMap({ json }) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (json && json.nodes && json.edges) {
      const nodes = json.nodes.map((node) => ({
        id: node.id,
        data: { label: node.label },
        position: node.position,
        type: "default",
      }));

      const edges = json.edges.map((edge) => ({
        id: `e${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        type: "smoothstep",
        label: edge.label,
      }));

      console.log("Nodes:", nodes); // Debugging nodes
      console.log("Edges:", edges); // Debugging edges

      setElements([...nodes, ...edges]);
    }
  }, [json]);

  return (
    <ReactFlowProvider>
      <div style={{ height: "500px", width: "100%" }}>
        <ReactFlow elements={elements}>
          <Background color="#aaa" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default MindMap;
