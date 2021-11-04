import {
	collection,
	getDocs,
	where,
	addDoc,
	updateDoc,
	doc,
	deleteDoc,
} from "firebase/firestore/lite";

import db from "../config/index.js";
import User from "../models/user.js";

const usersCol = collection(db, "users");

async function getAll(req, res) {
	const userSnapshot = await getDocs(usersCol);
	const userList = userSnapshot.docs.map((doc) => {
		const data = doc.data();
		return new User({
			id: doc.id,
			email: data.email,
			name: data.name,
			password: data.password,
		});
	});

	res.json(userList);
}

async function getById(req, res) {
	const { id } = req.params;
	const userSnapshot = await getDocs(usersCol, where("id", "==", id));

	const foundUser = userSnapshot.docs[0].data();

	res.json(foundUser);
}

async function create(req, res) {
	const { body } = req;
	const docRef = await addDoc(usersCol, { ...body });
	console.log(docRef);

	res.status(201).json({ id: docRef.id });
}

async function getByIdAndUpdate(req, res) {
	const { id } = req.params;
	const { body } = req;
	const { name, email, password } = body;

	const userRef = doc(db, "users", id);

	await updateDoc(userRef, {
		name,
		email,
		password,
	});

	res.end();
}

async function getByIdAndDelete(req, res) {
	const { id } = req.params;

	await deleteDoc(doc(db, "users", id));

	res.end();
}

export default {
	getAll,
	getById,
	create,
	getByIdAndDelete,
	getByIdAndUpdate,
};
