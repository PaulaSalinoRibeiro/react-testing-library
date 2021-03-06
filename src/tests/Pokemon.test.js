import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helps/renderWithRouter';
import App from '../App';

describe('Pokemon component test', () => {
  it('verify if show pokemon card', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText('Pikachu sprite');
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(img.src).toEqual(src);
  });

  it('verify if exist link', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    expect(history.location.pathname).toEqual('/pokemons/25');
  });

  it('verify if have star icon for favorite pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checked = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(checked);
    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star.src).toEqual('http://localhost/star-icon.svg');

    screen.logTestingPlaygroundURL();
  });
});
