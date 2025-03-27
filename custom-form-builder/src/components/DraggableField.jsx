import React from 'react';
import { useDrag } from "react-dnd";

const DraggableField = ({id, type, label}) => {
    const [{isDragging}, drag] = useDrag(()=> ({
        type: 'field',
        item: {id, type, label},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag}>{label}</div>
    );
};

export default DraggableField;