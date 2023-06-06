import React, { createContext, useCallback, useState } from "react";
import axios from "axios";

// Create context
export const UserContext = createContext();


// Create userAxios config for requests requiring a token
const userAxios = axios.create();
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${ token }`
    return config
});

export default function UserProvider(props){
    // Set initial state of the user
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        moments: [],
        comments: [],
        favoriteLeagues: [],
        favoriteTeams: [],
        errMsg: "",
    };

    const [userState, setUserState] = useState(initState);

    // State for getting all moments
    const [allMoments, setAllMoments] = useState([]);

    // State for users favorite leagues
    const [userFavoriteLeagues, setUserFavoriteLeagues] = useState([]);

    // state for users favorite teams
    const [userFavoriteTeams, setUserFavoriteTeams] = useState([]);

    // create a sign up function
    function signup(credentials){
        userAxios.post("/auth/signup", credentials)
        .then(res => {
            const { user, token } = res.data;
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthError(err.response.data.errMsg))
    };

    // create a login function
    function login(credentials){
        userAxios.post("/auth/login", credentials)
        .then(res => {
            const { user, token } = res.data;
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthError(err.response.data.errMsg))
    };

    // create a logout function
    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            moments: [],
            comments: [],
            favoriteLeagues: [],
            favoriteTeams: [],
            errMsg: ""
        })
    };

    // Function to notify user of auth error
    function handleAuthError(errMsg){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    };

    // function to reset the error message to nothing
    function resetAuthError(){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ""
        }))
    };

    // User setting favorite leagues
    function addFavoriteLeagues(leagueNames) {
        userAxios.post("/api/favorites/leagues", { favoriteLeagues: leagueNames })
        .then(res => {
            const updatedUser = res.data
            setUserState(prevUserState => ({
                ...prevUserState,
                favoriteLeagues: updatedUser.favoriteLeagues
            }))
            getFavoriteLeagues()
        })
        .catch(err => console.log(err.response.data.errMsg));
    };

    // Get favorite leagues
    const getFavoriteLeagues = useCallback(() => {
        userAxios.get("/api/favorites/leagues")
        .then(res => {
            setUserFavoriteLeagues(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
    }, []);

    // User setting favorite teams
    function addFavoriteTeams(teamNames){
        userAxios.post("/api/favorites/teams", { favoriteTeams: teamNames })
        .then(res => {
            const updatedUser = res.data
            setUserState(prevUserState => ({
                ...prevUserState,
                favoriteTeams: updatedUser.favoriteTeams
            }))
            getFavoriteTeams()
        })
        .catch(err => console.log(err.response.data.errMsg))
    };

    // Get user favorite teams
    const getFavoriteTeams = useCallback(() => {
        userAxios.get("/api/favorites/teams")
        .then(res => {
            setUserFavoriteTeams(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
    }, []);

    // User adding a moment
    function addMoment(newMoment){
        userAxios.post("/api/moments", newMoment)
        .then(res => {
            setUserState(prevUserState => ({
                ...prevUserState,
                moments: [...prevUserState.moments, res.data]
            }))
            getAllMoments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    };

    // User liking/unliking a moment
    function likeMoment(momentId){
        userAxios.post(`/api/moments/${momentId}/like`)
        .then(res => {
            const updatedMoment = res.data;
            setUserState(prevUserState => ({
                ...prevUserState,
                moments: prevUserState.moments.map(moment => moment._id === updatedMoment._id ? updatedMoment : moment)
            }))
            getAllMoments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    };

    // User deleting a moment
    function deleteMoment(momentId){
        userAxios.delete(`/api/moments/${momentId}`)
        .then(() => {
            setUserState(prevUserState => ({
                ...prevUserState,
                moments: prevUserState.moments.filter(moment => moment._id !== momentId)
            }))
            getAllMoments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    };

    // Edit moment
    function editMoment(momentId, updatedMoment){
        userAxios.put(`/api/moments/${momentId}`, updatedMoment)
        .then(res => {
            setUserState(prevUserState => ({
                ...prevUserState,
                moments: prevUserState.moments.map(moment => {
                    if(momentId === moment._id){
                        return res.data
                    } else {
                        return moment
                    }
                })
            }))
            getAllMoments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    };

    // Get all moments
    const getAllMoments = useCallback(() => {
        userAxios.get("/api/moments")
        .then(res => {
            setAllMoments(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
    }, []);

    // Add a comment
    function addComment(momentId, newComment){
        userAxios.post(`/api/comments/${momentId}`, newComment)
        .then(res => {
            setUserState(prevUserState => ({
                ...prevUserState,
                comments: [...prevUserState.comments, res.data]
            }))
            getAllMoments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    };

    // User liking/unliking a comment
    function likeComment(commentId){
        userAxios.post(`/api/comments/${commentId}/like`)
        .then(res => {
            const updatedComment = res.data;
            setUserState(prevUserState => ({
                ...prevUserState,
                comments: prevUserState.comments.map(comment => comment._id === updatedComment._id ? updatedComment : comment)
            }))
            getAllMoments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    };

    // Delete a comment
    function deleteComment(commentId){
        userAxios.delete(`/api/comments/${commentId}`)
        .then(() => {
            setUserState(prevUserState => ({
                ...prevUserState,
                comments: prevUserState.comments.filter(comment => commentId !== comment._id)
            }))
            getAllMoments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    };

    // Edit comment
    function editComment(commentId, updatedComment){
        userAxios.put(`/api/comments/${commentId}`, updatedComment)
        .then(res => {
            setUserState(prevUserState => ({
                ...prevUserState,
                commentes: prevUserState.comments.map(comment => {
                    if(comment._id === commentId){
                        return res.data
                    } else {
                        return comment
                    }
                })
            }))
            getAllMoments()
        })
        .catch(err => console.log(err.response.data.errMsg))
    };
    
    return (
        <UserContext.Provider value={{
            ...userState,
            signup,
            login,
            logout,
            resetAuthError,
            addFavoriteLeagues,
            addFavoriteTeams,
            addMoment,
            getAllMoments,
            allMoments,
            addComment,
            deleteMoment,
            editMoment,
            deleteComment,
            editComment,
            likeMoment,
            likeComment,
            getFavoriteLeagues,
            userFavoriteLeagues,
            getFavoriteTeams,
            userFavoriteTeams
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

