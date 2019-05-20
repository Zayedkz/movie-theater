import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { getMovies, selectMovie, getGenres } from '../actions/movieActions';
import { Container, Col, Row, Card, Button } from 'reactstrap';


class MoviesList extends Component {
    state = {
        isMouseOver : false,
        id: null,
        
    }
    componentDidMount() {
        this.props.getMovies();
        this.props.getGenres();
    }
    setMouseOver = (id) => {
        this.setState({
            isMouseOver: true,
            id: id
        });
    }
    setMouseOut = () => {
        this.setState({
            isMouseOver: false,
            id: null
        });
    }
  render() {
      const { movies } = this.props.movie;
      const { isAuthenticated } = this.props.auth;
    return (
        <Container>
            <h1>Now Playing</h1>
            { !isAuthenticated ? <h4>Please login to buy tickets</h4> : null }
            <Row className="mt-3">
                {movies.slice(0, 8).map(({id, poster_path}) => (
                    <Col key={id} sm="3 card-margin">
                        <Link to="/details" onClick={this.props.selectMovie.bind(this,id)}>
                            <Card className="card-styles">
                                <img height="300px" width="200px" onMouseEnter = {this.setMouseOver.bind(this,id)} onMouseOut = {this.setMouseOut} className="card-img" src={'https://image.tmdb.org/t/p/w500' + poster_path} alt="poster" />
                                { this.state.isMouseOver && id===this.state.id ? 
                                <div>
                                    <Link to="/tickets"> { isAuthenticated ?  
                                        <Button
                                        color="dark"
                                        className="button-style"
                                        onMouseEnter = {this.setMouseOver.bind(this,id)}
                                        onClick={this.props.selectMovie.bind(this,id)}
                                        
                                        >
                                            BUY TICKETS
                                        </Button> : null}
                                    </Link> 
                                    <Link to="/details">
                                        <Button
                                            color="dark"
                                            className="button-style2"
                                            onMouseEnter = {this.setMouseOver.bind(this,id)}
                                            onClick={this.props.selectMovie.bind(this,id)}
                                            
                                        >
                                            DETAILS
                                        </Button>
                                    </Link>
                                </div> : null 
                                }
                            </Card>
                        </Link>
                        
                    </Col>
                ))}
            </Row>
        </Container>
    )
  }
}

const mapStateToProps = (state) => ({
    movie: state.movie,
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, { getMovies, selectMovie, getGenres })(MoviesList));