import { GET_MOVIES, MOVIES_LOADING, SELECT_MOVIE, GET_GENRES, MOVIE_GENRES } from '../actions/types';

const initialState = {
    movies: [],
    genres: [],
    loading: false,
    selectedMovie: null,
    movieGenres: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false
            };
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            };
        case MOVIES_LOADING:
            return {
                ...state,
                loading: true
            };
        case SELECT_MOVIE: 
            return {
                ...state,
                selectedMovie: state.movies.find(movie => movie.id === action.payload)
            }
        case MOVIE_GENRES: 
            return {
                ...state,
                movieGenres: action.payload
            };
        default: 
            return state;
    }
}