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

  it('verify if just one pokemom is render', () => {
    renderWithRouter(<App />);
    const details = screen.getAllByRole('link', { name: /more details/i });
    expect(details).toHaveLength(1);
  });

  it('should have filter buttons', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    const electricBtn = screen.getByRole('button', { name: /electric/i });
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    const bugBtn = screen.getByRole('button', { name: /bug/i });
    const poisonBtn = screen.getByRole('button', { name: /poison/i });
    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    const normalBtn = screen.getByRole('button', { name: /normal/i });
    const dragonBtn = screen.getByRole('button', { name: /dragon/i });
    expect(allBtn).toBeInTheDocument();
    expect(electricBtn).toBeInTheDocument();
    expect(fireBtn).toBeInTheDocument();
    expect(bugBtn).toBeInTheDocument();
    expect(poisonBtn).toBeInTheDocument();
    expect(psychicBtn).toBeInTheDocument();
    expect(normalBtn).toBeInTheDocument();
    expect(dragonBtn).toBeInTheDocument();

    userEvent.click(psychicBtn);
    const pokemonPsychic1 = screen.getByText(/alakazam/i);
    expect(pokemonPsychic1).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    const pokemonPsychic2 = screen.getByText(/mew/i);
    expect(pokemonPsychic2).toBeInTheDocument();
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
