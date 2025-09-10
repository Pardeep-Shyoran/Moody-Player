import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import styles from './FaceExpressionDetector.module.css';
import axios from 'axios';

const FaceExpressionDetector = ({ setSongs }) => {
    const webcamRef = useRef(null);
    const [dominantExpression, setDominantExpression] = useState('');
    const [modelsLoaded, setModelsLoaded] = useState(false);

    // Load face-api.js models
    const loadModels = async () => {
        const MODEL_URL = '/models';
        try {
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
            setModelsLoaded(true);
            // console.log('Models loaded successfully');
        } catch (err) {
            console.error('Error loading models', err);
        }
    };

    useEffect(() => {
        loadModels();
    }, []);

    // Detect dominant mood/expression
    const detectMood = async () => {
        if (!modelsLoaded) {
            alert('Models are still loading, please wait.');
            return;
        }
        if (
            webcamRef.current &&
            webcamRef.current.video &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            try {
                const detections = await faceapi
                    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                    .withFaceExpressions();

                if (detections?.expressions) {
                    const expressions = detections.expressions;
                    const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
                    const [topExpression] = sorted[0];
                    setDominantExpression(topExpression);
                    // console.log('Detected mood:', topExpression);
                } else {
                    setDominantExpression('No Face Detected.');
                    // console.log('No face detected');
                }
            } catch (error) {
                console.error('Error during detection:', error);
            }
        }
    };

    // Fetch songs whenever dominantExpression changes (and is valid)
    useEffect(() => {
        if (dominantExpression && dominantExpression !== 'No Face Detected.') {
            axios
                .get(`${import.meta.env.VITE_GET_SONGS_API_URL}?mood=${dominantExpression}`)
                .then(response => {
                    // console.log('Fetched songs:', response.data);
                    setSongs(response.data.song || []); // fall back to empty array
                })
                .catch(error => {
                    console.error('Error fetching songs:', error);
                    setSongs([]); // clear songs on error
                });
        } else {
            // optionally clear songs if no valid expression
            setSongs([]);
        }
    }, [dominantExpression, setSongs]);

    return (
        <div className={styles['camera-space']}>
            <Webcam
                ref={webcamRef}
                className={styles.camera}
                audio={false}
                mirrored={true}
            />
            <div className={styles['camera-desc']}>
                <button
                    className={styles['detect-btn']}
                    onClick={detectMood}
                    disabled={!modelsLoaded}
                >
                    {modelsLoaded ? 'Detect Mood' : 'Loading...'}
                </button>
                <div className={styles['user-expression']}>{dominantExpression}</div>
            </div>
        </div>
    );
};

export default FaceExpressionDetector;
