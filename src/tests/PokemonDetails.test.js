import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helps/renderWithRouter';
import App from '../App';

describe('PokemonDetails component test', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });

  it('should have Pikachu Datails title', () => {
    const title = screen.getByRole('heading', { name: /pikachu details/i });
    const details = screen.queryByRole('link', { name: /more details/i });
    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const paragraph = screen.getByText(/This intelligent Pokémon/i);

    expect(title).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();

    screen.logTestingPlaygroundURL();
  });

  it('should have context maps and location', () => {
    const titleMaps = screen.getByRole('heading', { name: /game locations of pikachu/i });
    const imgs = screen.getAllByAltText(/pikachu location/i);
    const src1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const src2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const location2 = screen.getByText(/kanto power plant/i);
    const location1 = screen.getByText(/kanto viridian forest/i);

    expect(titleMaps).toBeInTheDocument();
    expect(imgs).toHaveLength(2);
    expect(imgs[0].src).toEqual(src1);
    expect(imgs[1].src).toEqual(src2);
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
  });

  it('verify if user can pick with favorite', () => {
    const checked = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(checked).not.toBeDisabled();
    userEvent.click(checked);
    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();
    userEvent.click(checked);
    expect(star).not.toBeInTheDocument();
  });
});
