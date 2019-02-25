import React, { Component } from 'react'
import './TextArea.scss'

class TextArea extends Component {
	state = {
    rows: 5,
    minRows: 5,
    maxRows: 100,
    value: '',
  }
	
	handleChange = (e) => {
		const { rows, minRows, maxRows } = this.state
		
  	e.target.rows = minRows 
    
    // 17 is the textarea lineheight in px
    // ~~ converts float to int via double bitwise NOT
		const newRows = ~~(e.target.scrollHeight / 17)
    
    if (newRows === rows) {
    	e.target.rows = newRows
    }
		
		if (newRows >= maxRows) {
			e.target.rows = maxRows
			e.target.scrollTop = e.target.scrollHeight
		}
    
  	this.setState({
      rows: newRows < maxRows ? newRows : maxRows,
      value: e.target.value
    })
	}
	
	render() {
		return (
			<textarea
				rows={this.state.rows}
				value={this.state.value}
				placeholder={'Add notes...'}
				className={'textarea'}
				onChange={this.handleChange}
			/>
		)
	}
}

export default TextArea
