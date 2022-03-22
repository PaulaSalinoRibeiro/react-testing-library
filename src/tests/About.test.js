import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
});
