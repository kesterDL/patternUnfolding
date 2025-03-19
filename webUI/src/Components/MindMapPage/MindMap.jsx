import React, { useCallback, useEffect, useState } from "react";
import Dagre from "@dagrejs/dagre";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import styles from "./MindMap.module.css";
import { generateNodesAndEdges } from "../../Utils/mapUtils";

const nodeWidth = 172;
const nodeHeight = 36;

const DagreGraph = new Dagre.graphlib.Graph();
DagreGraph.setDefaultEdgeLabel(() => ({}));

// Function to apply Dagre layout
const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const isHorizontal = direction === "LR";
  DagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    DagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    DagreGraph.setEdge(edge.source, edge.target);
  });

  Dagre.layout(DagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = DagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

function MindMap({ json }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [layoutDirection, setLayoutDirection] = useState("LR"); // State for layout direction

  useEffect(() => {
    const { nodes: generatedNodes, edges: generatedEdges } =
      generateNodesAndEdges(json);

    // Apply the selected Dagre layout
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      generatedNodes,
      generatedEdges,
      layoutDirection // Use the selected layout direction
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [json, layoutDirection]); // Re-run when layoutDirection changes

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const switchToHorizontal = () => {
    setLayoutDirection("LR");
  };

  const switchToVertical = () => {
    setLayoutDirection("TB");
  };

  return (
    <div className={styles.mapCard}>
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      {/* Buttons to switch between layouts */}
      <div className={styles.layoutButtons}>
        <button onClick={switchToHorizontal}>Vertical Layout</button>
        <button onClick={switchToVertical}>Horizontal Layout</button>
      </div>
    </div>
  );
}

export default MindMap;
