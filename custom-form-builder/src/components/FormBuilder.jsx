import React, { useEffect, useState } from "react";
import {useDrop} from 'react-dnd';
import DraggableField from "./DraggableField";

const FormBuilder = () => {
    const [formFields, setFormFields] = useState(() => {
        const savedForm = localStorage.getItem('formFields');
        return savedForm ? JSON.parse(savedForm) : [];
    });

    useEffect(() => {
        localStorage.setItem('formFields', JSON.stringify(formFields));
    }, [formFields]);

    const [{isOver}, drop] = useDrop(()=> ({
        accept:'field',
        drop: (item) => addFieldToForm(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));


    const addFieldToForm = (field) => {
        setFormFields((prev) => [...prev, field]);
    };

    const exportAsJSON = () => {
        const json = JSON.stringify(formFields, null, 2);
        console.log('Exported JSON:', json);
        alert('Form Exported');
    };

    const clearForm = () => {
        setFormFields([]);
        localStorage.removeItem('formFields');
    }

    return (

        <div>
            <div>
                <h3>Available Fields</h3>
                <DraggableField id="1" type="text" label="Text Field" />
                <DraggableField id="2" type="email" label="Email Field" />
                <DraggableField id="3" type="number" label="Number Field" />
            </div>

            <div ref={drop}>
                <h3>Form Preview</h3>
                {formFields.length === 0 ? (
                    <p>Drag Field Here</p>
                ) : (
                formFields.map((field, index) => (
                    <div key={index}>
                        <label>{field.label}</label>
                        <input 
                        type={field.type} 
                        placeholder={field.label}
                        />
                    </div>
                )))}
                <div>
                <button onClick={exportAsJSON}> Export As JSON</button>
                <button onClick={clearForm}> Clear Form</button>
                </div>

            </div>
        </div>
    )

}

export default FormBuilder;