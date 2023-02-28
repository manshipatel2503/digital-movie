import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from './Layout';
import MovieCategory from './movies/MovieCategory';
import Favourite from './favourite/Favourite';

const App = ({ props }) => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="movies/:category" element={<MovieCategory />} />
            <Route path="favourites" element={<Favourite />} />
            <Route path="/" element={<Navigate to="/movies/popular" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;