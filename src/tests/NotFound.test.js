import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helps/renderWithRouter';

describe('NotFound component test', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/notfound');
  });

  it('verify have text', () => {
    const text = screen.getByText(/page requested not found/i);
    expect(text).toBeDefined();

    screen.logTestingPlaygroundURL();
  });

  it('verify have image in the page', () => {
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(image.src).toBe(src);

    screen.logTestingPlaygroundURL();
  });
});
