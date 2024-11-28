import React from 'react'
import Mainpage from './mainpage'

describe('<Mainpage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Mainpage />)
  })
})