const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');



// movie database API key
const moviedb = config.get('movie-api');

router.get('/', (req,res) => {
    request({
        uri: 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + moviedb + '&language=en-US&page=1'
      }).pipe(res);
});

router.get('/genre', (req,res) => {
  request({
      uri: 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + moviedb + '&language=en-US'
    }).pipe(res);
});


module.exports = router;