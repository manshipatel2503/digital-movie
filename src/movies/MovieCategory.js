import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { API_KEY, API_URL } from '../constant';
import MovieList from './MovieList';
import Search from '../common/Search';
import './Movie.css';

const MovieCategory = () => {

    // get the category from the URL using useParams
    const { category } = useParams('popular');
    // set the initial state for the movies
    const [movies, setMovies] = useState([]);


    // get the initial favourite movies from localStorage
    const getInitialFavourites = () => {
        const favMovies = JSON.parse(localStorage.getItem('favourite_movies'));
        if (favMovies && favMovies.movieList?.length > 0) {
            return favMovies.movieList;
        }
        return [];
    }

    // update the favourite movies in localStorage and in the movieList state
    const updateFavourite = (e) => {
        const { type, id } = e;

        // update localStorage
        let favMovies = JSON.parse(localStorage.getItem('favourite_movies')) || { movieList: [] };


        if (type === 'add' && !(favMovies?.movieList.find(m => m.id === id))) {
            favMovies.movieList.push({ id: id, ...e.data });
        } else if (type === 'remove') {
            favMovies.movieList = favMovies.movieList.filter(m => m.id !== id);
        }

        localStorage.setItem('favourite_movies', JSON.stringify(favMovies));

        // update movieList state
        const updatedMovieList = movies.map(movie => {
            if (movie.id === id) {
                return { ...movie, favourite: type === 'add' }
            }
            return movie;
        });
        setMovies(updatedMovieList);
    };

    const setMovieListFavourite = (data) => {
        let favMovies = getInitialFavourites();
        const list = data.map(movie => {
            if (favMovies.find(m => m.id === movie.id)) {
                return { ...movie, favourite: true };
            } else {
                return { ...movie, favourite: false };
            }
        });
        setMovies(list);
    }

    // fetch the movies from the API based on the category
    const fetchMovies = useCallback(async (category) => {
        fetch(`${API_URL}/movie/${category}?api_key=${API_KEY}`)
            .then(async (res) => res.json())
            .then(async (data) => {
                await setMovies(data.results);
                await setMovieListFavourite(data.results);
            })
    }, [setMovies, setMovieListFavourite]);

    // call fetchMovies when the category changes
    useEffect(() => {
        fetchMovies(category)
    }, [category]);




    const searchMovie = async (searchQuery) => {
        if (searchQuery !== '') {
            const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
            setMovieListFavourite();
        } else {
            fetchMovies(category);
        }
    }
    
    // get the title of the category based on the current location
    const getTitle = () => {

        if (category) {
            switch (category) {
                case 'popular':
                    return 'Popular';
                case 'top_rated':
                    return 'Top Rated';
                case 'now_playing':
                    return 'Now Playing';
                case 'upcoming':
                    return 'Upcoming';
                default:
                    return '';
            }
        }
    }

    return (
        <>
            <Search search={(searchQuery) => searchMovie(searchQuery)} ></Search>
            {
                movies.length > 0 ? (
                    <>
                        <Container fluid="md" data-testid="movie-category">
                            <p className='title'>{getTitle()} </p>
                            <Row xs={1} md={4} className="gx-5">
                                {movies.map((movieReq) =>
                                    <MovieList key={movieReq.id} {...movieReq} showFav={true} changeFavourite={(favourite) => updateFavourite(favourite)} />
                                )}
                            </Row>
                        </Container>
                    </>
                ) : (
                    <h2 className='title mx-5'>Sorry !! No Movies Found</h2>
                )
            }

        </>
    );
};

export default MovieCategory;
