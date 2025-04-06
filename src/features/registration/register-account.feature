@Demo @Register
Feature: Reddit Account Registration

  Scenario: Register a new Reddit account with random credentials
    Given I open the Reddit signup page
    When I enter a random email address
    And I click skip on email verification
    And I click the suggest username button
    And I enter a random password
    And I click continue to create the account
    And I select gender as man
    And I select "Ask Reddit" as an interest
    And I select "NBA" as an interest
    And I click continue on the interests page
    Then the account should be registered successfully
