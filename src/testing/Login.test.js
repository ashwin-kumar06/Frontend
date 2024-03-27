import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import extend-expect for better assertions
import axios from 'axios';
import Login from '../components/Login';


jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login component', () => {
  it('renders login form correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByTestId('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByText('SignUp')).toBeInTheDocument();
  });

  it('handles form submission with valid credentials', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        tokenString: 'mockToken',
        userId: 'mockUserId',
      },
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });


  });

  it('displays error message for invalid email', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalidemail' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByTestId('Login'));
    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
  });



});