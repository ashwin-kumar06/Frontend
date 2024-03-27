import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import extend-expect for better assertions
import axios from 'axios';
import SignUp from '../components/SignUp';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('SignUp component', () => {
  it('renders signup form correctly', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    expect(screen.getByTestId('Signup')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByTestId('Signup')).toBeInTheDocument();
  });

  it('handles form submission with valid credentials', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        userId: 'mockUserId',
      },
    });

    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });

    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password' },
    });

  });

  it('displays error message for invalid email', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalidemail' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByTestId('Signup'));
    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
  });

  it('displays error message for password mismatch', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'mismatchpassword' },
    });
    fireEvent.click(screen.getByTestId('Signup'));
    expect(await screen.findByText('Password mismatch')).toBeInTheDocument();
  });

  it('displays error message for password length less than 6 characters', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'pass' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'pass' },
    });
    fireEvent.click(screen.getByTestId('Signup'));
    expect(await screen.findByText('Password length should be more than 6')).toBeInTheDocument();
  });

});