import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Col, Row, Form, FormGroup, Button } from 'reactstrap';
import PayPalButton from './PayPalButton';

class Tickets extends Component {
  state = {
    generalPrice: 11,
    seniorPrice: 8.5,
    childPrice: 7.5,
    generalCount: 0,
    seniorCount: 0,
    childCount: 0,
    tax: 0.1,
    pricetotal: 0,
    taxtotal: 0,
    total: 0
  }

  increment = (name) => {
    if (name === 'general') {
      this.setState(()=>{return{generalCount:this.state.generalCount + 1}},()=>{this.updateTotal()})
    } else if (name === 'senior') {
      this.setState(()=>{return{seniorCount:this.state.seniorCount + 1}},()=>{this.updateTotal()})
    } else {
      this.setState(()=>{return{childCount:this.state.childCount + 1}},()=>{this.updateTotal()})
    }
  }

  decrement = (name) => {
    if (name === 'general') {
      this.setState(()=>{return{generalCount:this.state.generalCount - 1}},()=>{this.updateTotal()})
    } else if (name === 'senior') {
      this.setState(()=>{return{seniorCount:this.state.seniorCount - 1}},()=>{this.updateTotal()})
    } else {
      this.setState(()=>{return{childCount:this.state.childCount - 1}},()=>{this.updateTotal()})
    }
  }

  updateTotal = () => {
    const pricetotal = this.state.generalCount * this.state.generalPrice + this.state.seniorCount * this.state.seniorPrice + this.state.childCount * this.state.childPrice;
    const taxtotal = pricetotal * 0.1;
    const total = pricetotal + taxtotal;
    this.setState({
      pricetotal: pricetotal,
      taxtotal: taxtotal,
      total: total
    })
  }


  render() {
    const { poster_path } = this.props.movie.selectedMovie;
    const moviePoster = 'https://image.tmdb.org/t/p/w500' + poster_path;
    const { user } = this.props.auth;
    return (
        <Container>
          <Row>
            <Col className="mx-auto col-md-6 my-4">
              <img src={moviePoster} className="img-fluid poster float-right mr-5" alt="movie-poster" />
            </Col>
            <Col className="mx-auto col-md-6 my-4">
              <h3>Checkout</h3>
              <h6 className="text-capitalize">{`Name: ${user.name}`}</h6>
              <h6>{`Email: ${user.email}`}</h6>
              <h6>Price: $11</h6>
              <Form>
                  <FormGroup>
                    <Row>
                    <Col className="col-md-4 my-4">
                      <h6 className="mb-4">GENERAL {`(14-64)`} </h6>
                      <h6 className="my-4 pb-1 pt-3">SENIOR {`(65+)`} </h6>
                      <h6 className="my-4 py-2">CHILD {`(3-13)`} </h6>
                    </Col>
                    <Col className="col-md-4 my-4 pl-0">
                      <Button
                        name="general"
                        color="dark"
                        className="btn btn-black mx-1"
                        disabled = {this.state.generalCount === 0}
                        onClick={() => this.decrement("general")}
                        >
                          -
                      </Button>
                      <strong>{this.state.generalCount}</strong>
                      <Button
                        name="general"
                        color="dark"
                        className="btn btn-black mx-1"
                        disabled = {this.state.generalCount === 8}
                        onClick={() => this.increment("general")}
                        >
                          +
                      </Button><p></p>  
                      <Button
                        name="senior"
                        color="dark"
                        className="btn btn-black mx-1"
                        disabled = {this.state.seniorCount === 0}
                        onClick={() => this.decrement("senior")}
                        >
                          -
                      </Button>
                      <strong>{this.state.seniorCount}</strong>
                      <Button
                        name="senior"
                        color="dark"
                        className="btn btn-black mx-1"
                        disabled = {this.state.seniorCount === 8}
                        onClick={() => this.increment("senior")}
                        >
                          +
                      </Button><p></p>  
                      <Button
                        name="child"
                        color="dark"
                        className="btn btn-black mx-1"
                        disabled = {this.state.childCount === 0}
                        onClick={() => this.decrement("child")}
                        >
                          -
                      </Button>
                      <strong>{this.state.childCount}</strong>
                      <Button
                        name="child"
                        color="dark"
                        className="btn btn-black mx-1"
                        disabled = {this.state.childCount === 8}
                        onClick={() => this.increment("child")}
                        >
                          +
                      </Button><p></p>  

                      <h6 style={{marginTop: '7rem'}}>Price: $ {this.state.pricetotal}</h6>
                      <h6>Tax: $ {parseFloat(this.state.taxtotal.toFixed(2))}</h6>
                      <h6>Total: $ {this.state.total}</h6>
                      <PayPalButton total={this.state.total}/>
                    </Col>
                    </Row>
                      
                  </FormGroup>
                </Form>
            </Col>
          </Row>
        </Container>
    )
  }
}


const mapStateToProps = (state) => ({
    movie: state.movie,
    auth: state.auth
});
  
export default connect(mapStateToProps, null)(Tickets);