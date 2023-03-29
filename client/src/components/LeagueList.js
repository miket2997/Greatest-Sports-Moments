import React, { useState } from "react";
import Select from "react-select";
import MlbTeamList from "./MlbTeamList";
import NhlTeamList from "./NhlTeamList";
import NbaTeamList from "./NbaTeamList";
import NflTeamList from "./NflTeamList";

export default function LeagueList(props){

    const { addFavoriteLeagues, addFavoriteTeams } = props;

    const [selectedLeagues, setSelectedLeagues] = useState([]);

    const options = [
        { value: "NFL", label: "NFL" },
        { value: "MLB", label: "MLB" },
        { value: "NHL", label: "NHL" },
        { value: "NBA", label: "NBA" }
    ];

    function handleLeagueChange(selectedOptions){
        setSelectedLeagues(selectedOptions);
    };

    function handleLeagueSubmit(event){
        event.preventDefault()
        const leagueNames = selectedLeagues.map(option => option.value)
        addFavoriteLeagues(leagueNames);
    };
    
    const customStyles = {
        option: (provided) => ({
            ...provided,
            color: "black"
        }),
        select: (provided) => ({
            ...provided
        })
    };

    return (
        <div className="select--container">
            <label>Favorite leagues</label>
            <form className="league--select--form" onSubmit={handleLeagueSubmit}>
                <Select
                    options={options}
                    isMulti
                    styles={customStyles}
                    className="select"
                    onChange={handleLeagueChange}
                    value={selectedLeagues}
                    name="leagueName"
                />
                <button>Submit favorite leagues</button>
            </form>
            <h3>Favorite Teams</h3>
            <small>Select league above to see its teams.</small>
            { selectedLeagues.some(option => option.value === "MLB") && <MlbTeamList customStyles={customStyles} addFavoriteTeams={addFavoriteTeams} />}
            { selectedLeagues.some(option=> option.value === "NHL") && <NhlTeamList customStyles={customStyles} addFavoriteTeams={addFavoriteTeams} />}
            { selectedLeagues.some(option=> option.value === "NBA") && <NbaTeamList customStyles={customStyles} addFavoriteTeams={addFavoriteTeams} />}
            { selectedLeagues.some(option => option.value === "NFL") && <NflTeamList customStyles={customStyles} addFavoriteTeams={addFavoriteTeams} /> }
        </div>
    )
}
