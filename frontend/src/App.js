import React from 'react';
import Button from './components/button';
import Movie from './components/movie';
import axios from 'axios';
import { map } from 'lodash';
import './App.css';

const BACKEND_BASE_URL = "http://localhost:3001/movies/";

export default class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      movies: [],
      addFilmInputValue: ''   
    }
  }

  componentDidMount() {
    this.getList();
  }

  addFilmInputChange = event => {
    this.setState({ addFilmInputValue: event.target.value });

    console.log('value is:', event.target.value);
  };
  
  getList= () => {
    axios.get(BACKEND_BASE_URL).then((data) => data.data && data.data.movies && this.setState({ movies: data.data.movies }));
  }
  
  addMovie= () => {
    axios.put(BACKEND_BASE_URL, { movie: this.state.addFilmInputValue }).then((data) => this.getList());
  }
  
  deleteMovie= (id) => {
    axios.delete(`${BACKEND_BASE_URL}/${id}`).then((data) => this.getList());
  }
  
  renderCategory = (label, action) => {
    return (<div className='category'>
    <Button text={label} onClick={action} />
    </div>)
  }
  
  render() {  
    const { movies, addFilmInputValue} = this.state;

    return (
      <div>
        {this.renderCategory('Refresh', this.getList)}
        <div className='category'>
              <input
                type="text"
                id="addFilm"
                name="addFilm"
                onChange={this.addFilmInputChange}
                value={addFilmInputValue}
              />
            <Button text={'Add movie'} onClick={this.addMovie} />
        </div>

        <div className='movies'>
          {map(movies, (movie, index) => <Movie key={`movie-${index}`} infos={movie} deleteMovie={this.deleteMovie}/>)}
        </div>
      </div>
      )
    }
  }