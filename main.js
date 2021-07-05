const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = (user) => {
	if (user) {
		loggedInLinks.forEach((item) => (item.style.display = "block"));
		loggedOutLinks.forEach((item) => (item.style.display = "none"));
	} else {
		loggedInLinks.forEach((item) => (item.style.display = "none"));
		loggedOutLinks.forEach((item) => (item.style.display = "block"));
	}
};

//setup materialize
document.addEventListener("DOMContentLoaded", function () {
	let modals = document.querySelectorAll(".modal");
	M.Modal.init(modals);
});
