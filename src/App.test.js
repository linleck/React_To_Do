import React from 'react';
import { render, screen , fireEvent} from '@testing-library/react';
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

test("adds a task and display it",() => {
  render(<App/>);
  const inputElement = screen.getByPlaceholderText(/add a new task.../i);
  const addButton = screen.getByText(/add task/i);
  // Simulate typing in the input field and clicking the add button
  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  // Assert that the task is added and displayed
  const newTaskElement = screen.getByText(/new task/i);
  expect(newTaskElement).toBeInTheDocument();
});

test('deletes a task', () => {
  render(<App />);
  
  // Find the input field and add button
  const inputElement = screen.getByPlaceholderText(/add a new task.../i);
  const addButton = screen.getByText(/add task/i);

  // Simulate adding a task
  fireEvent.change(inputElement, { target: { value: 'Task to Delete' } });
  fireEvent.click(addButton);

  // Assert that the task is added
  const taskToDeleteElement = screen.getByText(/task to delete/i);
  expect(taskToDeleteElement).toBeInTheDocument();

  // Find and click the delete button
  const deleteButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);

  // Assert that the task is removed
  expect(taskToDeleteElement).not.toBeInTheDocument();
});