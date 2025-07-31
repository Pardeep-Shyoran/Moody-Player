import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import styles from './FaceExpressionDetector.module.css'

const FaceExpressionDetector = () => {
    const webcamRef = useRef(null);
    const [dominantExpression, setDominantExpression] = useState('');

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };


    async function detectMood() {

        if (
            webcamRef.current &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const detections = await faceapi
                .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            if (detections?.expressions) {
                const expressions = detections.expressions;
                const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
                const [dominantExpression] = sorted[0];
                setDominantExpression(dominantExpression);
                // console.log(dominantExpression);
            } else {
                setDominantExpression("No Face Detected.");
                // console.log("Face not Detected");
            }
        }

    }

    useEffect(() => {
        const init = async () => {
            await loadModels();
            return () => clearInterval(interval);
        };

        init();
    }, []);

    return (
        <div className={styles["camera-space"]}>
            <Webcam
                ref={webcamRef}
                className={styles.camera}
                audio={false}
            />
            <div className={styles["camera-desc"]}>
            <button className={styles["detect-btn"]} onClick={detectMood}>Detect Mood</button>
            <div className={styles["user-expression"]}>{dominantExpression}</div>
            </div>
        </div>
    );
};

export default FaceExpressionDetector;
