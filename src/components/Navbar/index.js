import React from "react";
import "./style.css";
import Logo from "./navbar_logo.png";
import Genre from "../Genre";
import Button from "react-bootstrap/Button";

// import "bootstrap/dist/css/bootstrap.css";

const search_api =
	"https://api.themoviedb.org/3/search/movie?api_key=58c9e30662728a9636cf251d1280f970&language=en-US&page=1&include_adult=false&query=";

function index({
	setPage,
	query,
	setQuery,
	setApi,
	// content,
	// setContent,
	discover_api,
	genre,
	setGenre,
}) {
	const submitHandler = (e) => {
		if (query !== "") {
			e.preventDefault();
			// if (content !== "search") {
			// 	setContent("search");
			// }
			setPage(1);
			setApi(search_api + query);
			setQuery("");
			document.getElementById("input").blur();
			formReset();
		}
	};
	const changeHandler = (e) => {
		if (e.target.value !== "") setQuery(e.target.value);
	};
	const logoClickHandler = () => {
		// setContent("home");
		setGenre("Genre");
		setApi(discover_api);
		setPage(1);
		formReset();
	};
	function formReset() {
		console.log("reset");
		document.getElementById("dropdown").reset();
	}
	return (
		<>
			<div className="navbar">
				<div className="navbar_logo">
					<img
						className="logo"
						src={Logo}
						alt="logo"
						onClick={logoClickHandler}
					/>
					<h1 className="logo_title">DEADFLIX</h1>
				</div>

				<Genre
					genre={genre}
					setGenre={setGenre}
					setApi={setApi}
					setPage={setPage}
				/>
				<Button variant="primary">Button</Button>

				<form onSubmit={submitHandler}>
					<input
						id="input"
						type="text"
						placeholder="Search Movie"
						className="search"
						onChange={changeHandler}
						value={query}
						required
					/>
				</form>
			</div>
		</>
	);
}

export default index;
