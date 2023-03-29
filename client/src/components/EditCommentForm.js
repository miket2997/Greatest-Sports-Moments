import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

export default function EditCommentForm(props){
    const { text, _id, setIsEditingComment, handleEditComment } = props;
    
    const { editComment } = useContext(UserContext);
    
    const [editCommentInput, setEditCommentInput] = useState({ text: text });

    function handleChange(event){
        const { name, value } = event.target;
        setEditCommentInput(prevInput => ({
            ...prevInput,
            [name]: value
        }))
    };

    function handleSubmitCommentEdit(event){
        event.preventDefault()
        editComment(_id, editCommentInput)
        setIsEditingComment(false)
    }

    return (
        <form className="edit--comment--form" onSubmit={handleSubmitCommentEdit}>
            <label>Edit your comment below</label>
            <textarea
                name="text"
                value={editCommentInput.text}
                onChange={handleChange} 
            />
            <button className="submit--edit--comment">Submit edit</button>
            <button type="button" onClick={() => handleEditComment(_id)} className="cancel--comment--edit">Cancel</button>
        </form>
    )
}

