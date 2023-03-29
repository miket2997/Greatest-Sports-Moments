import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

export default function CommentForm(props){

    const { momentId, handleCommentToggle, setShowCommentForm } = props;

    const { addComment } = useContext(UserContext);

    const initCommentInputs = { text: "" };
    
    const [commentInputs, setCommentInputs] = useState(initCommentInputs);

    function handleChange(event){
        const { name, value } = event.target
        setCommentInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    };

    function handleSubmit(event){
        event.preventDefault()
        addComment(momentId, commentInputs)
        setShowCommentForm(false)
    };

    const { text } = commentInputs; 

    return (
        <form className="comment--form" onSubmit={handleSubmit}>
            <label>Type your comment below</label>
            <textarea
                name="text"
                value={text}
                onChange={handleChange}
                placeholder="Type your comment here"
                style={{ resize: "none" }} 
            />
            <button className="submit--comment">Submit comment</button>
            <button className="cancel--comment" type="button" onClick={() => handleCommentToggle(momentId)}>Cancel</button>
        </form>
    )
}