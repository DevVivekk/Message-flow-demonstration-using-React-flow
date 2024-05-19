import React, { useEffect, useState } from 'react';
import './styles/flowsidebar.css';

interface FlowsidebarProps {
  newNode: {
    id: string;
    data: {
      name: string;
      code: string;
    };
    type: string;
  } | null;
  funcChangeText: (text: string) => void; // Corrected type definition
}

const Flowsidebar: React.FC<FlowsidebarProps> = ({ newNode,funcChangeText }) => {
  const [text, setText] = useState<string>('');
  useEffect(() => {
    if (newNode) {
      setText(newNode.data.name);
    }
  }, [newNode, newNode?.data.name]);

  if (!newNode) return null;

  //const { id, data } = newNode;

  const callfuncChangeText = () => {
    funcChangeText(text)
  };
  return (
    <div className="sidebar">
      <input
        className="side-input"
        type="text"
        placeholder="Input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={callfuncChangeText}>Update</button>
    </div>
  );
};

export default Flowsidebar;
