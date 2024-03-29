import React from 'react';
import { render, fireEvent, waitFor, getByTestId, getByText } from '@testing-library/react';
import PersonalDetails from '../components/PersonalDetails';
import { BrowserRouter as Router } from 'react-router-dom';

describe('PersonalDetails Component', () => {
  it('renders without crashing', () => {
    render(<Router><PersonalDetails /></Router>);
  });

  it('submits the form with valid data', async () => {
    const { getByPlaceholderText, getByText } = render(<Router><PersonalDetails /></Router>);
    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText('Mobile Number'), { target: { value: '1234567890' } });
    fireEvent.change(getByPlaceholderText('Aadhar'), { target: { value: '123456789012' } });
    fireEvent.change(getByPlaceholderText('Address'), { target: { value: '123 Street, City' } });
    fireEvent.click(getByText('Confirm'));
    await waitFor(() => expect(window.location.pathname).toEqual('/'));
  });

  it('displays error message for invalid mobile number', async () => {
    const { getByPlaceholderText, getByText, findByTestId  } = render(<Router><PersonalDetails /></Router>);
    fireEvent.change(getByPlaceholderText('Mobile Number'), { target: { value: '123' } });
    fireEvent.click(getByText('Confirm'));
    await findByTestId('Invalid');
  });

  it('displays error message for invalid Aadhar number', async () => {
    const { getByPlaceholderText, getByText, findByTestId } = render(<Router><PersonalDetails /></Router>);
    fireEvent.change(getByPlaceholderText('Aadhar'), { target: { value: '123' } });
    fireEvent.click(getByText('Confirm'));
    await findByTestId('Invalid');
  });

  it('displays error message if any field is left empty', async () => {
    const { getByText } = render(<Router><PersonalDetails /></Router>);
    fireEvent.click(getByText('Confirm'));
    await waitFor(() => expect(getByText('Invalid Number')).toBeInTheDocument());
  });

  it('displays error message if mobile number contains non-numeric characters', async () => {
    const { getByPlaceholderText, getByText, findByTestId  } = render(<Router><PersonalDetails /></Router>);
    fireEvent.change(getByPlaceholderText('Mobile Number'), { target: { value: 'abcdef' } });
    fireEvent.click(getByText('Confirm'));
    await findByTestId('Invalid');
  });

  it('displays error message if Aadhar number contains non-numeric characters', async () => {
    const { getByPlaceholderText, getByText, findByTestId  } = render(<Router><PersonalDetails /></Router>);
    fireEvent.change(getByPlaceholderText('Aadhar'), { target: { value: 'abcdefghijk' } });
    fireEvent.click(getByText('Confirm'));
    await findByTestId('Invalid');
  });
});