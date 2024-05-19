import React from 'react'
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow'
import { MdDelete } from "react-icons/md";
import './styles/flowmessageProvide.css'
const FlowmessageProvider = ({data:{name},id}:NodeProps<{name:String,code:String,id:number}>) => {
    const {setNodes}  = useReactFlow();
  return (
    <>
        <section className='pay-providers'>
            <span>{name} &nbsp;</span>
            <MdDelete size={'2rem'} color='red' onClick={()=>setNodes((prev)=>prev.filter((node)=>node.id!==id))}></MdDelete>
            </section>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
    </>
  )
}

export default FlowmessageProvider