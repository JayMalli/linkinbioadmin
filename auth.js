auth.onAuthStateChanged((user) => {
	if (user) {
		//get data
		setupUI(user);
	} else {
		setupUI();
	}
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	//get user info
	const email = loginForm["login-email"].value;
	const password = loginForm["login-password"].value;

	auth.signInWithEmailAndPassword(email, password).then((cred) => {
		console.log("user logged in");

		//close modal and reset form
		const modal = document.querySelector("#modal-login");
		M.Modal.getInstance(modal).close();
		loginForm.reset();
	});
});

//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
	e.preventDefault();
	auth.signOut().then(() => {
		console.log("user logged out");
	});
});

const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

//create new Post
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let file = createForm.file.files[0];
	if (file && allowedTypes.includes(file.type)) {
		// console.log(file);

		const storageRef = storage.ref(file.name);
		const collectionRef = db.collection("posts");
		storageRef.put(file).on(
			"state_change",
			(snap) => {
				let percentageUploaded =
					(snap.bytesTransferred / snap.totalBytes) * 100;
				console.log(percentageUploaded);
			},
			(err) => {
				console.log(err);
			},
			async () => {
				const url = await storageRef.getDownloadURL();
				let now = new Date();
				let createdAt = now.getTime();
				await collectionRef.add({
					url,
					createdAt,
					link: createForm.link.value,
				});
				const modal = document.querySelector("#modal-create");
				M.Modal.getInstance(modal).close();
				createForm.reset();
			}
		);
	}
});
