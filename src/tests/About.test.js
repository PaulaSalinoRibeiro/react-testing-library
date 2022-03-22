import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from '../components/About';
import renderWithRouter from '../helps/renderWithRouter';

describe('about component test', () => {
  it('verify title exist', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const title = screen.getByRole('heading', { name: /about pokédex/i });
    expect(title).toBeDefined();
  });
});
