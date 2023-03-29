import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function NbaTeamList(props){
    const { customStyles, addFavoriteTeams } = props;
    const [nbaTeams, setNbaTeams] = useState([]);
    const [selectedNbaTeams, setSelectedNbaTeams] = useState([]);

    function handleNbaTeamChange(selectedOptions){
        setSelectedNbaTeams(selectedOptions)
    };

    function getNbaTeams(){
        axios.get("https://www.balldontlie.io/api/v1/teams")
        .then(res => {
            const options = res.data.data.map(team => ({
                value: team.id,
                label: team.full_name
            }))
            setNbaTeams(options)
        })
        .catch(err => console.log(err))
    };

    function handleSubmit(event){
        event.preventDefault()
        const selectedTeamNames = selectedNbaTeams.map(team => team.label)
        addFavoriteTeams(selectedTeamNames)
    }

    useEffect(() => {
        getNbaTeams()
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <label>NBA Teams</label>
            <Select 
                isMulti
                options={nbaTeams}
                styles={customStyles}
                onChange={handleNbaTeamChange}
                value={selectedNbaTeams}
            />
            <button>Submit NBA teams</button>
        </form>
    )

}