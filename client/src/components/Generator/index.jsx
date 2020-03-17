import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dzerdan from '../Dzerdan'
import List from './List'
import collectionRequests from "../../requests/collection-requests";
import {Link} from "react-router-dom";
import userRequests from "../../requests/user-requests";

const Header = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  margin: 30px 0;
`;

const Buttons = styled.div`
  text-align: center;
  width: 340px;
  margin: 10px auto 50px;
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

const StyledLink = styled(Link)`
  text-align: center;
  margin: auto auto 20px;
  display: block;
  width: 200px;
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px;
  color: white;
  background-color: #26a65b;
  transition: 0.2s;
  &:hover {
    background-color: #87d37c; 
    color: white;
    text-decoration: none;
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

const DebugWrapper = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 9999;
`;

const DebugButton = styled.button`
  text-transform: uppercase;
  font-size: 10px;
  padding: 5px;
  color: white;
  background-color: #26a65b;
  width: 100%;
  display: block;
  border: none;
  outline: none;
  transition: 0.2s;
  text-align: left;
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
      debug: false,
      debugButtons: [
        {
          name: 'рядовой',
          path: '/generator/debug/generate',
          data: {
            rarity: 0
          }
        },
        {
          name: 'бывалый',
          path: '/generator/debug/generate',
          data: {
            rarity: 1
          }
        },
        {
          name: 'закаленный в бою',
          path: '/generator/debug/generate',
          data: {
            rarity: 2
          }
        },
        {
          name: 'достопочтенный',
          path: '/generator/debug/generate',
          data: {
            rarity: 3
          }
        },
        {
          name: 'легендарный',
          path: '/generator/debug/generate',
          data: {
            rarity: 4
          }
        },
      ]
    }

    this.checkAuth = this.checkAuth.bind(this);
    this.getDzerdan = this.getDzerdan.bind(this);
  }

  componentDidMount() {
    this.checkAuth();
    this.getRecent();
  }

  getDzerdan(userId) {
    let that = this;
    axios.get('/api/generator/generate', {
      params: { userId }
    })
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
    collectionRequests.getItems({page: 0, count: 4, showAll: true})
      .then(response => {
        that.setState({
          recent: response.data.data,
        });
      })
      .catch(error => console.log(error))
  }

  getCollection() {
    const {
      collection: {
        page,
        itemsPerPage,
        filters
      },
    } = this.props;

    let userId = this.props.match.params.id;

    this.props.onFetchCollection(page, itemsPerPage, filters, false, userId === 'all' ? null : userId);
  }

  checkAuth () {
    const { getDzerdan } = this;
    const token = localStorage.getItem('authToken');
    if (!token) {
      getDzerdan(null);
      return;
    }
    userRequests.checkAuth(`JWT ${token}`)
      .then(response => {
        if (response.data.auth) {
          getDzerdan(response.data.userId);
        } else {
          getDzerdan(null);
          localStorage.removeItem('authToken');
        }
      })
      .catch(error => console.log(error));
  }

  saveDzerdan() {
    this.setState({savePossible: false});
    axios.post('/api/generator/save', {
      ...this.state.dzerdan 
    })
      .catch(error => console.log(error))
  }

  debugGetDzerdan(path, data) {
    let that = this;
    axios.get(path, {
      params: data
    })
      .then(response => {
        that.setState({
          dzerdan: response.data,
          savePossible: true
        });
      })
      .catch(error => console.log(error))
  }

  render () {
    const {
      dzerdan, 
      savePossible, 
      recent, 
      debugButtons,
      debug
    } = this.state;
    return (
      <>
        {
          debug && (
            <DebugWrapper> 
              { debugButtons.map(item => (
                <DebugButton key={item.name} onClick={() => this.debugGetDzerdan(item.path, item.data)}>{item.name}</DebugButton>
              ))}
            </DebugWrapper>
          )
        }
        <Grid> 
          <Row>
            <Col md={6} sm={12}>
              <Header>Генератор 2.5</Header>
              {
                dzerdan ? 
                  <Dzerdan item={dzerdan} />
                : null
              }
              <Buttons>
                <Button
                  onClick={() => this.checkAuth()}
                >
                  Генерировать
                </Button>
                <Button
                  onClick={() => this.saveDzerdan()}
                  disabled={!savePossible}
                >
                  {savePossible ? 'Сохранить' : 'Сохранено' }
                </Button>
              </Buttons>
            </Col>
            <Col md={6} sm={12}>
              <Header>Последние дзерданы</Header>
              {
                recent ? 
                  <List items={recent} />
                : null
              }
              <StyledLink to="/collection">
                Коллекция
              </StyledLink>
            </Col>
          </Row>
        </Grid>
      </>
    )
  }
}