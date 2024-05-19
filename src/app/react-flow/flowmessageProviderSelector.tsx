import React, { useState } from 'react';
import { useReactFlow } from 'reactflow';
import { IoIosAddCircle } from "react-icons/io";
import './styles/flowmessageProvide.css'
const FlowmessageProviderSelector = () => {
    const { setNodes } = useReactFlow();
    const [mess,setMess] = useState<string>("");

    const onProviderChange = () => {
            const location = Math.random() * 500;
            setNodes(prevNodes => [...prevNodes, {
                id: `${prevNodes.length + 1}`,
                data: { name: mess, code: mess },
                type: "flowmessageProvider",
                position: { x: location, y: location }
            }]);
        }

    return (
        <section>
           <input type='text' onChange={(e) => setMess(e.target.value)} />
           <IoIosAddCircle onClick={onProviderChange} color='green' size={'2rem'}></IoIosAddCircle>
         </section>
    );
};

export default FlowmessageProviderSelector;
