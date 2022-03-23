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

    const pokemons = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam',
      'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    for (let i = 0; i < pokemons.length; i += 1) {
      userEvent.click(nextButton);
      expect(screen.getByText(pokemons[i])).toBeInTheDocument();
    }
    userEvent.click(nextButton);
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  it('verify if just one pokemom is render', () => {
    renderWithRouter(<App />);
    const details = screen.getAllByRole('link', { name: /more details/i });
    expect(details).toHaveLength(1);
  });

  it('should have filter buttons', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');
    // console.log(buttons);

    const pokemons = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam',
      'Snorlax', 'Dragonair'];

    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    for (let i = 0; i < pokemons.length; i += 1) {
      userEvent.click(buttons[i]);
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemons[i]);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(types[i]);
      expect(buttons[i]).toHaveTextContent(types[i]);
    }

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  it('verify if have reset filter button', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).not.toBeDisabled();

    const fireBtn = screen.getByRole('button', { name: /fire/i });

    userEvent.click(fireBtn);
    const pokemon = screen.getByText(/Charmander/i);
    expect(pokemon).toHaveTextContent('Charmander');

    userEvent.click(allBtn);
    expect(pokemon).toHaveTextContent('Pikachu');
  });
});
