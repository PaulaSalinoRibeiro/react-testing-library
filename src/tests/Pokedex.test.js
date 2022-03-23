import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helps/renderWithRouter';
import App from '../App';

describe('Pokedex component test', () => {
  it('verify title page', () => {
    renderWithRouter(<App />);
    const title = screen.getByText(/encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('verify next pokemon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toHaveTextContent(/próximo pokémon/i);






  });

  it('verify if just one pokemom is render', () => {
    renderWithRouter(<App />);
    const details = screen.getAllByRole('link', { name: /more details/i });
    expect(details).toHaveLength(1);
  });

  it('should have filter buttons', () => {
    renderWithRouter(<App />);
    expect(allBtn).not.toBeDisabled();
  });

  it('verify if have reset filter button', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).not.toBeDisabled();

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();

    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(psychicBtn);
    const pokemonPsychic1 = screen.getByText(/alakazam/i);
    expect(pokemonPsychic1).toBeInTheDocument();

    userEvent.click(allBtn);
    expect(allBtn).not.toBeDisabled();
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
