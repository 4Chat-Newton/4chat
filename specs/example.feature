Scenario: Verify correct email/username and password match database record
Given a user has entered their email/username and password
When the user submits the login information
Then the system checks the database to ensure that the email/username and password match a record
And displays a success message if the record is found
Otherwise displays an error message indicating that the email/username and password do not match
