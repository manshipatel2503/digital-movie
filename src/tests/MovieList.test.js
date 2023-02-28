import React from 'react';
import { shallow } from 'enzyme';
import MovieList from '../movies/MovieList';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { render, fireEvent } from '@testing-library/react';

describe('MovieList', () => {
  test('displays movie title', () => {
    const movie = {
      id: 1,
      title: 'Black Panther: Wakanda Forever',
      // other props
    };
    const { getByText } = render(<MovieList {...movie} />);
    expect(getByText('Black Panther: Wakanda Forever')).toBeInTheDocument();
  });

  test('opens modal on button click', () => {
    const movie = {
      id: 1,
      title: 'Black Panther: Wakanda Forever',
      // other props
    };
    const { getByText, getByRole } = render(<MovieList {...movie} />);
    fireEvent.click(getByText('View More'));
    expect(getByRole('dialog')).toHaveTextContent('Black Panther: Wakanda Forever');
  });

  
});
