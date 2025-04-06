# Reddit UI Automation – Playwright & TypeScript

This repository contains three UI tests for Reddit, focusing on:
- **Registering a New Account**
- **Selecting the Top Post on the Home Page (When Logged In)**
- **Joining a New Subreddit Community**

## Installation & Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/yourusername/reddit-automation.git
   cd reddit-automation

2. **Install Dependencies** 

bash
npm install

3. **tmpCredentials.json**
 Create a file named tmpCredentials.json in the root directory (if not visible), the username and password will be auto-generated from running the @Register tag / test script

4. **Running the Tests**
To run the three UI test for Reddit, please navigate to the package.json.
You can right click and run each of these test indivually but I recommend just running the bdd:demo to run all the 3 test at once in the proper order:

    "bdd:register": "npx cucumber-js --tags \"@Register\"",
    "bdd:login": "npx cucumber-js --tags \"@Login\"",
    "bdd:joinCommunity": "npx cucumber-js --tags \"@JoinCommunity\"",
    "bdd:demo": "npm run bdd:register && npm run bdd:login && npm run bdd:joinCommunity"


## Approach Notes
Test Organization:
Each test scenario (registration, selecting top post, joining subreddit) is kept separate for clarity and modularity.

Page Object Model:
If implemented, page-specific locators and actions are centralized in dedicated classes for easier maintenance.

## Additional Notes
Scalability:
The approach is designed to be extended by adding more tests or integrating into a CI pipeline.