@Demo @JoinCommunity
Feature: Join a New Reddit Community

  Scenario: Join r/EyeBleach subreddit as a logged-in user
    Given I navigate to the Reddit login page
    When I log in with the saved credentials
    And I go to the "EyeBleach" subreddit
    And I click the Join button 
    And I log in again if login modal appears  
    And I click the Join button again to unjoin
