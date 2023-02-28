import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import MovieList from '../movies/MovieList';
import Search from '../common/Search';
const Favourite = () => {

    const [favMovies, setFavouriteMovies] = useState([]);

    // Fetch favourite movies from local storage on component mount
    useEffect(() => {
        fetchFavouriteMovies()
    }, []);

    // Function to fetch favourite movies from localstorage
    const fetchFavouriteMovies = () => {
        const favMovies = JSON.parse(localStorage.getItem('favourite_movies'));
        if (favMovies && favMovies.movieList?.length > 0) {
            setFavouriteMovies(favMovies.movieList)
        }
    }

    // search Movie Locally
    const searchMovie = (query) => {
        if (query) {
            const searchedMovies = favMovies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
            setFavouriteMovies(searchedMovies);
        }
        else {
            fetchFavouriteMovies();
        }
    }

    return (
        <>
            <Search search={(searchQuery) => searchMovie(searchQuery)} ></Search>
            {
                favMovies.length > 0 ? (
                    <Container fluid="md">
                        <p className='title'>Favourite Movies</p>
                        <Row xs={1} md={4} className="gx-5">
                            {favMovies.map((movieReq) =>
                                <MovieList key={movieReq.id} {...movieReq} showFav={false} />
                            )}
                        </Row>
                    </Container>
                ) : (
                    <h2 className='title mx-5'>Sorry !! No Movies Found</h2>
                )
            }

        </>
    );
};

export default Favourite;