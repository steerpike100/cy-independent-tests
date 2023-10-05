Feature: Registration happy and unhappy paths


Scenario: Successful registration
    Given I navigate to the home page and confirm privacy consent
    When I choose to register as a new customer
    And I fill in and submit the registration form with valid details
    Then I should see a Thank you for registering message


#  Scenario Outline: Invalid data used for registration process
#     Given I navigate to the home page and confirm privacy consent
#     When I choose to register as a new customer
#     When the user fills in the registration form with an <invalid_email> email
#     # And the user submits the registration form
#     # Then the user should see an error message indicating the invalid input

#     Examples:
#       | invalid_email       |    invalid_password     |
#       | invalid@example     |   Qwerty12345              |
#     #   |    invalid@example                |                            |
#     #   | notanemail          |                           |
#     #   | user@domain.com     |                               |
#     #   | valid.email@test.com|                           |