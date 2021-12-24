import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';

describe('<Register />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Register />);
    const register = getByTestId('Register');

    expect(register).toBeInTheDocument();
  });
});