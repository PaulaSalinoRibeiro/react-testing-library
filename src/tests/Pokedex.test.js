import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helps/renderWithRouter';
import App from '../App';

describe('Pokedex component test', () => {
  it('verify title', () => {
    renderWithRouter(<App />);
    const title = screen.getByText(/encountered pokémons/i);
    expect(title).toBeInTheDocument();

    //screen.logTestingPlaygroundURL();
  });

  it.only('verify next pokemon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();

    const clicks = 8;
    for (let i = 0; i < clicks; i += 1) {
      userEvent.click(nextButton);
    }
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
