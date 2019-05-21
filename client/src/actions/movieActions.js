import axios from 'axios';
import { GET_MOVIES, MOVIES_LOADING, SELECT_MOVIE, GET_GENRES, MOVIE_GENRES } from '../actions/types';

export const getMovies = () => dispatch => {
    dispatch(setMoviesLoading());
    axios
        .get('https://moviet.herokuapp.com/api/movies')
        .then(res => {
            dispatch({
                type: GET_MOVIES,
                payload: res.data.results
            })});   
             
}

export const getGenres = () => dispatch => {
    axios
        .get('https://moviet.herokuapp.com/api/movies/genre')
        .then(res => {
            dispatch({
                type: GET_GENRES,
                payload: res.data.genres
            })});   
    
}

export const selectMovie = (id) => (dispatch, getState) => {
    dispatch({
        type: SELECT_MOVIE,
        payload: id
    })
    dispatch(movieGenre());
}


export const movieGenre = () => (dispatch, getState) => {
    let temp = [];
    getState().movie.selectedMovie.genre_ids.forEach((id) => {
        temp = [getState().movie.genres.find(genre => genre.id === id), ...temp]
    });
    dispatch({
        type: MOVIE_GENRES,
        payload: temp
    })
}

export const setMoviesLoading = () => {
    return {
        type: MOVIES_LOADING
    }
}