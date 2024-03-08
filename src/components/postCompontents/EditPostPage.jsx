import { useParams } from "react-router-dom";
import { getRequest, putRequest } from "../../utilites/apiRequests";
import { useEffect, useState } from "react";

export const EditPostPage = () => {
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState(null);
  const [successfullSubmit, setSuccesfullSubmit] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    getRequest(`/post/${postId}`).then((response) => {
      setPost({ ...response });
      setFormData({ ...response });
    });
  }, [postId]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setSuccesfullSubmit(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    putRequest(`/post/${postId}`, formData).then(setSuccesfullSubmit(true));
  };

  return !post ? (
    <p>Loading post</p>
  ) : (
    <div className="bg-bodyBackground p-6 w-full">
      <div className="bg-white rounded-lg p-5 pb-10">
        <h2 className="text-xl font-medium text-main mb-15 border-b-2 border-bodyBackground w-fit">
          Edit post
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            className="p-3 bg-bodyBackground rounded-lg"
            type="text"
            id="title"
            name="title"
            placeholder={`${post.title} `}
            value={formData.title}
            onChange={handleInput}
          />

          <label htmlFor="content">Content</label>
          <textarea
            className="bg-bodyBackground rounded-lg p-3 resize-none"
            id="content"
            name="content"
            placeholder={`${post.content} `}
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
