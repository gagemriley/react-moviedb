import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    // console.log("this is my intializer")

    // const movies = [
    // {id:0, poster_src: "", title: "Avengers: Infinity War", overview: "Blah, Blah, Blah"},
    // {id:1, poster_src: "", title: "Avengers", overview: "OK, OK, OK"},
    // ]

    

    //   var movieRows = []
    //   movies.forEach((movie) => {
    //     console.log(movie.title)
    //     const movieRow = <MovieRow movie={movie} />
    //     movieRows.push(movieRow)
    //   })

    //   this.state = {rows: movieRows}

    this.performSearch("ant man")
  }

  performSearch(searchTerm) {
    console.log("Perform search using movieDB")
    const urlString = "https://api.themoviedb.org/3/search/movie?&api_key=7667fb1d96543402a4a8659ca126c643&query=" +searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched successfully!")
        // console.log(searchResults)
        const results = searchResults.results
        // console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          // console.log(movie.poster_src)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch.")
      }
    })
  }

  searchChangeHandler(e) {
    console.log(e.target.value)
    const boundObject = this
    const searchTerm = e.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td><img width="50" src="moviedb-logo.svg" alt="Movie DB Logo"/></td>
              <td width="8"></td>
              <td><h1>MoviesDB Search</h1></td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: '99%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} type="text" placeholder="Enter search term..."/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;
