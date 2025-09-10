import { useState, useRef, useEffect } from "react";
import styles from "./MoodSongs.module.css";

const MoodSongs = ({ Songs }) => {
    const [isPlayingIndex, setIsPlayingIndex] = useState(null);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = "";
        }
        setIsPlayingIndex(null);
        setProgress(0);
    }, [Songs]);

    // Track progress
    useEffect(() => {
        let interval;
        if (isPlayingIndex !== null) {
            interval = setInterval(() => {
                const audio = audioRef.current;
                if (audio && audio.duration) {
                    setProgress(audio.currentTime / audio.duration);
                }
            }, 300);
        }
        return () => clearInterval(interval);
    }, [isPlayingIndex]);

    const handlePlayPause = (index) => {
        const selectedSong = Songs[index];
        if (!audioRef.current || !selectedSong?.audio) return;

        if (isPlayingIndex === index) {
            audioRef.current.pause();
            setIsPlayingIndex(null);
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = selectedSong.audio;
            audioRef.current.play().catch((error) => {
                console.warn("Audio play failed:", error);
            });
            setIsPlayingIndex(index);
            setProgress(0);
        }
    };

    return (
        <div className={styles.moodSongs}>
            <h1 className={styles.songHead}>Recommended Songs</h1>
            <div className={styles.songList}>
                {Array.isArray(Songs) && Songs.length > 0 ? (
                    Songs.map((song, index) => (
                        <div
                            key={index}
                            className={`${styles.songBar} ${isPlayingIndex === index ? styles.playing : ""}`}
                            style={{
                                '--progress': isPlayingIndex === index ? progress : 0
                            }}
                        >
                            <div className={styles.title}>
                                <p className={styles.songTitle}>{song.title}</p>
                                <p className={styles.songArtist}>{song.artist}</p>
                            </div>
                            <div>
                                <button
                                    className={styles["play-pause-btn"]}
                                    onClick={() => handlePlayPause(index)}
                                    aria-label={isPlayingIndex === index ? "Pause song" : "Play song"}
                                >
                                    {isPlayingIndex === index ? (
                                        <i className="ri-pause-circle-fill icon"></i>
                                    ) : (
                                        <i className="ri-play-circle-fill icon"></i>
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
                onEnded={() => {
                    setIsPlayingIndex(null);
                    setProgress(0);
                }}
                preload="metadata"
            />
        </div>
    );
};

export default MoodSongs;
