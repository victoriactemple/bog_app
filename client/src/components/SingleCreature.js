import React, { Component } from 'react';
import axios from "axios"
import EditCreature from './EditCreature'
import { Redirect, Link } from 'react-router-dom'

class SingleCreature extends Component {
    state = {
        creature: {
            name: "",
            description: ""
        }, 
        showEditForm: false,
        redirectToCreatures: false
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

    deleteCreature = async (event) => {
        try {
            const creatureId = this.props.match.params.id
              await axios.delete(`/api/creatures/${creatureId}`)
            this.setState({redirectToCreatures: true})
        } catch (error) {
            console.log(error)
        }
    }

// redirectToCreatures = async () => {
//     if (this.state.)

// }



  render() {
    if (this.state.redirectToCreatures === true) {
        return (
            <Redirect to={'/'} />
        )
    }
    return (
      <div>
       
        <h1>{this.state.creature.name}</h1>
        <h3>{this.state.creature.description}</h3>

        <button onClick={this.toggleEditForm}>Edit Creature</button>
        <button onClick={this.deleteCreature}>Delete Creature</button>
        <Link to="/"><button>Back to Creatures</button></Link>

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
