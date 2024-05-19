"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Node,
  Connection,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { initialEdges, initialNodes } from './reactFlow';
import FlowmessageProvider from './flowmessageProvider';
import FlowmessageProviderSelector from './flowmessageProviderSelector';
import CustomEdge from './customized';
import './styles/flowpage.css'
import Flowsidebar from './flow-sidebar';
const nodeTypes = {
  flowmessageProvider:FlowmessageProvider,
  flowmessageProviderSelect:FlowmessageProviderSelector
}
const edegTypes = {
  customEdge:CustomEdge
}
const ReactFlowPage = () => {
  const [nodes,setNodes,onNodesChange] = useNodesState(initialNodes)
  const [edges,setEdges,onEdgesChange]  = useEdgesState(initialEdges);
  //memoizig
  const newedgeTypes = useMemo(()=>edegTypes ,[])
  const newnodeTypes = useMemo(()=>nodeTypes,[])
  interface NodeData {
    name: string;
    code: string;
  }

  interface Node {
    id: string;
    data: NodeData;
    position: { x: number; y: number };
    type: string;
  }

  const [newNode, setNewNode] = useState<Node | null>(null);
  const onConnect = useCallback((connection:Connection)=>{
    const edge = {...connection,animated:true,id:`${edges.length}+1`,type:"customEdge"};
    setEdges((prevedge)=>addEdge(edge,prevedge));
  },[edges.length,setEdges])

//i will pass this function as a prop
  const funcChangeText = (text:string) => {
    setNodes((prevNodes) => {
      const newNodes = [...prevNodes];
      if (newNode) {
        const index = newNodes.findIndex((n) => n.id === newNode.id);
        if (index !== -1) {
          newNodes[index].data.name = text;
          newNodes[index].data.code = text;
          newNodes[index].position.x = Math.random() * 500;
        }
      }
      return newNodes;
    });
  };
const iclickonNode = (event:any,node:any)=>{
  if(node.type!=="flowmessageProviderSelect"){
    setNewNode(node);
  }
}
//saving the flow
const saveMyFlow = ()=>{
  if(nodes.length>1){
  console.log(nodes);
  localStorage.setItem("nodes",JSON.stringify(nodes));
  window.alert("Nodes saved!")
  }else{
    window.alert("Empty Nodes!")
    return;
  }
}

//set the nodes value from  local Storage if exits
useEffect(() => {
  const savedNodes = localStorage.getItem("nodes");
  if (savedNodes) {
    setNodes(JSON.parse(savedNodes));
  }
}, [setNodes]);
  return (
    <>
    <section className='button-div'>
    <button onClick={saveMyFlow}>Save flow</button>
    </section>
    <div className='flow-two-side'>
    <div className='react-flow'>
      <ReactFlow nodes={nodes} onNodeClick={iclickonNode} onConnect={onConnect} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView nodeTypes={newnodeTypes} edgeTypes={newedgeTypes}>
      <Background />
      <Controls />
      {/* <MiniMap /> */}
      </ReactFlow>
        </div>
      <Flowsidebar funcChangeText={funcChangeText} newNode={newNode} />
        </div>
    </>
  )
}

export default ReactFlowPage