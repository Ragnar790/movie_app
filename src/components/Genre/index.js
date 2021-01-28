import React from "react";
import "./style.css";

const genreApi =
	"https://api.themoviedb.org/3/discover/movie?api_key=58c9e30662728a9636cf251d1280f970&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=";

function index({ setApi, setPage, genre, setGenre }) {
	const changeGenre = (e) => {
		// console.log("genre->", e.target.value);
		setApi(genreApi + e.target.value);
		setPage(1);
	};

	return (
		<>
			<form id="dropdown">
				<select onChange={changeGenre} class="dropdown">
					<option className="options" value="28">
						Action
					</option>
					<option className="options" value="12">
						Adventure
					</option>
					<option className="options" value="16">
						Animation
					</option>
					<option className="options" value="35">
						Comedy
					</option>
					<option className="options" value="80">
						Crime
					</option>
					<option className="options" value="99">
						Documentary
					</option>
					<option className="options" value="18">
						Drama
					</option>
					<option className="options" value="10751">
						Family
					</option>
					<option className="options" value="14">
						Fantasy
					</option>
					<option className="options" value="36">
						History
					</option>
					<option className="options" value="27">
						Horror
					</option>
					<option className="options" value="10402">
						Music
					</option>
					<option className="options" value="9648">
						Mystery
					</option>
					<option className="options" value="10749">
						Romance
					</option>
					<option className="options" value="878">
						SciFi
					</option>
					<option className="options" value="10770">
						TV Movie
					</option>
					<option className="options" value="53">
						Thriller
					</option>
					<option className="options" value="10752">
						War
					</option>
					<option className="options" value="37">
						Western
					</option>
				</select>
			</form>
		</>
	);
}

export default index;
