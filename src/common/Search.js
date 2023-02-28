import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Search = (props) => {

    const [searchQuery, setSearchQuery] = useState([]);

    const changeHandler = async (e) => {
        await setSearchQuery(e.target.value);
        if (!e.target.value) {
            props.search('');
        }
    }

    const searchMovie = async (e) => {
        e.preventDefault();
        props.search(searchQuery);
    }

    return (
        <>
            <div className='search-bar' data-testid="search-bar">
                <Form onSubmit={searchMovie} className='search-form'>
                    <FormControl
                        type="search"
                        placeholder='search'
                        aria-label="search"
                        name="query"
                        onChange={changeHandler}
                        value={searchQuery}>
                    </FormControl>
                    <Button variant="outline-success mx-1" type="submit" onClick={() => searchMovie}>Search</Button>
                </Form>
            </div>
        </>
    );
};

export default Search;
