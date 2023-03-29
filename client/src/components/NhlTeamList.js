import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";


export default function NhlTeamList(props){
    const { customStyles, addFavoriteTeams } = props; 
    const [nhlTeams, setNhlTeams] = useState([]);
    const [selectedNhlTeams, setSelectedNhlTeams] = useState([]);

    function handleNhlTeamChange(selectedOptions){
        setSelectedNhlTeams(selectedOptions)
    };

    function getNhlTeams(){
        axios.get("https://statsapi.web.nhl.com/api/v1/teams")
        .then(res => {
            const options = res.data.teams.map(team => ({
                value: team.id,
                label: team.name
            }))
            setNhlTeams(options)
        })
        .catch(err => console.log(err))
    };

    function handleSubmit(event){
        event.preventDefault()
        const selectedTeamNames = selectedNhlTeams.map(team => team.label)
        addFavoriteTeams(selectedTeamNames)
    }

    useEffect(() => {
        getNhlTeams()
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <label>NHL Teams</label>
            <Select
                isMulti
                options={nhlTeams}
                styles={customStyles}
                onChange={handleNhlTeamChange}
                value={selectedNhlTeams}
            />
            <button>Submit NHL teams</button>
        </form>
    )

}