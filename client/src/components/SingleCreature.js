import React, { Component } from 'react';
import axios from "axios"

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


  render() {
    return (
      <div>
       
        <h1>{this.state.creature.name}</h1>
        <h3>{this.state.creature.description}</h3>

        <button onClick={this.toggleEditForm}>Edit Creature</button>
       
      </div>
    );
  }
}

export default SingleCreature;