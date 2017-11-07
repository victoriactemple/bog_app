import React, { Component } from 'react';
import axios from 'axios'

class NewCreatureForm extends Component {
    state=
        {
        name: '',
        description: ''
    }

handleChange = (event) => {
    const name = event.target.name
    const newState = {...this.state}
    newState[name] = event.target.value
    this.setState(newState)
}

handleSubmit = async (event) => {
    event.preventDefault()
    const payload = {
        name: this.state.name,
        description: this.state.description
    }
    const emptyForm = {
        name: '',
        description: ''
    }
    await axios.post('/api/creatures', payload)
    await this.props.getAllCreatures()
    this.props.toggleShowNewForm()
}




    render() {
        return (
            <div>
                <h2>Add Creature</h2>
                <form onSubmit={this.handleSubmit}>
                <div>
                     <input onChange={this.handleChange} name= "name" type="text" placeholder="name" value={this.state.name}/>
                </div>
                <div>
                     <input onChange={this.handleChange} name= "description" type="text" placeholder="description" value={this.state.description}/>
                </div>
                
                <div>
                    <input name= "submit" type="submit"/>
                </div>
                </form>
            </div>
        );
    }
}

export default NewCreatureForm;