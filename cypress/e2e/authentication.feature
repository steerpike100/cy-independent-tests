Feature: Login happy paths


#Need to be logged out and directed to specific article
# Scenario: Logging in from article link returns user to article
# Given A published article link directs me to a the login page
# When I log in succesfully
# Then I am authenticated and redirected to the correct article

# Scenario: Logout from the website
# Given I navigate to the home page and confirm privacy consent
# And I log in succesfully
# When I log out
# Then The logout is successful

# Scenario: Login with incorrect credentials
# Given I navigate to the home page and confirm privacy consent
# When I log input an email of <invalid_email> and a password of <invalid_password>
# Then I am not authenticated


  Scenario Outline: Validate user registration with invalid data
    Given I navigate to the home page and confirm privacy consent
    When I choose to register as a new customer
    # When the user fills in the registration form with an 'invalid_email'
    # And the user submits the registration form
    # Then the user should see an error message indicating the invalid input

    # Examples:
    #   | invalid_email       |    invalid_password     |
    #   | invalid@example |   Qwerty12345              |
    #   |    invalid@example                |                            |
    #   | notanemail          |                           |
    #   | user@domain.com     |                               |
    #   | valid.email@test.com|                           |