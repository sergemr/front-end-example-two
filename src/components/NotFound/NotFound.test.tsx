import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<NotFound />);
    const notFound = getByTestId('NotFound');

    expect(notFound).toBeInTheDocument();
  });
});