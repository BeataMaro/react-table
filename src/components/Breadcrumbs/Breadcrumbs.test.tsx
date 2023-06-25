import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { render, screen, waitFor } from '@testing-library/react';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

test('renders breadcrumbs correctly', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/home', '/home/page1', '/home/page1/page2']}>
        <Breadcrumbs />
      </MemoryRouter>
    </Provider>
  );

  // Assert that the breadcrumbs are rendered correctly
  waitFor(() => {
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
  waitFor(() => {
    expect(screen.getAllByRole('link')[0]).toHaveTextContent('Home /');
    expect(screen.getAllByRole('link')[1]).toHaveTextContent('Page1 /');
    expect(screen.getAllByRole('link')[2]).toHaveTextContent('Page2 /');
  });
});
