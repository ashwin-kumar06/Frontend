import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Homepage from '../components/Homepage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Homepage component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'mockUserId'),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('renders homepage with user details and products', async () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
    expect(screen.getByTestId('slogan')).toBeInTheDocument();
  });

  it('renders homepage with "Sell" link when user is logged in', async () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
    expect(screen.getByText('Sell')).toBeInTheDocument();
  });

  it('redirects to login page when "Sell" link is clicked and user is not logged in', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null), // User is not logged in
      },
      writable: true,
    });
    render(
      <Router>
        <Homepage />
      </Router>
    );
    userEvent.click(screen.getByText('Sell'));
    expect(window.location.pathname).toEqual('/login');
  });

  it('redirects to sell product page when "Sell" link is clicked and user is logged in', async () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
    userEvent.click(screen.getByText('Sell'));
    expect(window.location.pathname).toEqual('/addproducts');
  });

  it('renders homepage with "Profile" link when user is logged in', async () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('redirects to login page when "Profile" link is clicked and user is not logged in', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null), // User is not logged in
      },
      writable: true,
    });
    render(
      <Router>
        <Homepage />
      </Router>
    );
    userEvent.click(screen.getByText('Profile'));
    expect(window.location.pathname).toEqual('/login');
  });

  // Add 5 more test cases here:

  it('renders homepage with "Register" button', async () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
    expect(screen.getByTestId('Register')).toBeInTheDocument();
  });

  it('renders homepage with "Current Auctions" section', async () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
    expect(screen.getByText('Current Auctions')).toBeInTheDocument();
  });

  it('renders homepage with "Let\'s see how auction works" section', async () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
    expect(screen.getByText("Let's see how auction works")).toBeInTheDocument();
  });

  it('renders homepage with "Trusted By Thousands Of People And Nonprofits" section', async () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
    expect(screen.getByText('Trusted By Thousands Of People And Nonprofits')).toBeInTheDocument();
  });

  it('renders homepage with "Logout" link when user is logged in', async () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

});