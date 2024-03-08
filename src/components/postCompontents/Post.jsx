import { Link, useNavigate } from "react-router-dom";
import { ProfileIcon } from "../General/ProfileIcon";
import { PropTypes } from "prop-types";
import { deleteRequest, getRequest } from "../../utilites/apiRequests";
import { useEffect, useState } from "react";
import { CommentsList } from "./CommentsList";

export const Post = ({ post, handleDeletePost }) => {
	const [postOwner, setPostOwner] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		getRequest(`/contact/${post.contactId}`)
			.then((postOwner) => {
				setPostOwner(postOwner);
			})
			.catch((error) => console.error("Failed to get post owner", error));
	}, [post.contactId]);

	const deletePost = () => {
		deleteRequest(`/post/${post.id}`).then(() => handleDeletePost());
	};

	const handleEditPost = () => {
		navigate(`/posts/${post.id}/edit`);
	};

	if (!postOwner) {
		return (
			<>
				<p>Loading posts</p>
			</>
		);
	} else {
		return (
			<div className="bg-white rounded-xl p-6 flex gap-5 flex-col">
				<div className="flex flex-col gap-5 border-b-2 border-bodyBackground">
					<div className="flex gap-5">
						<ProfileIcon user={postOwner} />
						<div className="flex flex-col justify-center">
							<h2 className="text-xl font-medium text">{`${postOwner.firstName} ${postOwner.lastName}`}</h2>
							<Link className="text-grey" to={`../posts/${post.id}`}>{post.title}</Link>
						</div>
						<div className="ml-auto">
							<button className="bg-main  text-white rounded-lg px-6 py-2" onClick={handleEditPost}>Edit</button>
							<button className="bg-main  text-white rounded-lg px-6 py-2 ml-1" onClick={deletePost}>Delete</button>
						</div>
					</div>
					<p className="mb-5">{post.content}</p>
				</div>
				<CommentsList postId={post.id} />
			</div>
		);
	}
};

Post.propTypes = {
	post: PropTypes.object,
	handleDeletePost: PropTypes.func,
};
