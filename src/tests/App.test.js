import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helps/renderWithRouter';

describe('App component test', () => {
  it('should have links navigation', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
  it('should have redirect to path="/" when Home link is clicked', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });
  it('should have redirect to path="/about" whan About link is clicked', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
});
