Feature: Login happy paths

Scenario: Logging in from article link returns user to article
Given A published article link directs me to a the login page
When I log in succesfully
Then I am authenticated and redirected to the correct article

Scenario: Logout from the website
Given I navigate to the home page and confirm privacy consent
And I log in succesfully
When I log out
Then The logout is successful



 