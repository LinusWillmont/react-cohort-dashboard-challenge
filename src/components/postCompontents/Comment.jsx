import { useEffect, useState } from "react";
import { ProfileIcon } from "../General/ProfileIcon";
import PropTypes from "prop-types";
import { deleteRequest, getRequest } from "../../utilites/apiRequests";
import { useNavigate } from "react-router-dom";

export const Comment = ({ comment, handleDeleteComment }) => {
  const [commentOwner, setCommentOwner] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getRequest(`/contact/${comment.contactId}`)
      .then((commentOwner) => {
        setCommentOwner(commentOwner);
      })
      .catch((error) => console.error("Failed to get comment owner", error));
  }, [comment.contactId]);

  const deletComment = () => {
    deleteRequest(`/post/${comment.postId}/comment/${comment.id}`).then(() =>
      handleDeleteComment()
    );
  };

  const handleEditComment = () => {
    navigate(`/posts/${comment.postId}/comments/${comment.id}/edit`);
  };

  return !commentOwner ? (
    <p>loading comment owner</p>
  ) : (
    <div className="flex gap-5   w-fit">
      <ProfileIcon user={commentOwner} />
      <div className="bg-secondary rounded-lg p-2 px-5">
        <h2 className="text-xl font-medium">{`${commentOwner.firstName} ${commentOwner.lastName}`}</h2>
        <p className="mb-10">{comment.content}</p>
        <button
          className="bg-main hover:bg-hover text-white rounded-lg w-fit px-3 py-1"
          onClick={handleEditComment}
        >
          Edit
        </button>
        <button
          className="bg-main hover:bg-hover text-white rounded-lg w-fit px-3 py-1"
          onClick={deletComment}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  handleDeleteComment: PropTypes.func,
};
