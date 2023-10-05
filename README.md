# Cypress Framework with TypeScript

## Overview

This is a Cypress testing framework built with Node.js and TypeScript. It includes configurations for running end-to-end tests, generating HTML Cucumber reports, and enforcing linting rules using ESLint. This README provides an overview of the project structure and instructions for getting started.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure Node.js is installed on your system. You can install it via [Node.js official website](https://nodejs.org/).

## Getting Started

1. Clone this repository to your local machine:

  ```shell
  git clone https://github.com/your-username/cypress-framework.git
  ```

2. Navigate to the project root directory:

  ```shell
  cd cy-independent-tests
   ```

3. Install project dependencies:

  ```shell
  npm install
  ```

4. Switch to the recommended Node.js version:
  ```shell
  nvm use
   ```
This will read the .nvmrc file in the project directory and use the specified Node.js version.

## Environment Variables
The project uses the `dotenv` library for easy management of environment variables.  All secrets should be 
stored in the `.env` file in the project root.  This file is ignored by git and should never be committed to the repository. 
Alternatively, setup a run configuration in VSCode's launch.json file to pass environment variables to the Cypress runner.  Secrets
should be received in a Jenkins pipeline script using the convenience methods (TBC)

## Running Tests

You can run Cypress tests using any of the scripts within the `package.json`:

Run in interactive mode (opens Cypress Test Runner):
   ```shell 
    npm run cy:open
   ```
Run in headless mode (electron browser)
   ```shell 
    npm run cy:run
   ```
Run by Cucumber tag in electron browser:
   ```shell 
    npm run tag:authentication
    npm run tag:registration
   ```

## Interpreting Test Results
There is a Cucumber HTML Report archived at the project root.  It can be opened from VSCode using live-server (separate npm installation)
or by simply opening in a browser. The report embeds screenshots of failed tests and provides a summary of the test results.

## Contributing to the Project
We should follow Gitflow workflow as outlined [here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
If you wish to try adding to the existing tests, please check out your own branch using:
git checkout -b <your_branch_name_here>

## Adhering to Best Practices
The project uses eslint to enforce best practices.  Please run the following command before committing your changes:
 ```shell
  npm run lint:fix
  ``` 

## Security and consistency
The project uses husky, lint-staged and snyk as pre-commit hooks to enforce security and consistency.  Please run the following command before committing your changes:


