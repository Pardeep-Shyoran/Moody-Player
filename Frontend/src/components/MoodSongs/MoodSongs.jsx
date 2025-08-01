import { useState, useRef, useEffect } from "react";
import styles from "./MoodSongs.module.css";

const MoodSongs = ({ Songs }) => {
    const [isPlayingIndex, setIsPlayingIndex] = useState(null);
    const audioRef = useRef(null);

    // Reset player on Songs change
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = "";
        }
        setIsPlayingIndex(null);
    }, [Songs]);

    const handlePlayPause = (index) => {
        if (!audioRef.current) return;

        if (isPlayingIndex === index) {
            audioRef.current.pause();
            setIsPlayingIndex(null);
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = Songs[index].audio;
            audioRef.current.play().catch((error) => {
                console.log("Audio play interrupted or blocked:", error);
            });
            setIsPlayingIndex(index);
        }
    };

    return (
        <div className={styles.moodSongs}>
            <h1 className={styles.songHead}>Recommended Songs</h1>
            <div className={styles.songList}>
                {Array.isArray(Songs) && Songs.length > 0 ? (
                    Songs.map((song, index) => (
                        <div key={index} className={styles.songBar}>
                            <div className="title">
                                <p>{song.title}</p>
                                <p>{song.artist}</p>
                            </div>
                            <div className="play-pose-btn">
                                <button
                                    onClick={() => handlePlayPause(index)}
                                    aria-label={isPlayingIndex === index ? "Pause song" : "Play song"}
                                >
                                    {isPlayingIndex === index ? (
                                        <i className="ri-pause-circle-fill"></i>
                                    ) : (
                                        <i className="ri-play-circle-fill"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No songs to display.</p>
                )}
            </div>

            <audio
                ref={audioRef}
                onEnded={() => setIsPlayingIndex(null)}
                preload="metadata"
            />
        </div>
    );
};

export default MoodSongs;
