import React from "react";
import "./movie.css";
import Rating from "./Rating";

function Movie({ poster_path, title, rating, overview, year, genres }) {
	const img_url = "https://image.tmdb.org/t/p/w300";
	// console.log(img_url + poster_path);
	const setcolor = (rating) => {
		if (rating >= 7.5) {
			return "green";
		} else if (rating >= 6) {
			return "orange";
		} else {
			return "red";
		}
	};
	function getGenres(ids) {
		let genreString = " ";
		ids.forEach((id) => {
			if (id === 28) genreString += "Action ";
			else if (id === 37) genreString += "Western ";
			else if (id === 12) genreString += "Adventure ";
			else if (id === 16) genreString += "Animation ";
			else if (id === 35) genreString += "Comedy ";
			else if (id === 80) genreString += "Crime ";
			else if (id === 99) genreString += "Documentary ";
			else if (id === 18) genreString += "Drama ";
			else if (id === 10751) genreString += "Family ";
			else if (id === 14) genreString += "Fantasy ";
			else if (id === 36) genreString += "History ";
			else if (id === 27) genreString += "Horror ";
			else if (id === 10402) genreString += "Music ";
			else if (id === 9648) genreString += "Mystery ";
			else if (id === 10749) genreString += "Romance ";
			else if (id === 878) genreString += "SciFi ";
			else if (id === 10770) genreString += "TV Movie ";
			else if (id === 53) genreString += "Thriller ";
			else if (id === 10752) genreString += "War ";
		});
		return genreString;
	}
	return (
		<div>
			<div className="img">
				<img
					className="movie_img"
					src={
						poster_path
							? img_url + poster_path
							: "https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFoundReverse.jpg"
					}
					alt="poster"
				/>
			</div>

			<div className="card_details">
				{/* TITLE */}
				<div className="title">{title}</div>
				{/* <div className="title">{year}</div> */}
				{/* RATING */}
				<div className="rating">
					<Rating rating={rating} />
					<div className={`rating_text ${setcolor(rating)}`}>{rating}</div>
				</div>
			</div>
			<div className="overview">
				<p>
					<span>Relese Year: </span>
					{year} <br />
					<span class="genres">{getGenres(genres)}</span>
				</p>
				{overview}
			</div>
		</div>
	);
}

export default Movie;
