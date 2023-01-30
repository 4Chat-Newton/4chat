import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";

Given ('I am on the login page', () => {
    //Write code to check if I am on the login page
    cy.visit('/#login');
    cy.url().should('contain','/#login')
    cy.get('button').should('contain', 'Login')
});

Given('a user has entered their email/username and password', () => {
    // Write code to enter email/username and password
    
  });
  
  When('the user submits the login information', () => {
    // Write code to submit the login information
  });
  
  Then('the system checks the database to ensure that the email/username and password match a record', () => {
    // Write code to check the database for a matching record
  });
  
  Then('displays a success message if the record is found', () => {
    // Write code to display a success message
  });
  
  Then('displays an error message indicating that the email/username and password do not match', () => {
    // Write code to display an error message
  });