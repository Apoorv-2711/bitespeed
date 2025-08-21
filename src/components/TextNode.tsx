/**
 * TextNode Component
 * Custom React Flow node for text messages in the chatbot flow.
 * Implements the required handles and styling for the flow builder.
 */

import React from "react";
import { Handle, Position } from "reactflow";
import { TextNodeProps } from "../types";

const TextNode: React.FC<TextNodeProps> = ({ data, selected }) => {
  return (
    <div className={`text-node ${selected ? "selected" : ""}`}>
      {/* Target handle - can have multiple incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        className="react-flow__handle-top"
        isConnectable={true}
      />

      {/* Node content */}
      <div className="node-content">
        <div className="node-header">
          <div className="node-icon">💬</div>
          <div className="node-title">{data.label}</div>
        </div>

        <div className="node-body">
          <div className="message-text">
            {data.text || "Click to edit message"}
          </div>
        </div>
      </div>

      {/* Source handle - can only have one outgoing connection */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        className="react-flow__handle-bottom"
        isConnectable={true}
      />
    </div>
  );
};

export default TextNode;
