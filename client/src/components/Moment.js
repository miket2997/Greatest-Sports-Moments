import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";
import CommentForm from "./CommentForm";
import EditMomentForm from "./EditMomentForm";
import Comment from "./Comment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../context/UserProvider";


export default function Moment(props){

    const { user } = useContext(UserContext);

    const {
        handleDeleteMoment,
        handleDeleteComment,
        handleLikeMoment,
        handleLikeComment,
        likes
    } = props;


    // state to ensure comment form only shows for selected moment
    const [selectedMomentId, setSeletedMomentId] = useState(null);

     // state to toggle showing comment form
     const [showCommentForm, setShowCommentForm] = useState(false);

    // state to toggle editing
     const [isEditingMoment, setIsEditingMoment] = useState(false);

     // function for showing the comment form of the selected moment
     function handleCommentToggle(momentId){
        if(showCommentForm && selectedMomentId === momentId){
            setSeletedMomentId(null)
            setShowCommentForm(prev => !prev)
        } else {
            setSeletedMomentId(momentId)
            setShowCommentForm(true)
        }
    };

    // change the date format
    function changeDateFormat(dateString){
        const date = new Date(dateString)
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        }
        return date.toLocaleDateString("en-US", options)
    };

    const hasLiked = likes.includes(user._id);

    // function to show edit form of selected moment
    function handleEditMoment(momentId){
        if(isEditingMoment && selectedMomentId === momentId){
            setSeletedMomentId(null)
            setIsEditingMoment(prev => !prev)
        } else {
            setSeletedMomentId(momentId)
            setIsEditingMoment(true)
        }
    };

   

    return (
        <div className="moment--container" key={props._id}>
            <h1>{ props.title }: {props.year}</h1>
            <small>Posted on: {changeDateFormat(props.postedAt)} by: { props.user.username }</small>
            <small>Likes: {props.likes.length}</small>
            <FontAwesomeIcon 
                onClick={() => handleLikeMoment(props._id)} 
                icon={faHeart} 
                style={ hasLiked ? {color: "blue", cursor: "pointer"} : {color: "lightblue", cursor:"pointer"}} size="2x" />
            <p>{props.description}</p>
            <div className="video--container">
                <ReactPlayer 
                    url={props.videoUrl}
                    controls={true}
                    className="video"
                    config={{
                        file: {
                            attributes: {
                                SameSite: "none",
                                Secure: true
                            }
                        },
                        youtube: { 
                            playerVars: { 
                                origin: window.location.origin
                            }
                        }
                    }}
                />
            </div>
            <div className="moment--btns">
                { !isEditingMoment && !showCommentForm && (
                    <button className="toggle--comment" onClick={() => handleCommentToggle(props._id)}>
                        Add comment
                    </button>)}
                { showCommentForm && selectedMomentId === props._id && (
                    <CommentForm 
                        momentId={props._id} 
                        handleCommentToggle={handleCommentToggle} 
                        setShowCommentForm={setShowCommentForm} 
                    />
                )}
                { !isEditingMoment && !showCommentForm && user._id === props.user._id && (
                    <button className="delete--moment--btn" onClick={() => handleDeleteMoment(props._id)}>
                        Delete moment
                    </button>)}
                { !isEditingMoment && !showCommentForm && user._id === props.user._id && (
                    <button className="edit--moment--btn" onClick={() => handleEditMoment(props._id)}>
                        Edit moment
                    </button>
                )} 
                { isEditingMoment && selectedMomentId === props._id && (
                    <EditMomentForm 
                        handleEditMoment={handleEditMoment} 
                        setIsEditingMoment={setIsEditingMoment}
                        title={props.title}
                        description={props.description}
                        year={props.year}
                        videoUrl={props.videoUrl}
                        momentId={props._id} 
                    />
                )}
            </div>
            <h1>Comments</h1>
            { props.comments.map(comment => (
                <Comment 
                    {...comment} 
                    key={comment._id} 
                    handleDeleteComment={handleDeleteComment}
                    handleLikeComment={handleLikeComment}
                    changeDateFormat={changeDateFormat}
                />
            ))}
        </div>
    )
}

