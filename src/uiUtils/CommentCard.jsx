import React from "react";
import deleteIcon from "../assets/delete.png";
import { auth, db } from "../config/firebase";
import { useFirebaseContext } from "../contexts/FirebaaseContext";
import { updateDoc, doc } from "firebase/firestore";
function CommentCard({ comment, id, photo, blogId }) {
  const { blogs } = useFirebaseContext();
  const deleteComment = async (target) => {
    const thisBlog = blogs.filter((blog) => blog.id === blogId);
    const thisBlogComments = thisBlog[0].comments;
    // console.log(target);
    const updatedComments = thisBlogComments.filter(
      (c) => c.comment !== target
    );
    const docRef = doc(db, "blogs", blogId);
    await updateDoc(docRef, { comments: updatedComments })
      .then(() => {
        alert("comment deleted successfully");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  return (
    <div className="flex  mx-2 justify-between items-end">
      <div className="flex items-center gap-x-2 font-sans text-lg">
        <img src={photo} alt={id} className="rounded-full w-10" />
        <div className="flex flex-col ">
          <h1>{id}</h1>
          <p className="font-normal">{comment}</p>
        </div>
      </div>
      {id == auth?.currentUser?.email.split("@")[0] ? (
        <img
          src={deleteIcon}
          alt="delete"
          className="w-10 h-10"
          onClick={(e) => {
            deleteComment(
              e.target.parentNode.children[0].children[1].children[1].innerHTML
            );
          }}
        />
      ) : null}
    </div>
  );
}

export default CommentCard;
