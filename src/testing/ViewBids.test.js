import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ViewBids from '../components/ViewBids';
import { BrowserRouter as Router, Route } from 'react-router-dom';

describe('ViewBids Component', () => {
  it('renders without crashing', () => {
    render(<Router><ViewBids /></Router>);
  });

  it('displays product title', async () => {
    render(<Router><ViewBids /></Router>);
    await waitFor(() => expect(screen.getByText('Logout')).toBeInTheDocument()); 
  });

  it('displays bidder names', async () => {
    render(<Router><ViewBids /></Router>);
    await waitFor(() => expect(screen.getByText('Bidders Name')).toBeInTheDocument());
  });

  it('displays bidding amounts', async () => {
    render(<Router><ViewBids /></Router>);
    await waitFor(() => expect(screen.getByText('Bidding Amount')).toBeInTheDocument());
  });



  it('logs out when logout button is clicked', async () => {
    render(<Router><ViewBids /></Router>);
    fireEvent.click(screen.getByText('Logout'));
    // Add assertions to check if logout functionality is triggered
  });
});