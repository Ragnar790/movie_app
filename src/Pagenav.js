import React from "react";
import "./pagenav.css";

function Pagenav({ page, setPage }) {
	return (
		<div className="nav">
			<button
				className="nav_btn"
				onClick={() => {
					if (page !== 1) setPage(page - 1);
				}}
			>
				Previous
			</button>
			<div className="page_count">Page: {page}</div>
			<button className="nav_btn" onClick={() => setPage(page + 1)}>
				Next
			</button>
		</div>
	);
}

export default Pagenav;
