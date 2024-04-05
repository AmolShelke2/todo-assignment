import { describe, expect, test } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  test('should render input field and add button', () => {
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should add task to list when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('should delete task from list when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', {
      name: 'Add Task:',
    }) as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: 'Add' });

    // Add a task
    await user.type(input, 'New Task');
    await user.click(addButton);

    // Find the delete button associated with the task and click it
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    const taskToDeleteButton = deleteButtons.find((button) =>
      button.closest('.task-card')!.textContent!.includes('New Task'),
    );
    await user.click(taskToDeleteButton!);

    // Ensure the task is removed from the list
    await waitFor(() => {
      expect(screen.queryByText('New Task')).not.toBeInTheDocument();
    });
  });
});
