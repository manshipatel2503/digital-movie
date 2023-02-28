import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from '../common/Search';

describe('Search component', () => {
  test('should render search bar', () => {
    const { getByTestId } = render(<Search />);
    const searchBar = getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
  });

  test('should update search query on input change', () => {
    const { getByPlaceholderText } = render(<Search />);
    const searchInput = getByPlaceholderText('search');
    fireEvent.change(searchInput, { target: { value: 'Avengers' } });
    expect(searchInput.value).toBe('Avengers');
  });

  test('should call search function on search button click', () => {
    const searchMock = jest.fn();
    const { getByRole } = render(<Search search={searchMock} />);
    const searchButton = getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    expect(searchMock).toHaveBeenCalled();
  });
});