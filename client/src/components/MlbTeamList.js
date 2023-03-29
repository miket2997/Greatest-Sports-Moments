import React, { useEffect, useState} from "react";
import Select from "react-select";
import axios from "axios";


export default function MlbTeamList(props){
    const [mlbTeams, setMlbTeams] = useState([]);
    const [selectedMlbTeams, setSelectedMlbTeams] = useState([]);
    const { customStyles, addFavoriteTeams } = props;

    function handleMlbTeamChange(selectedOptions){
        setSelectedMlbTeams(selectedOptions)
    };

    function getMlbTeams(){
        axios.get("http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2017'")
        .then(res => {
            const options = res.data.team_all_season.queryResults.row.map(team => ({
                value: team.team_id,
                label: team.name_display_full
            }))
            setMlbTeams(options);
        })
        .catch(err => console.log(err))
    };

    function handleSubmit(event){
        event.preventDefault()
        const selectedTeamNames = selectedMlbTeams.map(team => team.label)
        addFavoriteTeams(selectedTeamNames)
    }


    useEffect(() => {
        getMlbTeams()
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <label>MLB Teams</label>
            <Select
                options={mlbTeams}
                isMulti
                styles={customStyles}
                value={selectedMlbTeams}
                onChange={handleMlbTeamChange}
            />
            <button>Submit MLB teams</button>
        </form>
    )
}

