import React from 'react';
import { useEffect, useRef } from 'react';
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";


const Picture = ({ image }) => {

    const { url } = image;
    const imgRef = useRef();
    const canvasRef = useRef();

    const handleImage = async () => {
        const detections = await faceapi
            .detectAllFaces(
                imgRef.current,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions();

        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
        faceapi.matchDimensions(canvasRef.current, {
            width: 640,
            height: 900,
        });

        const resized = faceapi.resizeResults(detections, {
            width: 640,
            height: 900,
        });

        //faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
        faceapi.draw.drawDetections(canvasRef.current, resized)
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
    };

    useEffect(() => {
        const loadModels = () => {

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
            ])
                .then(handleImage)
                .catch((e) => console.log(e));
        };

        imgRef.current && loadModels();
    }, []);


    let navigate = useNavigate();
    const routeChange = () => {
        let path = `https://imotions.com/blog/learning/best-practice/facial-expression-analysis/`;
        navigate(path);
    }

    return (
        <div className='pic'>
            <div className="left" >
                <img ref={imgRef} crossOrigin="anonymous" src={url} width="650" height="900" alt="" />
                <canvas ref={canvasRef} width="650" height="900" />
            </div>
                <div className="right">
                    <h1>Want to know more about Face Expressions ?</h1>
                    <div className='btns'>
                        <button id="yes" onClick={routeChange}>Yes🤝</button>
                        <button id="no">...</button>
                    </div>
                </div>
            
        </div>
    );
}

export default Picture;


