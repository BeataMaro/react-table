import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/store';
import Table from './Table';

test('Table Component', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Table />
      </BrowserRouter>
    </Provider>
  );

  // Assert that the table headers are present
  expect(screen.getByText(/id/i)).toBeInTheDocument();
  expect(screen.getByText(/author/i)).toBeInTheDocument();
  expect(screen.getByText(/likes/i)).toBeInTheDocument();
  expect(screen.getByText(/image/i)).toBeInTheDocument();
});
