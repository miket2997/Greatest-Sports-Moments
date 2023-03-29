import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

export default function MomentForm(props){

    const { toggleMomentForm } = props;

    const { addMoment } = useContext(UserContext);

    const initMomentInputs = {
        title: "",
        description: "",
        year: "",
        videoUrl: ""
    };

    const [momentInputs, setMomentInputs] = useState(initMomentInputs);

    function handleChange(event){
        const { name, value } = event.target;
        setMomentInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    };

    function handleSubmit(event){
        event.preventDefault()
        addMoment(momentInputs)
        setMomentInputs(initMomentInputs)
        toggleMomentForm()
    };

    const { title, description, year, videoUrl } = momentInputs;

    return (
        <form className="moment--form" onSubmit={handleSubmit}>
            <label className="moment--form--label">Fill out form below to add a moment.</label>
            <small>*Note: Some videos will not be able to be embedded due to privacy settings.</small>
            <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
                required={true} 
            />
            <textarea
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
                style={{ resize: "none" }} 
            />
            <input
                type="text"
                name="year"
                value={year}
                onChange={handleChange}
                placeholder="Year"
                required={true} 
            />
            <input
                type="text"
                name="videoUrl"
                value={videoUrl}
                onChange={handleChange}
                placeholder="Link to video"
            />
            <button className="submit--moment">Submit</button>
            <button type="button" className="cancel--moment--form" onClick={() => toggleMomentForm()}>Cancel</button>
        </form>
    )
}

