/**
 * SettingsPanel Component
 * Displays settings for the currently selected node.
 * Allows editing of node properties like text content.
 */

import React, { useState, useEffect } from 'react';
import { SettingsPanelProps } from '../types';
import { getNodeConfig } from '../config/nodeTypes';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  selectedNode, 
  onUpdateNode, 
  onBack 
}) => {
  const [nodeText, setNodeText] = useState(selectedNode.data.text || '');
  const [nodeLabel, setNodeLabel] = useState(selectedNode.data.label || '');
  
  // Update local state when selected node changes
  useEffect(() => {
    setNodeText(selectedNode.data.text || '');
    setNodeLabel(selectedNode.data.label || '');
  }, [selectedNode]);

  // Handle text change with automatic save
  const handleTextChange = (newText: string) => {
    setNodeText(newText);
    onUpdateNode(selectedNode.id, { text: newText });
  };

  // Handle label change with automatic save
  const handleLabelChange = (newLabel: string) => {
    setNodeLabel(newLabel);
    onUpdateNode(selectedNode.id, { label: newLabel });
  };

  const nodeConfig = getNodeConfig(selectedNode.data.type);

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <div className="settings-header">
          <button 
            className="back-button"
            onClick={onBack}
            title="Back to nodes panel"
          >
            ←
          </button>
          <span>Message Settings</span>
        </div>
      </div>
      
      <div className="panel-content">
        {/* Node Type Info */}
        <div className="node-type-info">
          <div className="node-type-icon">{nodeConfig.icon}</div>
          <div>
            <h3>{nodeConfig.label} Node</h3>
            <p>{nodeConfig.description}</p>
          </div>
        </div>

        {/* Node Label Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="node-label">
            Node Label
          </label>
          <input
            id="node-label"
            type="text"
            className="form-input"
            value={nodeLabel}
            onChange={(e) => handleLabelChange(e.target.value)}
            placeholder="Enter node label"
          />
          <p className="field-description">
            This label appears in the node header
          </p>
        </div>

        {/* Message Text Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="message-text">
            Message Text
          </label>
          <textarea
            id="message-text"
            className="form-input form-textarea"
            value={nodeText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your message text here..."
            rows={4}
          />
          <p className="field-description">
            This text will be sent as the chatbot message
          </p>
        </div>

        {/* Node Info */}
        <div className="node-info-section">
          <h4>Node Information</h4>
          <div className="info-item">
            <span className="info-label">Node ID:</span>
            <span className="info-value">{selectedNode.id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Type:</span>
            <span className="info-value">{selectedNode.data.type}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Position:</span>
            <span className="info-value">
              ({Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)})
            </span>
          </div>
        </div>

        {/* Tips */}
        <div className="tips-section">
          <h4>💡 Tips</h4>
          <ul>
            <li>Connect nodes using the green output handle at the bottom</li>
            <li>Each node can only have one outgoing connection</li>
            <li>Nodes can receive multiple incoming connections</li>
            <li>Changes are saved automatically as you type</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
