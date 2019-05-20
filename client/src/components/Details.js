import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Button } from 'reactstrap';

class Details extends Component {
  render() {
    const { poster_path, title, overview, release_date } = this.props.movie.selectedMovie;
    const moviePoster = 'https://image.tmdb.org/t/p/w500' + poster_path;
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="details-page">
        <Container>
          <Row>
            <div className="mx-auto col-md-6 my-4">
              <img src={moviePoster} className="img-fluid poster float-right mr-5" alt="movie-poster" />
            </div>
            <div className="mx-auto col-md-6 my-5">
              <h2 className="text-capitalize">{title}</h2>
              {this.props.movie.movieGenres.map(({id, name}) => (
                this.props.movie.movieGenres[0].name !== name ? <span className="h5 py-5">, {name}</span> : <span className="h5 py-5">{name}</span>
              ))}
              <p className="text-muted lead mt-3 mb-4">{overview}</p>
              <p className="text-muted lead mt-3 mb-4">Release Date: {release_date}</p>
              
                { isAuthenticated ? <Link to="/tickets">
              <Button
                  color="dark"
                  className="button-style3"
                  >
                    BUY TICKETS
                </Button> </Link>: <h4>Please login to buy tickets</h4>}
              
                
            </div>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie,
  auth: state.auth
});

export default connect(mapStateToProps, null)(Details);