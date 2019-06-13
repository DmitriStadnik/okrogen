import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dzerdan from '../Dzerdan'
import List from './List'

const Header = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  margin: 30px 0px;
`;

const Buttons = styled.div`
  text-align: center;
  margin: auto;
  margin-top: 10px;
  width: 340px;
  margin-bottom: 50px;
`;

const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px;
  color: white;
  background-color: #26a65b;
  width: 50%;
  border: none;
  outline: none;
  transition: 0.2s;
  &:hover {
    background-color: #87d37c; 
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #a2ded0; 
    &:hover {
      background-color: #a2ded0;
    }
  }
`;

export default class Generator extends Component {
  constructor() {
    super();
  
    this.state = {
      dzerdan: null,
      savePossible: true,
      recent: null,
    }
  }

  componentDidMount() {
    this.getDzerdan();
    this.getRecent();
  }

  getDzerdan() {
    let that = this;
    axios.get('/api/generator/generate')
      .then(response => {
        that.setState({
          dzerdan: response.data,
          savePossible: true
        });
      })
      .catch(error => console.log(error))
  }

  getRecent() {
    let that = this;
    axios.get('/api/collection', {
      params: {
        count: 9,
      }
    })
      .then(response => {
        that.setState({
          recent: response.data.data,
        });
      })
      .catch(error => console.log(error))
  }

  saveDzerdan() {
    this.setState({savePossible: false});
    axios.post('/api/generator/save')
      .catch(error => console.log(error))
  }

  render () {
    const {dzerdan, savePossible, recent} = this.state;
    return (
      <Grid> 
        <Row>
          <Col md={6} sm={12}>
            <Header>Генератор 2.0</Header>
            {
              dzerdan ? 
                <Dzerdan item={dzerdan} />
              : null
            }
            <Buttons>
              <Button onClick={() => this.getDzerdan()}>Генерировать</Button>
              <Button onClick={() => this.saveDzerdan()} disabled={!savePossible}> {savePossible ? 'Сохранить' : 'Сохранено' }</Button>
            </Buttons>
          </Col>
          <Col md={6} sm={12}>
            <Header>Последние</Header>
            {
              recent ? 
                <List items={recent} />
              : null
            }
          </Col>
        </Row>
      </Grid>
    )
  }
}