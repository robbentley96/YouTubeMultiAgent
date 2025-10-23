import axios from 'axios';
import { Video } from '../models/Video';

export async function SearchYouTube(query: string, duration: string) {
    const response = await axios.get<Video[]>(
        `${process.env["MultiAgentYouTubeApi"]}/YouTube/Search?query=${query}&duration=${duration}`
    );
    return response.data;
}