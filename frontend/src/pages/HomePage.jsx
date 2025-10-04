import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				console.log("Fetching notes...");
				const res = await api.get("/notes");

				setNotes(res.data);
			} catch (error) {
				console.error("Error fetching notes:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchNotes();
	}, []);
	return (
		<div className="min-h-screen">
			<Navbar />
			<div className="mx-auto max-w-7xl p-4 mt-6">
				{loading && (
					<div className="text-center text-primary py-10">Loading notes</div>
				)}

				{notes.length === 0 && <NotesNotFound />}

				{notes.length > 0 && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{notes.map((note) => (
							<NoteCard key={note._id} note={note} setNotes={setNotes} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
