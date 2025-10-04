import { useState } from "react";

import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";

const CreatePage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) {
			toast.error("Please fill in all fields");
		}
		setLoading(true);
		try {
			await api.post("/notes", { title, content });
			toast.success("Note created successfully");
			navigate("/");
		} catch (error) {
			toast.error("Error creating note:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<Link to={"/"} className="btn btn-ghost mb-6">
						<ArrowLeftIcon className="size-5" /> Back
					</Link>
					<div className="card bg-base-100 shadow-md">
						<div className="card-body">
							<h2 className="card-title">Create New Note</h2>
							<form onSubmit={handleSubmit}>
								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text">Title</span>
									</label>
									<input
										type="text"
										placeholder="Note Title"
										className="input input-bordered w-full"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</div>
								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text">Content</span>
									</label>
									<textarea
										className="textarea textarea-bordered w-full h-40"
										placeholder="Note Content"
										value={content}
										onChange={(e) => setContent(e.target.value)}
										required
									></textarea>
								</div>
								<div className="card-actions justify-end">
									<button
										type="submit"
										className="btn btn-primary"
										disabled={loading}
									>
										{loading ? "Creating..." : "Create Note"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;
