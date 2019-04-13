import './styles.css';
import React, { Component } from 'react';
import logo from '../../assets/img/logo.svg';
import api from '../../services/api';

export default class Main extends Component {

  state = {
    newBox: ''
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post('boxes', {
      title: this.state.newBox,
    });

    /* history para a navegação de outra tela */
    this.props.history.push(`/box/${response.data._id}`);
  };

  handleInputChange = e => {
    this.setState({newBox: e.target.value});
  };
  
  render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
                <img src={logo} alt="logo da rockeseat" />
                <input value={this.state.newBox} onChange={this.handleInputChange} type="text" placeholder="Criar uma box"></input>
                <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}


