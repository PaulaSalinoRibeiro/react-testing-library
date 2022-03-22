import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helps/renderWithRouter';

describe('about component test', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
  });
  it('verify title exist', () => {
    const title = screen.getByRole('heading', { name: /about pokédex/i });
    expect(title).toBeDefined();
  });
  it('verify two paragraph exist', () => {
    const paragraph = screen.getAllByText(/pokémons/i);
    expect(paragraph).toHaveLength(2);
  });
  it('verify image exist', () => {
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img).toBeDefined();
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(src);
  });
});
