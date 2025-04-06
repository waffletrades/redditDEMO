module.exports = {
  default: {
    require: [
      "src/support/hook.ts", // Loads the hooks file (Before & After test setup)
      "src/step-definitions/**/*.ts" // Loads all step definition files from the step-definitions folder
    ],
    format: [
      "progress-bar", // Displays a progress bar in the terminal during test execution
      "html:test-results/cucumber-report.html", // Generates an HTML report of test results
      "json:test-results/cucumber-report.json" // Generates a JSON report of test results
    ],
    paths: ["src/features/**/*.feature"], // Specifies the location of feature files
    requireModule: ["ts-node/register"], // Enables TypeScript support for running Cucumber tests
    parallel: 4, // Runs tests in parallel using 4 workers to improve execution speed
    // retry: 2 // Retries failed test 2 times 
    timeout: 30000 // set default step timeout to 30 seconds
  }
}
