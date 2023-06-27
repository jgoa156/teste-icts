import React from "react";

// Custom
import {
	Video
} from "./styles";

export default function BackgroundVideo() {
	return (
		<Video autoPlay={true} muted={true} loop={true}>
			<source src={`${process.env.img}/bg.mp4`} type="video/mp4" />
			Seu navegador não suporta vídeos HTML5.
		</Video>
	);
}