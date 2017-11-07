import React from 'react';

const EditCreature = (props) => {

    
    
    return (
        <div>
            <input onBlur={props.updateCreature} onChange={props.handleChange} name="name" defaultValue={props.name}/>
            <textarea onBlur={props.updateCreature} onChange={props.handleChange}name="description" defaultValue={props.description}/>
        </div>
    );
};

export default EditCreature;