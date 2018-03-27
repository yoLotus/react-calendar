import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Calendar from '../lib/components/calendar.jsx'

// import { Button, Welcome } from '@storybook/react/demo'

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

import './theme.scss'
let slots = []
let days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']

for (let hour = 9; hour < 20; hour++) {
  days.forEach(day => {
    slots.push({ name: `${day} : ${hour}h - ${hour}h30` })
  })
  days.forEach(day => {
    slots.push({ name: `${day} : ${hour}h30 - ${hour + 1}h` })
  })
}

const fetchSlots = () => new Promise((resolve, reject) => resolve(slots))

storiesOf('Calendar', module).add('display', () => (
  <Calendar fetchSlots={fetchSlots} />
))
