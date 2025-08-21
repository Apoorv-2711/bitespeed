/**
 * Node Type Configuration
 * This file defines all available node types and their configurations.
 * New node types can be easily added here to extend the flow builder.
 */

import { NodeConfig, NodeType } from '../types';

// Available node types configuration
// This makes the system extensible - new node types can be added here
export const NODE_TYPES_CONFIG: Record<NodeType, NodeConfig> = {
  textMessage: {
    type: 'textMessage',
    label: 'Message',
    description: 'Send a text message',
    icon: '💬',
    defaultData: {
      label: 'Send Message',
      text: 'Type your message here...',
      type: 'textMessage'
    }
  }
  // Future node types can be added here:
  // imageMessage: {
  //   type: 'imageMessage',
  //   label: 'Image',
  //   description: 'Send an image message',
  //   icon: '🖼️',
  //   defaultData: {
  //     label: 'Send Image',
  //     imageUrl: '',
  //     type: 'imageMessage'
  //   }
  // },
  // conditionalNode: {
  //   type: 'conditionalNode',
  //   label: 'Condition',
  //   description: 'Add conditional logic',
  //   icon: '🔀',
  //   defaultData: {
  //     label: 'Condition',
  //     condition: '',
  //     type: 'conditionalNode'
  //   }
  // }
};

// Export available node types for easy access
export const AVAILABLE_NODE_TYPES = Object.keys(NODE_TYPES_CONFIG) as NodeType[];

// Helper function to get node configuration
export const getNodeConfig = (nodeType: NodeType): NodeConfig => {
  return NODE_TYPES_CONFIG[nodeType];
};

// Helper function to create default node data
export const createDefaultNodeData = (nodeType: NodeType) => {
  const config = getNodeConfig(nodeType);
  return {
    ...config.defaultData,
    id: `${nodeType}_${Date.now()}`
  };
};
