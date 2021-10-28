import React from "react";

import "./Videos.css";

const Video = (props) => {
    return (
        <iframe
                width={props.width}
                height={props.height}
                src={`https://www.youtube.com/embed/${props.chosenVideo}`}
                frameBorder="0"
                title={`Video_${props.chosenVideo}`}
                gesture="media"
                allow="encrypted-media"
                allowFullScreen
                className="Video_iframe">
        </iframe>
    );
}

export default Video;