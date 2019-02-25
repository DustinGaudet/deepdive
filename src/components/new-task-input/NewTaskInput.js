import React, { Component } from 'react';
import './NewTaskInput.scss';

class NewTaskInput extends Component {
  state = {
    inputText: ''
  }

  componentDidUpdate(prevProps) {
    if (this.props.parentId !== prevProps.parentId) {
      this.setState({inputText: ''})
    }
  }

  onChange = (e) => {
    this.setState({inputText: e.target.value})
  }

  resetState = (e) => {
    this.setState({inputText: ''})
  }

  render() { 
    const {props} = this;

    return (
      <input className="task-add" 
            placeholder="+ Add a task..." 
            onKeyPress={(e) => props.handleEnterPress(e, e.target.value, props.parentId, this.resetState)}
            onChange={this.onChange}
            value={this.state.inputText} />
    )
  }
}

export default NewTaskInput;
