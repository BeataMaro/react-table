import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/store';
import DetailsPage from './DetailsPage';
import { render, screen, waitFor } from '@testing-library/react';

test('renders details page', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailsPage />
      </BrowserRouter>
    </Provider>
  );

  // Assert that the back button is present
  waitFor(() => expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument());

  // Assert that the user portfolio component is rendered

  waitFor(() => expect(screen.findByTestId('user-portfolio')).toBeInTheDocument());
});
