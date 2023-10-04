Feature: Login happy paths

Scenario: Logging in from article link returns user to article
Given A published article link directs me to a the login page
When I log in succesfully
Then I am authenticated and redirected to the correct article

