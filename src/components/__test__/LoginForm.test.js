import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import axios from 'axios';
import LoginForm from '../LoginForm';
import UserService from '../../services/user-service';

jest.mock('axios');
const mockFailUserService = {
    login:(username,password) => {
        const mockResp = {
            status:401,
            data:{
                "status": "error",
                "message": "incorrect username or password."
            }
        };
        axios.post.mockResolvedValue(mockResp);
        return UserService.login(username,password).then(reposne => mockResp);
    }
}
const mockUserService = {
    login:(username,password) => {
        const mockResp = {
            status:200,
            data:{
                "username": 'testuser',
                "fullname": 'Test User'
            }
        };
        axios.post.mockResolvedValue(mockResp);
        return UserService.login(username,password).then(reposne => mockResp);
    }
}

const setUserDetailsMock = jest.fn();
const goToHomeMock = jest.fn();


test('renders the Login form correclty', () => {
    render(
      <LoginForm
        setUserDetails={setUserDetailsMock}
        goToHome={goToHomeMock}
        UserService={mockUserService}
      />
    );
    expect(screen.queryByText('Please log in below')).toBeInTheDocument();
  });


  test('Expect error message if submit is clicked without filling username', () => {
    render(
        <LoginForm
            setUserDetails={setUserDetailsMock}
            goToHome={goToHomeMock}
            UserService={mockUserService}
        />
    );
  
    const signupBtn = document.querySelector('#signup-btn');
    userEvent.click(signupBtn);

    expect(screen.queryByText('Enter username!')).toBeInTheDocument();
  });


  test('Expect error message if submit is clicked without filling password', () => {
    render(
        <LoginForm
            setUserDetails={setUserDetailsMock}
            goToHome={goToHomeMock}
            UserService={mockUserService}
        />
    );
  
    const signupBtn = document.querySelector('#signup-btn');
    userEvent.click(signupBtn);

    expect(screen.queryByText('Enter password!')).toBeInTheDocument();
  });

  
  test('Expect username and password feild to be empty when reset button clicked', () => {
    render(
        <LoginForm
            setUserDetails={setUserDetailsMock}
            goToHome={goToHomeMock}
            UserService={mockUserService}
        />
    );
    
    const usernameFeild = document.querySelector('#username');
    const passwordFeild = document.querySelector('#password');
    const resetBtn = document.querySelector('#reset-btn');
    
    fireEvent.change(usernameFeild, {target: {value: 'testuser'}})
    fireEvent.change(passwordFeild, {target: {value: 'password'}})

    userEvent.click(resetBtn);

    expect(usernameFeild.value).toBe('')
    expect(passwordFeild.value).toBe('')
  });


  test('Expect error message when try to sign with wrong credentials',async () => {
    render(
        <LoginForm
            setUserDetails={setUserDetailsMock}
            goToHome={goToHomeMock}
            UserService={mockFailUserService}
        />
    );
    
    const usernameFeild = document.querySelector('#username');
    const passwordFeild = document.querySelector('#password');
    const signupBtn = document.querySelector('#signup-btn');
    
    fireEvent.change(usernameFeild, {target: {value: 'wrongUser'}})
    fireEvent.change(passwordFeild, {target: {value: 'wrorgPassword'}})

    userEvent.click(signupBtn);
    await waitFor(() => {
        expect(document.querySelector('#login-form-snackbar')).toBeInTheDocument()
    })

  });