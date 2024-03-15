import { useRef, useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from "firebase/database";
import classNames from 'classnames/bind';
import chatRooomStyles from './Whiteboard.module.css';
import app from '../../../firebase/base.js'

let cx = classNames.bind(chatRooomStyles);

export const Whiteboard = ({ id }) => {
    const [canvasData, setCanvasData] = useState(null);
    const canvasRef = useRef(null);

    const db = getDatabase(app);
    const widthOfCanvas = 896;
    const heightOfCanvas = 596;

    // Handles the updates from firebase
    useEffect(() => {
        const db = getDatabase(app);

        onValue(ref(db, 'whiteboards/' + id), async (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                // Update canvas with data from Firebase
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');

                // Fill Window Width and Height
                canvas.width = widthOfCanvas;
                canvas.height = heightOfCanvas;

                const img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, 0, 0);
                };
                if (data.whiteboard.data) {
                    img.src = data.whiteboard.data;
                }
            }
        });
    }, [id]);

    function createBaseImageData(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#ffffff'; // White color
        ctx.fillRect(0, 0, width, height);

        const base64ImageData = canvas.toDataURL("image/png");

        return base64ImageData;
    }

    const clearWhiteboard = () => {
        // Creates image data of "clean" whiteboard
        const base64ImageData = createBaseImageData(widthOfCanvas, heightOfCanvas);
        set(ref(db, 'whiteboards/' + id),
            {
                whiteboard: { data: base64ImageData }
            });
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // TODO: Warning hardcoded values
        // Fill Window Width and Height
        canvas.width = widthOfCanvas;
        canvas.height = heightOfCanvas;

        if (canvasData) {
            const imageData = new ImageData(canvasData.width, canvasData.height);
            imageData.data.set(canvasData.data);
            ctx.putImageData(imageData, 0, 0);
        } else {
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Mouse Event Handlers
        let isDown = false;
        let canvasX, canvasY;
        ctx.lineWidth = 3;

        const handleMouseDown = (e) => {
            isDown = true;
            ctx.beginPath();
            canvasX = e.pageX - canvas.offsetLeft;
            canvasY = e.pageY - canvas.offsetTop;
            ctx.moveTo(canvasX, canvasY);
        };

        const handleMouseMove = (e) => {
            if (isDown !== false) {
                canvasX = e.pageX - canvas.offsetLeft;
                canvasY = e.pageY - canvas.offsetTop;
                ctx.lineTo(canvasX, canvasY);
                ctx.strokeStyle = "#000";
                ctx.stroke();
            }
        };

        const handleMouseUp = () => {
            isDown = false;
            // Save canvas state
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            setCanvasData({ data: imageData.data, width: canvas.width, height: canvas.height });

            var base64ImageData = canvas.toDataURL("image/png");

            set(ref(db, 'whiteboards/' + id),
                {
                    whiteboard: { data: base64ImageData }
                });
            ctx.closePath();
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        // Touch Events Handlers
        const draw = {
            started: false,
            start: function (evt) {
                ctx.beginPath();
                ctx.moveTo(
                    evt.touches[0].pageX,
                    evt.touches[0].pageY
                );
                this.started = true;
            },
            move: function (evt) {
                if (this.started) {
                    ctx.lineTo(
                        evt.touches[0].pageX,
                        evt.touches[0].pageY
                    );
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 5;
                    ctx.stroke();
                }
            },
            end: function () {
                this.started = false;
            }
        };

        // Touch Events
        canvas.addEventListener('touchstart', draw.start, false);
        canvas.addEventListener('touchend', draw.end, false);
        canvas.addEventListener('touchmove', draw.move, false);

        // Disable Page Move
        document.body.addEventListener('touchmove', function (evt) {
            evt.preventDefault();
        }, false);

        return () => {
            // Cleanup event listeners
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('touchstart', draw.start, false);
            canvas.removeEventListener('touchend', draw.end, false);
            canvas.removeEventListener('touchmove', draw.move, false);
            document.body.removeEventListener('touchmove', function (evt) {
                evt.preventDefault();
            }, false);
        };
    }, [canvasData]);

    return (
        <>
            <div className={cx("whiteboard-conteiner")}>
                <h1 className={cx("whiteboard-header")}>Shared Whiteboard</h1>
                <button onClick={clearWhiteboard} className={cx("whiteboard-button")}>Clear whiteboard</button>
            </div>
            <div className={cx("whiteboard-container")}>
                <canvas ref={canvasRef} />
            </div>
        </>);
};
