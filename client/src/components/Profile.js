import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import LeagueList from "./LeagueList";


export default function Profile(){

    const navigate = useNavigate();

    const {
        user: {
            firstName,
            lastName,
            username,
            email,
            birthday,
            phoneNumber,
            memberSince
        },
        logout,
        addFavoriteLeagues,
        addFavoriteTeams,
        getFavoriteLeagues,
        userFavoriteLeagues,
        getFavoriteTeams,
        userFavoriteTeams
    } = useContext(UserContext);

    useEffect(() => {
        getFavoriteLeagues()
    }, [getFavoriteLeagues]);

    useEffect(() => {
        getFavoriteTeams()
    }, [getFavoriteTeams]);

    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const utcDate = new Date(date.toUTCString());
        return utcDate.toISOString().slice(0, 10);
    };

    return (
        <div className="profile--container">
            <h1>Profile</h1>
            <h3>Welcome { username }!</h3>
            <button className="navigate--profile" onClick={() => navigate("/moments")}>Go to list of greatest sports moments</button>
            <h4>Here is your information below.</h4>
            <div className="user--info">
                <p>First Name: { firstName }</p>
                <p>Last Name: { lastName }</p>
                <p>Username: { username }</p>
                <p>Email : { email }</p>
                <p>Birthday: { formatDate(birthday) }</p>
                <p>Phone Number: { phoneNumber }</p>
                <p>Joined: { formatDate(memberSince) }</p>
                <h4>Favorite Leagues</h4>
                <ul className="favorite--leagues">
                    { userFavoriteLeagues.map((league, index) => (
                        <li key={index}>
                            {league}
                        </li>
                    ))}
                </ul>
                <h4>Favorite Teams</h4>
                <ul className="favorite--teams">
                    { userFavoriteTeams.map((team, index) => (
                        <li key={index}>
                            {team}                
                        </li>
                    ))}
                </ul>
            </div>
            <LeagueList 
                addFavoriteLeagues={addFavoriteLeagues}
                addFavoriteTeams={addFavoriteTeams} 
            />
            <button className="logout--btn--profile" onClick={ logout }>Logout</button>
        </div>
    )
}

