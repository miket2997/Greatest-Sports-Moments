import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

export default function EditMomentForm(props){
    const { editMoment } = useContext(UserContext);

    const { 
        title, 
        description, 
        year, 
        videoUrl, 
        handleEditMoment, 
        setIsEditingMoment, 
        momentId } = props; 

    // Make the inital edit inputs include the values that the moment already has
    const [editMomentInputs, setEditMomentInputs] = useState({
        title: title,
        description: description,
        year: year,
        videoUrl: videoUrl
    });

    // handle change of inputs
    function handleChange(event){
        const { name, value } = event.target;
        setEditMomentInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    };
    
    // Edit form submission
    function handleSubmit(event){
        event.preventDefault()
        editMoment(momentId, editMomentInputs)
        handleEditMoment()
        setIsEditingMoment(false)
    };


    return (
        <form className="edit--moment--form" onSubmit={handleSubmit}>
            <label>Edit your moment below</label>
            <br />
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={editMomentInputs.title}
                onChange={handleChange}
            />
            <label>Description</label>
            <textarea
                name="description"
                value={editMomentInputs.description}
                onChange={handleChange}
                style={{ resize: "none" }} 
            />
            <label>Year</label>
            <input
                type="text"
                name="year"
                value={editMomentInputs.year}
                onChange={handleChange}
            />
            <label>Video link</label>
            <input
                type="text"
                name="videoUrl"
                value={editMomentInputs.videoUrl}
                onChange={handleChange}
            />
            <button className="submit--edit">Submit edit</button>
            <button className="cancel--edit" type="button" onClick={() => setIsEditingMoment(false)}>Cancel</button>
        </form>
    )
}

