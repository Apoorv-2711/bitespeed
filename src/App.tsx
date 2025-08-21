/**
 * Main App Component - BiteSpeed Chatbot Flow Builder
 *
 * This is the main component that orchestrates the entire flow builder application.
 * It manages the React Flow instance, handles drag-and-drop, and coordinates
 * between the flow canvas, nodes panel, and settings panel.
 */

import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Node,
  Edge,
  NodeTypes,
  ConnectionMode,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import TextNode from "./components/TextNode";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";
import { CustomNode, CustomEdge, NodeType, PanelType } from "./types";
import {
  validateFlow,
  canConnect,
  generateNodeId,
  generateEdgeId,
} from "./utils/validation";
import { getNodeConfig, createDefaultNodeData } from "./config/nodeTypes";

// Define custom node types for React Flow
const nodeTypes: NodeTypes = {
  textMessage: TextNode,
};

// Initial nodes and edges (empty flow)
const initialNodes: CustomNode[] = [];
const initialEdges: CustomEdge[] = [];

const App: React.FC = () => {
  // React Flow state management
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // UI state management
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [panelType, setPanelType] = useState<PanelType>("nodes");
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");

  // Ref for tracking drag and drop
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  /**
   * Handle node click - switch to settings panel for the selected node
   */
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as CustomNode);
    setPanelType("settings");
  }, []);

  /**
   * Handle clicking on the canvas background - deselect nodes and go back to nodes panel
   */
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setPanelType("nodes");
  }, []);

  /**
   * Handle edge connections with validation
   */
  const onConnect = useCallback(
    (params: Connection) => {
      // Validate connection according to business rules
      const canMakeConnection = canConnect(
        params.source || "",
        params.sourceHandle || undefined,
        params.target || "",
        params.targetHandle || undefined,
        edges as CustomEdge[]
      );

      if (canMakeConnection) {
        const newEdge: CustomEdge = {
          id: generateEdgeId(params.source || "", params.target || ""),
          source: params.source || "",
          target: params.target || "",
          sourceHandle: params.sourceHandle || undefined,
          targetHandle: params.targetHandle || undefined,
        };

        setEdges((eds) => addEdge(newEdge, eds));
        setValidationMessage("");
        setMessageType("");
      } else {
        setValidationMessage(
          "Cannot create connection: Source handles can only have one outgoing connection."
        );
        setMessageType("error");

        // Clear error message after 3 seconds
        setTimeout(() => {
          setValidationMessage("");
          setMessageType("");
        }, 3000);
      }
    },
    [edges, setEdges]
  );

  /**
   * Handle drag start for nodes from the panel
   */
  const onDragStart = useCallback(
    (event: React.DragEvent, nodeType: NodeType) => {
      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  /**
   * Handle drag over for the flow canvas
   */
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Handle drop to create new nodes
   */
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const nodeType = event.dataTransfer.getData(
        "application/reactflow"
      ) as NodeType;

      // Check if the dropped element is a valid node type
      if (!nodeType || !reactFlowBounds) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeConfig = getNodeConfig(nodeType);
      const defaultData = createDefaultNodeData(nodeType);
      const newNode: CustomNode = {
        id: generateNodeId(nodeType),
        type: nodeType,
        position,
        data: {
          label:
            defaultData.label || nodeConfig.defaultData.label || "New Node",
          text:
            defaultData.text ||
            nodeConfig.defaultData.text ||
            "Enter text here",
          type: nodeType,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  /**
   * Update node data (called from settings panel)
   */
  const onUpdateNode = useCallback(
    (nodeId: string, data: Partial<any>) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            };
          }
          return node;
        })
      );

      // Update selected node state if it's the one being updated
      if (selectedNode && selectedNode.id === nodeId) {
        setSelectedNode((prev) =>
          prev
            ? {
                ...prev,
                data: {
                  ...prev.data,
                  ...data,
                },
              }
            : null
        );
      }
    },
    [setNodes, selectedNode]
  );

  /**
   * Handle save flow with validation
   */
  const onSave = useCallback(() => {
    const validation = validateFlow(
      nodes as CustomNode[],
      edges as CustomEdge[]
    );

    if (validation.isValid) {
      // In a real application, this would save to a backend
      console.log("Flow saved successfully!", { nodes, edges });
      setValidationMessage("Flow saved successfully!");
      setMessageType("success");

      // You could add actual save logic here, such as:
      // await saveFlowToBackend({ nodes, edges });
    } else {
      setValidationMessage(validation.errors.join(" "));
      setMessageType("error");
    }

    // Clear message after 5 seconds
    setTimeout(() => {
      setValidationMessage("");
      setMessageType("");
    }, 5000);
  }, [nodes, edges]);

  /**
   * Handle back button from settings panel
   */
  const onBack = useCallback(() => {
    setSelectedNode(null);
    setPanelType("nodes");
  }, []);

  return (
    <div className="app">
      <ReactFlowProvider>
        <div className="flow-builder">
          {/* Header with title and save button */}
          <header className="flow-header">
            <h1 className="flow-title">Chatbot Flow Builder</h1>
            <button
              className="save-button"
              onClick={onSave}
              disabled={nodes.length === 0}
            >
              Save Changes
            </button>
          </header>

          {/* Validation/Success Messages */}
          {validationMessage && (
            <div className={`${messageType}-message`}>{validationMessage}</div>
          )}

          {/* Main flow canvas */}
          <div className="flow-container" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              connectionMode={ConnectionMode.Loose}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>

        {/* Side panel - switches between nodes and settings */}
        <aside className="side-panel">
          {panelType === "nodes" ? (
            <NodesPanel onDragStart={onDragStart} />
          ) : selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              onUpdateNode={onUpdateNode}
              onBack={onBack}
            />
          ) : null}
        </aside>
      </ReactFlowProvider>
    </div>
  );
};

export default App;
