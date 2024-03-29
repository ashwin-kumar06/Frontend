import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddProducts from '../components/AddProduct';
import { BrowserRouter as Router } from 'react-router-dom';


describe('AddProducts component', () => {
    beforeEach(() => {
        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(() => 'mockUserId'), // Assuming a mock user ID
                removeItem: jest.fn(),
            },
            writable: true,
        });
    });

    it('renders the form with correct input placeholders', () => {
        render(
            <Router>
                <AddProducts />
            </Router>
        );

        expect(screen.getByPlaceholderText('Product name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Product brand/model/size/color')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Date End')).toBeInTheDocument();
    });

    it('renders the select options correctly', () => {
        render(
            <Router>
                <AddProducts />
            </Router>
        );

        expect(screen.getByTestId('Electronics')).toBeInTheDocument();
        expect(screen.getByTestId('New')).toBeInTheDocument();
        expect(screen.getByTestId('Close')).toBeInTheDocument();
    });

    it('renders the form labels correctly', () => {
        render(
            <Router>
                <AddProducts />
            </Router>
        );

        expect(screen.getByTestId('Title')).toBeInTheDocument();
        expect(screen.getByTestId('Description')).toBeInTheDocument();
        expect(screen.getByTestId('Type')).toBeInTheDocument();
        expect(screen.getByTestId('Expiry Date')).toBeInTheDocument();
        expect(screen.getByTestId('Condition')).toBeInTheDocument();
        expect(screen.getByTestId('Starting Price')).toBeInTheDocument();
        expect(screen.getByTestId('Status')).toBeInTheDocument();
    });

    it('renders the submit button with correct text', () => {
        render(
            <Router>
                <AddProducts />
            </Router>
        );

        expect(screen.getByRole('button', { name: 'Start auction' })).toBeInTheDocument();
    });

    it('renders the modal message correctly', async () => {
        render(
            <Router>
                <AddProducts />
            </Router>
        );

        // Simulate form submission
        fireEvent.submit(screen.getByRole('button', { name: 'Start auction' }));

        // Wait for modal to appear
        await screen.findByText('Your Auction has started');

        expect(screen.getByText('Your Auction has started')).toBeInTheDocument();
    });
});