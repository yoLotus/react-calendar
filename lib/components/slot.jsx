import $ from 'jquery'
import React, { Component } from 'react'

class Slot extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    $(this.component).on('mousedown', _ => this.props.onClickDown())
    $(this.component).on('mouseup', _ => this.props.onClickUp())
    $(this.component).on('mouseenter', _ => this.props.onMouseEnter())
    // $(this.component).on('mouseleave', _ => this.props.onMouseLeave())
  }

  componentWillUnmount = () => {
    // avoid memory leak
    $(this.component).off('mousedown')
    $(this.component).off('mouseup')
    $(this.component).off('mouseenter')
    // $(this.component).off('mouseleave')
  }

  render = () => {
    let { index, selected, name } = { ...this.props }
    return (
      <div
        ref={component => (this.component = component)}
        className={`slot ${selected ? 'selected' : ''}`}
      >
        {name}
      </div>
    )
  }
}

export default Slot
