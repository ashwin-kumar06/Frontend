import React from 'react';
import { render, fireEvent, waitFor, findByTestId } from '@testing-library/react';
import ForgotPassword from '../components/ForgetPassword';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('ForgotPassword Component', () => {
  it('renders without crashing', () => {
    render(<Router><ForgotPassword /></Router>);
  });

  it('displays "Verify Email" text', async () => {
    const { getByText } = render(<Router><ForgotPassword /></Router>);
    await waitFor(() => expect(getByText('Verify Email')).toBeInTheDocument());
  });

  it('sends OTP when "Send" button is clicked', async () => {
    axios.post.mockResolvedValueOnce({ data: { sOTP: '123456' } });
    const { getByPlaceholderText, getByText } = render(<Router><ForgotPassword /></Router>);
    fireEvent.change(getByPlaceholderText('Enter email'), { target: { value: 'test@example.com' } });
    fireEvent.click(getByText('Send'));
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:5269/api/SignupLogin/forgotpassword?email=test@example.com'));
  });

  it('displays error message if OTP is invalid', async () => {
    axios.post.mockRejectedValueOnce(new Error('Invalid OTP'));
    const { getByPlaceholderText, getByText, findByTestId} = render(<Router><ForgotPassword /></Router>);
    fireEvent.change(getByPlaceholderText('Enter email'), { target: { value: 'test@example.com' } });
    fireEvent.click(getByText('Send'));
    fireEvent.change(getByPlaceholderText('Enter OTP'), { target: { value: '' } });
    fireEvent.click(getByText('Verify'));
    await findByTestId("Invalid");
  });


  it('displays error message if email field is empty when sending OTP', async () => {
    const { getByText, findByTestId } = render(<Router><ForgotPassword /></Router>);
    fireEvent.click(getByText('Send'));
    await findByTestId("Invalid");
  });

  it('displays error message if OTP field is empty when verifying', async () => {
    const { getByPlaceholderText, getByText, findByTestId } = render(<Router><ForgotPassword /></Router>);
    fireEvent.change(getByPlaceholderText('Enter email'), { target: { value: 'test.com' } });
    fireEvent.click(getByText('Send'));
    fireEvent.click(getByText('Verify'));
    await findByTestId("Invalid");
  });
});