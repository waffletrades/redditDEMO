@Demo @Login
Feature: Select Top Post When Logged In

  Scenario: Select the top post on the home page using stored credentials
    Given I navigate to the Reddit login page
    When I log in with the saved credentials
    And I click on the top post
    Then the top post should be visible and selected