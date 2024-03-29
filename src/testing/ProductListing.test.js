import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductListing from '../components/ProductListing';
import {BrowserRouter as Router } from 'react-router-dom';

describe('ProductListing component text availability', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'mockUserId'),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('displays "Products List" heading', () => { 
    render(<Router><ProductListing /></Router>);
    expect(screen.getByTestId('Products List')).toBeInTheDocument();
  });

  it('displays "Modal" label', () => {
    render(<Router><ProductListing /></Router>);
    expect(screen.getByTestId("Awesome!")).toBeInTheDocument();
  });

  it('displays "Categories" label', () => {
    render(<Router><ProductListing /></Router>);
    expect(screen.getByTestId('Categories')).toBeInTheDocument();
  });

  it('displays "Bid Now" button', () => {
    render(<Router><ProductListing /></Router>);
    expect(screen.getByTestId('confirm')).toBeInTheDocument(); 
  });

  it('displays "Recent Bidders" heading', () => {
    render(<Router><ProductListing /></Router>);
    expect(screen.getByText('Recent Bidders')).toBeInTheDocument(); 
  });
});