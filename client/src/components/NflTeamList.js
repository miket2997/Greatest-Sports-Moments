import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function NflTeamList(props){
    const { customStyles, addFavoriteTeams } = props;
    const [nflTeams, setNflTeams] = useState([]);
    const [selectedNflTeam, setSelectedNflTeam] = useState([]);

    function handleNflTeamChange(selectedOptions){
        setSelectedNflTeam(selectedOptions)
    };

    function getNflTeams(){
        axios.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams")
        .then(res => {
            const options = res.data.sports[0].leagues[0].teams.map(team => ({
                value: team.team.id,
                label: team.team.displayName
            }))
            setNflTeams(options)
        })
        .catch(err => console.log(err))
    };

    function handleSubmit(event){
        event.preventDefault()
        const selectedTeamNames = selectedNflTeam.map(team => team.label)
        addFavoriteTeams(selectedTeamNames)
    }

    useEffect(() => {
        getNflTeams()
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <label>NFL Teams</label>
            <Select
                onChange={handleNflTeamChange}
                styles={customStyles}
                options={nflTeams}
                value={selectedNflTeam}
                isMulti 
            />
            <button>Submit NFL teams</button>
        </form>
    )
}

