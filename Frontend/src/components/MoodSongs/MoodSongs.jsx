import { useState } from "react"
import styles from "./MoodSongs.module.css"

const MoodSongs = () => {

    const [Songs, setSongs] = useState([
        {
            title: "test_song",
            artist: "test_artist",
            url: "test_url",
        },
        {
            title: "test_song",
            artist: "test_artist",
            url: "test_url",
        },
        {
            title: "test_song",
            artist: "test_artist",
            url: "test_url",
        },
    ]);


    return (
        <div className={styles.moodSongs}>
            <h1 className={styles.songHead}>Recommended Songs</h1>
            <div className={styles.songList}>
                {Songs.map((song, index) => (
                    <div key={index} className={styles.songBar}>
                        <div className="title">
                            <p>{song.title}</p>
                            <p>{song.artist}</p>
                        </div>
                        <div className="play-pose-btn">
                            <i className="ri-pause-circle-fill"></i>
                            <i className="ri-play-circle-fill"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MoodSongs