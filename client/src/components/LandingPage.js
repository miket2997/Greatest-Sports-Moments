import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage(){
    
    const navigate = useNavigate()

    return (
        <div className="landing--page">
            <h1>Greatest Sports Moments</h1>
            <p>Are you a sports fan? If the answer is yes, then this is your go-to app for watching your favorite sports moments. You will be 
                able to add your own favorite moments with links to videos and share them to a growing list compiled by all users. You will be able
                to watch the videos of other users and leave comments to interact with other users. You can also set your favorite leagues and your
                favorite teams, and view information about them.
            </p>
            <br />
            <button onClick={() => navigate("/moments")}>See list of greatest moments</button>
            <br />
            <div className="photo--container">
                <img src="https://i.insider.com/5a789321dd484a2c008b51af?width=700" alt="" />
                <img alt="" src="https://media.phillyvoice.com/media/images/sipa_12802508.947cbd15.fill-735x490.jpg" />
                <img src="https://img.bleacherreport.net/img/images/photos/001/950/675/hi-res-83485953_crop_exact.jpg?w=3072&h=2048&q=75" alt="" />
                <img src="https://i.ytimg.com/vi/I_mPj-00js4/hqdefault.jpg" alt="" />
                <img src="https://www.nbcsports.com/sites/rsnunited/files/archive/assets_media_gallery/philadelphia/2019/07/10/top10-hm.jpg" alt="" />
                <img src="https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w372/mlb/wby0kbj9zzbq7zg9lpuh" alt="" />
            </div>
        </div>
    )
}