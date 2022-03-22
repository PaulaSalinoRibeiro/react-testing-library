import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helps/renderWithRouter';

describe('NotFound component test', () => {
  it('verify have text', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/notfound');
    const text = screen.getByText(/page requested not found/i);
    expect(text).toBeDefined();

    screen.logTestingPlaygroundURL();
  });
});
