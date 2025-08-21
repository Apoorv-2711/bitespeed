/**
 * Validation utilities for the chatbot flow builder
 * Handles validation logic for saving flows and ensuring data integrity
 */

import { CustomNode, CustomEdge, ValidationResult } from '../types';

/**
 * Validates the current flow before saving
 * According to requirements: Save button should show error if there are more than one node
 * and more than one node has empty target handles (no incoming connections)
 */
export const validateFlow = (nodes: CustomNode[], edges: CustomEdge[]): ValidationResult => {
  const errors: string[] = [];
  
  // If there's only one node or no nodes, flow is valid
  if (nodes.length <= 1) {
    return { isValid: true, errors: [] };
  }
  
  // Find nodes that have no incoming connections (empty target handles)
  const nodesWithoutIncomingConnections = nodes.filter(node => {
    return !edges.some(edge => edge.target === node.id);
  });
  
  // If more than one node has no incoming connections, it's invalid
  if (nodesWithoutIncomingConnections.length > 1) {
    errors.push(
      `Flow validation failed: ${nodesWithoutIncomingConnections.length} nodes have empty target handles. ` +
      `Only one node can be the starting point of the flow.`
    );
  }
  
  // Additional validation: Check for empty message text
  const nodesWithEmptyText = nodes.filter(node => 
    !node.data.text || node.data.text.trim() === ''
  );
  
  if (nodesWithEmptyText.length > 0) {
    errors.push(
      `${nodesWithEmptyText.length} node(s) have empty message text. ` +
      `Please add text to all message nodes before saving.`
    );
  }
  
  // Additional validation: Check for isolated nodes (no connections at all)
  const isolatedNodes = nodes.filter(node => {
    const hasIncoming = edges.some(edge => edge.target === node.id);
    const hasOutgoing = edges.some(edge => edge.source === node.id);
    return !hasIncoming && !hasOutgoing;
  });
  
  if (isolatedNodes.length > 1) {
    errors.push(
      `${isolatedNodes.length} nodes are completely isolated (no connections). ` +
      `Please connect them to the flow or remove them.`
    );
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Checks if a node can be connected to another node
 * Ensures that source handles only have one outgoing connection
 */
export const canConnect = (
  sourceNodeId: string,
  sourceHandle: string | undefined,
  targetNodeId: string,
  targetHandle: string | undefined,
  edges: CustomEdge[]
): boolean => {
  // Prevent self-connections
  if (sourceNodeId === targetNodeId) {
    return false;
  }
  
  // Check if source handle already has an outgoing connection
  const existingConnection = edges.find(edge => 
    edge.source === sourceNodeId && edge.sourceHandle === sourceHandle
  );
  
  // Source handles can only have one outgoing connection
  if (existingConnection) {
    return false;
  }
  
  // Check if this exact connection already exists
  const duplicateConnection = edges.find(edge =>
    edge.source === sourceNodeId &&
    edge.target === targetNodeId &&
    edge.sourceHandle === sourceHandle &&
    edge.targetHandle === targetHandle
  );
  
  if (duplicateConnection) {
    return false;
  }
  
  return true;
};

/**
 * Generates a unique ID for new nodes
 */
export const generateNodeId = (nodeType: string): string => {
  return `${nodeType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generates a unique ID for new edges
 */
export const generateEdgeId = (sourceId: string, targetId: string): string => {
  return `edge_${sourceId}_${targetId}_${Date.now()}`;
};

/**
 * Validates node data
 */
export const validateNodeData = (data: any): boolean => {
  return (
    data &&
    typeof data.label === 'string' &&
    typeof data.type === 'string' &&
    data.label.trim() !== ''
  );
};

/**
 * Checks if the flow has any cycles (circular dependencies)
 */
export const hasFlowCycles = (nodes: CustomNode[], edges: CustomEdge[]): boolean => {
  const nodeIds = nodes.map(node => node.id);
  const adjacencyList: { [key: string]: string[] } = {};
  
  // Build adjacency list
  nodeIds.forEach(id => {
    adjacencyList[id] = [];
  });
  
  edges.forEach(edge => {
    if (adjacencyList[edge.source]) {
      adjacencyList[edge.source].push(edge.target);
    }
  });
  
  // DFS to detect cycles
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  
  const hasCycle = (nodeId: string): boolean => {
    visited.add(nodeId);
    recursionStack.add(nodeId);
    
    for (const neighbor of adjacencyList[nodeId] || []) {
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }
    
    recursionStack.delete(nodeId);
    return false;
  };
  
  for (const nodeId of nodeIds) {
    if (!visited.has(nodeId)) {
      if (hasCycle(nodeId)) {
        return true;
      }
    }
  }
  
  return false;
};
