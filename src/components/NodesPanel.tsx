/**
 * NodesPanel Component
 * Displays available node types that can be dragged onto the flow canvas.
 * Designed to be extensible - new node types can be easily added.
 */

import React from 'react';
import { NodesPanelProps } from '../types';
import { NODE_TYPES_CONFIG, AVAILABLE_NODE_TYPES } from '../config/nodeTypes';

const NodesPanel: React.FC<NodesPanelProps> = ({ onDragStart }) => {
  return (
    <div className="nodes-panel">
      <div className="panel-header">
        Drag and Drop Nodes
      </div>
      
      <div className="panel-content">
        <div className="nodes-grid">
          {AVAILABLE_NODE_TYPES.map((nodeType) => {
            const config = NODE_TYPES_CONFIG[nodeType];
            
            return (
              <div
                key={nodeType}
                className="node-item"
                draggable
                onDragStart={(event) => onDragStart(event, nodeType)}
              >
                <div className="node-icon">
                  {config.icon}
                </div>
                <div className="node-info">
                  <h3>{config.label}</h3>
                  <p>{config.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Instructions for users */}
        <div className="panel-instructions">
          <p className="instruction-text">
            Drag a node from above to the canvas to start building your chatbot flow.
          </p>
          
          <div className="handle-legend">
            <h4>Connection Points:</h4>
            <div className="legend-item">
              <div className="legend-handle target"></div>
              <span>Input (can receive multiple connections)</span>
            </div>
            <div className="legend-item">
              <div className="legend-handle source"></div>
              <span>Output (can connect to one target)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;
