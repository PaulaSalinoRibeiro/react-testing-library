import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helps/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('FavoritePokemons component test', () => {
  it('verify message', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');
    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeDefined();

    screen.logTestingPlaygroundURL();
  });
  it('verify favoritescards', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const favorite = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(favorite);
    history.push('/favorites');
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();

    screen.logTestingPlaygroundURL();
  });
});
