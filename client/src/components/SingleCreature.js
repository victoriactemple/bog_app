import React, { Component } from 'react';
import axios from "axios"
import EditCreature from './EditCreature'

class SingleCreature extends Component {
    state = {
        creature: {
            name: "",
            description: ""
        }, 
        showEditForm: false
    }

    componentWillMount () {
        this.getCreature()
    }

    getCreature = async () => {
        const creatureId = this.props.match.params.id
        const response = await axios.get(`/api/creatures/${creatureId}`)
        this.setState({creature: response.data})
    }

    toggleEditForm = () => {
        this.setState({showEditForm: !this.state.showEditForm})
    }

    updateCreature = async () => {

    }

    // handleChange = (event, creatureId) => {
    //     const attribute = event.target.name
    //     const updatedState = {...this.state}
    //     updatedState[attribute] = event.target.value
    //     this.setState(updatedState)
    // }

    handleChange = (event, creatureId) => {
        const attribute = event.target.name
        const clonedCreature = {...this.state.creature}
        clonedCreature[attribute] = event.target.value
        this.setState({creature: clonedCreature })
    }

    updateCreature = async (event) => {
        const creatureId = this.props.match.params.id
        const clonedCreature = {...this.state.creature}
        const response = await axios.patch(`/api/creatures/${creatureId}`, {
            creature: clonedCreature })
            this.setState({creature: response.data})
            // this.props.toggleEditForm()

    }



  render() {
    return (
      <div>
       
        <h1>{this.state.creature.name}</h1>
        <h3>{this.state.creature.description}</h3>

        <button onClick={this.toggleEditForm}>Edit Creature</button>

        {this.state.showEditForm ? <EditCreature 
        name={this.state.creature.name}
        description={this.state.creature.description}
        getCreature={this.getCreature} 
        toggleEditForm={this.toggleEditForm} 
        updateCreature={this.updateCreature} 
        handleChange={this.handleChange}
        updateCreature={this.updateCreature}
        /> : null}
       
      </div>
    );
  }
}

export default SingleCreature;


// {this.state.showNewForm ? <NewCreatureForm getAllCreatures={this.getAllCreatures}  toggleShowNewForm={this.toggleShowNewForm}/> : null}
