import React from 'react';
import { mount } from '@cypress/react';
import NotifikationsPopUp from '../../src/components/notifikations-pop-up';
import { fetchNotifications } from '../../src/services/apiFacade';

// Mock the fetchNotifications function
jest.mock('../../src/services/apiFacade');

const mockNotifications = [
  { id: 1, message: 'user id 1 besked 1' },
  { id: 2, message: 'user id 1 besked 2' },
];

fetchNotifications.mockResolvedValue(mockNotifications);

describe('NotifikationsPopUp Component', () => {
  it('renders notifications and handles accept/reject actions', () => {
    mount(<NotifikationsPopUp />);

    // Check if notifications are rendered
    cy.contains('user id 1 besked 1').should('be.visible');
    cy.contains('user id 1 besked 2').should('be.visible');

    // Check if accept and reject buttons are rendered
    cy.get('button').contains('Accept').should('have.length', 2);
    cy.get('button').contains('Reject').should('have.length', 2);

    // Simulate accept button click
    cy.get('button').contains('Accept').first().click();
    cy.window().its('console').invoke('log', 'Accepted notification with id: 1');

    // Simulate reject button click
    cy.get('button').contains('Reject').first().click();
    cy.window().its('console').invoke('log', 'Rejected notification with id: 1');

    // Simulate close button click
    cy.get('button').contains('X').click();
    cy.contains('user id 1 besked 1').should('not.exist');
    cy.contains('user id 1 besked 2').should('not.exist');
  });
});