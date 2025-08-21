/**
 * Type definitions for the Chatbot Flow Builder
 * These types ensure type safety and make the codebase extensible
 */

// Base node types - extensible for future node types
export type NodeType = 'textMessage';

// Node data interface - can be extended for different node types
export interface NodeData {
  label: string;
  text?: string;
  type: NodeType;
}

// Custom node interface extending React Flow's Node
export interface CustomNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: NodeData;
}

// Edge interface for connections between nodes
export interface CustomEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

// Flow validation result
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Node configuration for the nodes panel - extensible for new node types
export interface NodeConfig {
  type: NodeType;
  label: string;
  description: string;
  icon: string;
  defaultData: Partial<NodeData>;
}

// Panel types for the side panel
export type PanelType = 'nodes' | 'settings';

// Application state interface
export interface AppState {
  nodes: CustomNode[];
  edges: CustomEdge[];
  selectedNode: CustomNode | null;
  panelType: PanelType;
}

// Event handlers interface
export interface FlowHandlers {
  onNodesChange: (changes: any[]) => void;
  onEdgesChange: (changes: any[]) => void;
  onConnect: (connection: any) => void;
  onNodeClick: (event: React.MouseEvent, node: CustomNode) => void;
  onPaneClick: () => void;
}

// Settings panel props
export interface SettingsPanelProps {
  selectedNode: CustomNode;
  onUpdateNode: (nodeId: string, data: Partial<NodeData>) => void;
  onBack: () => void;
}

// Nodes panel props
export interface NodesPanelProps {
  onDragStart: (event: React.DragEvent, nodeType: NodeType) => void;
}

// Text node props
export interface TextNodeProps {
  data: NodeData;
  selected: boolean;
}
