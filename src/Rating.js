import Star from "./star.png";
import Star2 from "./star2.png";
import React from "react";

function Rating({ rating }) {
	const stars_checked = [];
	const stars_unchecked = [];
	const upd_rating = Math.round(rating);
	for (let i = 1; i <= upd_rating; i++) {
		stars_checked.push(
			<img
				src={Star}
				alt="star"
				style={{ width: "15px", height: "15px", padding: "0px 1px" }}
			/>
		);
	}
	//FOR UNCHECKED
	for (let i = 1; i <= 10 - upd_rating; i++) {
		stars_unchecked.push(
			<img
				src={Star2}
				alt="star"
				style={{ width: "15px", height: "15px", padding: "0px 0px" }}
			/>
		);
	}
	return (
		<>
			<p>{stars_checked}</p>
			<p>{stars_unchecked}</p>
		</>
	);
}

export default Rating;
