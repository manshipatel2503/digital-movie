import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import MovieCategory from '../movies/MovieCategory';

// Mock the localStorage object
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => {
      return store[key] || null;
    },
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('MovieCategory', () => {
    test('renders search bar', () => {
      const { getByTestId } = render(<MovieCategory />);
      expect(getByTestId('search-bar')).toBeInTheDocument();
    });
  
    test('renders "Sorry!! No Movies Found" if movies list is empty', () => {
      const { getByText } = render(<MovieCategory />);
      expect(getByText('Sorry !! No Movies Found')).toBeInTheDocument();
    });
  
   
});