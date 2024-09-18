import { useState, useEffect } from "react";
import Swal from "sweetalert2";


function CommentForm() {
  const [comment, setComments] = useState([]);
  const public_id = localStorage.getItem("public_id");

  useEffect(() => {
    fetch("http://127.0.0.1:5555/comments")
    .then((response) => response.json())
    .then((data) => {
      console.log("Profile data:", data); // Add this for debugging
      setComments(data);
    }).catch((error) => console.error("Error fetching user profile:", error));

  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5555/comments/${public_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: comment, public_id: public_id, post_id: 1 }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Comment posted:', data);
        Swal.fire({icon: "success",text: "Comment posted successfully!"});
        setComments("");
      })
      .catch(error => console.error('Error posting comment:', error));
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container w-3/4 h-1/2">
        <form
          action="#"
          className="space-y-24"
          onSubmit={(e) => handleCommentSubmit(e)}
        >
          <div className="font-[24px] flex justify-center items-center">
            <div>Write a Comment Here</div>
          </div>
          <div>
            <input
              type="text"
              name="comment"
              placeholder="Add a Comment"
              // value=
              className="font-[20px] border-2 rounded-[8px] tracking-wide w-full py-8 px-20"
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button className="commentbtn">Submit</button>
          </div>
        </form>
    </div></div>
  );
}

export default CommentForm;
