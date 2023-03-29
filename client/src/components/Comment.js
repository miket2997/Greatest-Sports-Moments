import React, { useContext, useState } from "react";
import EditCommentForm from "./EditCommentForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../context/UserProvider";

export default function Comment(props){

    const { user } = useContext(UserContext);

    const { 
        text, 
        postedAt,
         _id,
         likes, 
         handleDeleteComment,
        handleLikeComment,
        changeDateFormat } = props;


    // state to edit only selected comment
    const [selectedCommentId, setSelectedCommentId] = useState(null); 

    // state to toggle comment edit
    const [isEditingComment, setIsEditingComment] = useState(false);

    const hasLiked = likes.includes(user._id);
   
    // Function to edit comment
    function handleEditComment(commentId){
        if(isEditingComment && selectedCommentId === commentId){
            setSelectedCommentId(null)
            setIsEditingComment(prev => !prev)
        } else {
            setSelectedCommentId(commentId)
            setIsEditingComment(true)
        }
    };


    return (
        <div className="comment--container">
            <small>Posted on {changeDateFormat(postedAt)} by: {props.user.username}</small>
            <p>{text}</p>
            <small>Likes: {likes.length}</small>
            <FontAwesomeIcon
                onClick={() => handleLikeComment(_id)}
                icon={faHeart}
                style={hasLiked ? {cursor: "pointer", color: "darkred", marginRight: "auto"} : {cursor: "pointer", color: "#f4bebe", marginRight: "auto"}}
                size="lg" 
            />
            { !isEditingComment && user._id === props.user._id && (
                <button className="edit--comment" onClick={() => handleEditComment(_id)}>
                    Edit comment
                </button>
            )}
            { !isEditingComment && user._id === props.user._id && (
                <button className="delete--comment" onClick={() => handleDeleteComment(_id)}>
                    Delete comment
                </button>
            )}
            {isEditingComment && (
                <EditCommentForm 
                    text={text}
                     _id={_id} 
                     setIsEditingComment={setIsEditingComment} 
                     handleEditComment={handleEditComment} 
                />
            )}
        </div>
    )
}

