describe('Vists Admin', () => {
  it('Visits the Admin page', () => {
    cy.visit('/');
    cy.intercept('GET', '/api/users', { fixture: 'employees.json' }).as(
      'getEmployees'
    );
    cy.intercept('DELETE', '/api/users/*', {
      statusCode: 200,
      body: { message: 'User deleted' },
    }).as('deleteEmployee');
    cy.intercept('POST', '/api/users', (request) => {
      request.reply({
        statusCode: 200,
        body: { message: 'User created successfully' },
      });
    }).as('createEmployee');
    cy.intercept('PATCH', '/api/users/*', (request) => {
      request.reply({
        statusCode: 200,
        body: { message: 'User updated successfully' },
      });
    }).as('updateEmployee');
  });
});
