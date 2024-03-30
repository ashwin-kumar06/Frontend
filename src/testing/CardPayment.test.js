import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardPayment from '../components/CardPayment';

describe('CardPayment component', () => {
  test('renders component without crashing', () => {
    render(<CardPayment />);
    expect(screen.getByText('Payment Details')).toBeInTheDocument();
  });

  test('displays input fields for person name, card number, expiry, and CVV/CVC', () => {
    render(<CardPayment />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1234 5678 435678')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MM/YYYY')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('***')).toBeInTheDocument();
  });

  test('submits form when submit button is clicked', () => {
    render(<CardPayment />);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    // expect some submission logic to be triggered
  });

  test('allows typing in person name input field', () => {
    render(<CardPayment />);
    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

  test('allows typing in card number input field', () => {
    render(<CardPayment />);
    const cardNumberInput = screen.getByPlaceholderText('1234 5678 435678');
    fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
    expect(cardNumberInput.value).toBe('1234567890123456');
  });

  test('allows typing in expiry input field', () => {
    render(<CardPayment />);
    const expiryInput = screen.getByPlaceholderText('MM/YYYY');
    fireEvent.change(expiryInput, { target: { value: '12/2024' } });
    expect(expiryInput.value).toBe('12/2024');
  });

  test('allows typing in CVV/CVC input field', () => {
    render(<CardPayment />);
    const cvvInput = screen.getByPlaceholderText('***');
    fireEvent.change(cvvInput, { target: { value: '123' } });
    expect(cvvInput.value).toBe('123');
  });
});