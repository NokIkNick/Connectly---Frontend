// FILE: Connectly/cypress/component/Modal.cy.jsx
import React from 'react';
import Modal from '../../src/components/Modal';
import Mainpage from '../../src/page/mainpage';
import { mount } from 'cypress/react18';

describe('Modal Component', () => {
    let onClose;

    beforeEach(() => {
        onClose = cy.stub();
        mount(<Modal show={true} onClose={onClose}><div>Modal Content</div></Modal>);
    });

    it.only('should not be visible when show is false', () => {
        mount(<Modal show={false} onClose={() => {}} />);
        cy.get('div').should('not.exist');
    });
/*
    it('should be visible when show is true', () => {
        mount(<Modal show={true} onClose={() => {}}><div>Modal Content</div></Modal>);
        cy.get('div').contains('Modal Content').should('be.visible');
    });

    it('should close when the close button is clicked', () => {
        cy.get('button').click();
        cy.wrap(onClose).should('be.called');
    });

    it('should close when the background is clicked', () => {
        cy.get('div').first().click();
        cy.wrap(onClose).should('be.called');
    });

    it('should not close when the modal content is clicked', () => {
        cy.get('div').contains('Modal Content').click();
        cy.wrap(onClose).should('not.be.called');
    }); */
});