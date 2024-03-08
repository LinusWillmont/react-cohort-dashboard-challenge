import { useParams } from "react-router-dom";
import { getRequest, putRequest } from "../../utilites/apiRequests";
import { useEffect, useState } from "react";

export const EditCommentPage = () => {
  const [comment, setComment] = useState(null);
  const [formData, setFormData] = useState(null);
  const [successfullSubmit, setSuccesfullSubmit] = useState(false);
  const { postId, commentId } = useParams();

  useEffect(() => {
    getRequest(`/post/${postId}/comment`).then((comments) => {
      const comment = comments.find(
        (comment) => comment.id.toString() === commentId.toString()
      );

      setComment({ ...comment });
      setFormData({ ...comment });
    });
  }, [postId, commentId]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setSuccesfullSubmit(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    putRequest(`/post/${postId}/comment/${commentId}`, formData).then(
      setSuccesfullSubmit(true)
    );
  };

  return !comment ? (
    <p>Loading comment</p>
  ) : (
    <div className="bg-bodyBackground p-6 w-full">
      <div className="bg-white rounded-lg p-5 pb-10">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <textarea
            className="bg-bodyBackground rounded-lg p-3 resize-none"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInput}
          />
          <button
            onClick={handleSubmit}
            disabled={successfullSubmit}
            className={
              successfullSubmit
                ? "bg-gray text-white hover:cursor-default p-3 rounded-lg"
                : "bg-main text-white p-3 rounded-lg hover:bg-hover"
            }
          >
            {successfullSubmit ? "Saved !" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};
