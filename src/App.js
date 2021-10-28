import React from "react";

import Search from "./components/Search";
import { dataService } from "./services/Services";
import Video from "./components/Videos";

import "./App.css";

export default class App extends React.Component {
	constructor() {
		super();

		this.state = {
			searchedVideo: "",
			videoHistory: [],
			isThereHistory: false,
			videos: [],
			selectedVideo: {},
			noResultsError: false
		}

		this.bindInit();
	}

	bindInit() {
		this.searchVideo = this.searchVideo.bind(this);
	}

    searchVideo(searchedVideo) {
		this.setState({
			searchedVideo,
			noResultsError: false
		});
		
		dataService.loadData(searchedVideo, (videos) => {
			if (videos[0]) {
				this.setState({
					videos,
					selectedVideo: videos[0],
					isThereHistory: true
				});
			} else {
				this.setState({
					noResultsError: true
				})
			}
		});

		if (this.state.isThereHistory) {
			this.setState({
				videoHistory: [this.state.selectedVideo, ...this.state.videoHistory]
			})
		}
	}

	render() {
		if (this.state.videos.length === 0) {
			return (
				<div className="container-fluid">
					<div className="row">
						<Search sendSearchedVideo={this.searchVideo} />
						<div className="offset-3 col-6">
							<Video chosenVideo="zDZFcDGpL4U" width="665" height="415" />
						</div>
					</div>
				</div>
			);
		}
		
		return (
			<div className="container-fluid">
				<div className="row">
						<Search sendSearchedVideo={this.searchVideo} width="665" height="415" />
						{this.state.noResultsError
							? <p className="col-12" style={{ textAlign: "center", fontStyle: "italic" }}>No results for the given term</p>
							: <div className="row">
								<div className="col-8">
								<div className="row">
									<Video className="offset-1 col-10" chosenVideo={this.state.selectedVideo.id} width="665" height="415" />
									<h4 className="offset-2 col-9 App_videoHeader">{this.state.selectedVideo.title}</h4>
									<p className="offset-2 col-9">{this.state.selectedVideo.description}</p>
										
									<h4 className="offset-2 col-9 App_videoHeader">Viewing History</h4>
									{this.state.isThereHistory
										? this.state.videoHistory.map((video, i) => {
											return <Video chosenVideo={video.id} width="565" height="315" key={i} />
											})
										: <p className="offset-3 col-6">No videos in viewing history</p>}
									</div>
								</div>
								<div className="col-4">
									<Video chosenVideo={this.state.videos[1].id} width="350" height="215" />
									<Video chosenVideo={this.state.videos[2].id} width="350" height="215" />
									<Video chosenVideo={this.state.videos[3].id} width="350" height="215" />
									<Video chosenVideo={this.state.videos[4].id} width="350" height="215" />
								</div>
							  </div>
						}
				</div>
			</div>
		);
	}
}
