Feature: Registration happy and unhappy paths

 @registration
 Scenario: Successful registration
   Given I navigate to the home page and confirm privacy consent
   When I choose to register as a new customer
   And I fill in and submit the registration form with valid details
   Then I should see a Thank you for registering message

@registration
Scenario Outline: Invalid data used for registration process
  Given I navigate to the home page and confirm privacy consent
  When I choose to register as a new customer
  When the user enters <email> as their email
  And the user enters <first_name> as their first name
  And the user enters <last_name> as their last name
  And the user enters <password> as their password
  And the user submits the registration form
  Then the user should see an <error_message> error message for the <field> field

Examples:
  | email                  | first_name      | last_name       | password          | error_message                                                                         | field        |
  | invalid_email          | John            | Doe             | Qwerty12345       | Please enter a valid email address                                                    | Email        |
  | abc98214_999@gmail.com | John$           | Doe             | Qwerty12345       | Special characters aren’t allowed                                                     | First name   |
  | abc98214_999@gmail.com | John            | Doe$            | Qwerty12345       | Special characters aren’t allowed                                                     | Last name    |
  | abc98214_999@gmail.com | John            | Doe             | lowercasepassword | Must be at least 6 characters, include an upper and lower case character and a number | Password     |
  | abc98214_999@gmail.com | ValidFirstName  | ValidLastName   | UPPERCASEPASSWORD | Must be at least 6 characters, include an upper and lower case character and a number | Password     |
  | abc98214_999@gmail.com | FirstName123    | LastName123     | 123456789         | Must be at least 6 characters, include an upper and lower case character and a number | Password     |
  | abc98214_999@gmail.com | Short           | Password        | AB124             | Must be at least 6 characters, include an upper and lower case character and a number | Password     |


