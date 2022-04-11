# Front-end coding exercise

## Prerequisites
- [NodeJS](https://nodejs.org/en/download/) (14+)
- [yarn](https://classic.yarnpkg.com/en/docs/install/)

## Installation
From a terminal, run the following:
```bash
cd <project directory>
yarn
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in interactive watch mode.

## Coding Task

Create a `Login` screen with the following details:
- The screen should contain:
  - A heading of "Please log in below"
  - Username and Password labels and fields
  - A Login and Reset buttons.
- Show appropriate validation messages if username or password is empty when clicking Login. 
- Use function components and React hooks.
- Use a `react-router` path of `/login`.
- Use [material-ui](https://material-ui.com/) components.
- `POST` login details to `http://localhost:3001/api/login` as `json` in the following format:
  ```json
  {
    "username": "...",
    "password": "..."
  }
  ```
  - On successful login, you will receive a status `200` response with the following `json` data:
  ```json
  {
    "username": "...",
    "fullname": "..."
  }
  ```
  - On login failure, you will receive a status `401` response with the following `json` data:
  ```json
  {
    "status": "error",
    "message": "incorrect username or password."
  }
  ```
- On successful login:
  - Store the `username` and `fullname` in the `session` redux store.
  - Route to the `Main` component at `/`.
  - Show a bottom-centred [snackbar](https://material-ui.com/components/snackbars/) message on the `Main` screen with severity `success`.
  - In the `AppToolbar` component, verify that you now see the User icon in place of the Login button.
- On login failure:
  - Show a bottom-centred [snackbar](https://material-ui.com/components/snackbars/) message on the `Login` screen with severity `error`.
- Write test cases for the `Login` screen.

When done, send the code back to us as a ZIP archive.

## Notes:
- The server has one hard coded user:
  - **username:** _testuser_
  - **password:** _password_
- To verify the server is working, use the following from your terminal:
  ```bash
  curl --include \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"testuser","password":"password"}' \
  http://localhost:3001/api/login
  ```
