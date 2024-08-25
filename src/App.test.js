import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const originalError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((msg) => {
    if (!msg.includes('ReactDOMTestUtils.act is deprecated')) {
      originalError(msg);
    }
  });
});

afterAll(() => {
  console.error.mockRestore();
});


test('renders To-Do List title', () => {
  render(<App />);
  const titleElement = screen.getByText(/to-do list/i);
  expect(titleElement).toBeInTheDocument();
});
