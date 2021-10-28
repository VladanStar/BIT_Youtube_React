import React from "react";

import "./Search.css";

export default class Search extends React.Component {
    constructor(props) {
        super(props);

		this.state = {
			searchedVideo: ""
        };
        
        this.bindInit();
    }

    bindInit() {
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

	handleChange(event) {
		this.setState({
            searchedVideo: event.target.value
        });
	}

	handleEnter(event) {
		if (event.key === 'Enter') {
			this.props.sendSearchedVideo(this.state.searchedVideo);
		}
	}

    render() {
        return (
            <div className="col-12">
                <div className="row">
                    <input value={this.state.searchedVideo} onKeyPress={this.handleEnter} onChange={this.handleChange} placeholder="Search" className="offset-2 col-6 Search_input" />
                    <button onClick={() => this.props.sendSearchedVideo(this.state.searchedVideo)} className="col-2 btn Search_button">Search</button>
                </div>
            </div>
        );
    }
}