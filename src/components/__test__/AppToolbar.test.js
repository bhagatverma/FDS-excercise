import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AppToolbar from '../AppToolbar';

const onLoginMock = jest.fn();
const onLogoutMock = jest.fn();

test('renders the AppToolbar', () => {
  render(
    <AppToolbar
      isLoggedIn={false}
      onLogin={onLoginMock}
      onLogout={onLogoutMock}
    />
  );

  expect(screen.queryByText('Intelligence Bank Coding Exercise')).toBeInTheDocument();
});

test('Cannot see user icon when logged out', () => {
  render(
    <AppToolbar
      isLoggedIn={false}
      onLogin={onLoginMock}
      onLogout={onLogoutMock}
    />
  );

  expect(screen.queryByLabelText('user icon')).not.toBeInTheDocument();
});

test('Can see user icon when logged in', () => {
  render(
    <AppToolbar
      isLoggedIn
      onLogin={onLoginMock}
      onLogout={onLogoutMock}
    />
  );

  expect(screen.queryByLabelText('user icon')).toBeInTheDocument();
});

test('Calls onLogin callback when clicking login', () => {
  render(
    <AppToolbar
      isLoggedIn={false}
      onLogin={onLoginMock}
      onLogout={onLogoutMock}
    />
  );

  const loginButton = screen.queryByLabelText('login');
  userEvent.click(loginButton);

  expect(onLoginMock).toHaveBeenCalled();
});

test('Calls onLogout callback when clicking logout', () => {
  render(
    <AppToolbar
      isLoggedIn
      onLogin={onLoginMock}
      onLogout={onLogoutMock}
    />
  );

  const userIcon = screen.queryByLabelText('user icon');
  userEvent.click(userIcon);

  const logoutButton = screen.queryByLabelText('logout');
  userEvent.click(logoutButton);

  expect(onLogoutMock).toHaveBeenCalled();
});
