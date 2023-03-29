import React, { useContext, useEffect, useState } from "react";
import MomentForm from "./MomentForm";
import Moment from "./Moment";
import { UserContext } from "../context/UserProvider";

export default function MomentList(){
    // Pull in context
    const { 
        getAllMoments, 
        allMoments, 
        deleteMoment, 
        deleteComment,
        likeMoment,
        likeComment 
    } = useContext(UserContext);

    // state to toggle showing moment form
    const [showMomentForm, setShowMomentForm] = useState(false);

    // function for button to show the moment form
    function toggleMomentForm(){
        setShowMomentForm(prev => !prev)
    };

    // render all moments
    useEffect(() => {
        getAllMoments()
    }, [getAllMoments]);

    // delete moment using the moment Id
    function handleDeleteMoment(momentId){
        deleteMoment(momentId)
    };

    // function to like or unlike a moment
   function handleLikeMoment(momentId){
        likeMoment(momentId)
   };

   // function to like or unlike comment
   function handleLikeComment(commentId){
        likeComment(commentId)
   }

    
    // Function to delete comment
    function handleDeleteComment(commentId){
        deleteComment(commentId)
    };


    return (
        <div className="moment--list">
            <h1 className="moment--list--header">Below is a list of great sports moments that has been compiled by users.</h1>
            { !showMomentForm && (
                <button className="toggle--moment--form" onClick={() => toggleMomentForm()}>
                    Click here to add a moment
                </button>
            )}
            { showMomentForm && <MomentForm toggleMomentForm={setShowMomentForm} />}
            <h1 className="moments--h1">Moments</h1>
            { allMoments.map(moment => (
                <Moment 
                    {...moment}
                    key={moment._id}
                    handleDeleteMoment={handleDeleteMoment}
                    handleDeleteComment={handleDeleteComment}
                    handleLikeMoment={handleLikeMoment}
                    handleLikeComment={handleLikeComment}
                />
            ))}
        </div>
    )
}

