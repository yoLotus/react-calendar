import React, { Component } from 'react'
import Slot from './slot.jsx'

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.width = 5
    this.startX = null
    this.startY = null
    this.maxX = null
    this.maxY = null
    this.x = null
    this.y = null

    this.state = {
      slots: []
    }
  }

  componentDidMount = () =>
    this.props.fetchSlots().then(slots => this.setState({ slots }))

  onClickDown = index => {
    this.x = this.startX = this.minX = this.maxX = index % this.width
    this.y = this.startY = this.minY = this.maxY = (index - this.x) / this.width
    let slots = this.state.slots.slice().map(s => ({
      ...s,
      initialSelectionState: s.selected
    }))
    this.currentAction = this.state.slots[index].selected
      ? 'deletion'
      : 'adding'

    this.setState({ recording: true, slots }, () => this.onMouseEnter(index))
  }

  onClickUp = _ => this.clean()

  onMouseEnter = index => {
    if (this.state.recording) {
      let slots = this.state.slots.slice()
      this.x = index % this.width
      this.y = (index - this.x) / this.width
      this.setBoundaries()

      // TODO: make this algo more readable
      slots.map((slot, item) => {
        let inside = this.inside(
          item % this.width,
          (item - item % this.width) / this.width
        )

        if (inside) {
          slot.selected = this.currentAction === 'adding'
        } else {
          slot.selected = slot.initialSelectionState
        }

        return slot
      })

      this.setState({ slots })
    }
  }

  onMouseLeave = index => {}

  setBoundaries = () => {
    if (this.x >= this.startX && this.y >= this.startY) {
      this.minX = this.startX
      this.minY = this.startY
      this.maxX = this.x
      this.maxY = this.y
    } else if (this.x >= this.startX && this.y <= this.startY) {
      this.minX = this.startX
      this.minY = this.y
      this.maxX = this.x
      this.maxY = this.startY
    } else if (this.x < this.startX && this.y <= this.startY) {
      this.minX = this.x
      this.minY = this.y
      this.maxX = this.startX
      this.maxY = this.startY
    } else {
      this.minX = this.x
      this.minY = this.startY
      this.maxX = this.startX
      this.maxY = this.y
    }
  }

  inside = (x, y) =>
    x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY

  clean = _ => {
    let slots = this.state.slots.slice()
    this.setState({ slots, recording: false })
  }

  render() {
    return (
      <div>
        <div>
          {this.state.slots.map((slot, index) => (
            <Slot
              key={slot.name}
              index={index}
              {...slot}
              onClickDown={() => this.onClickDown(index)}
              onClickUp={() => this.onClickUp()}
              onMouseEnter={() => this.onMouseEnter(index)}
              onMouseLeave={() => this.onMouseLeave(index)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Calendar
