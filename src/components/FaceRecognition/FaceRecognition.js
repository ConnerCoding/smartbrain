import React from 'react';
import './FaceRecognition.css';

/** 
Display the box on the face in the image
First you display the image with imageUrl
Then you use the box parameter which is 
the object you get from the displayFaceBox
function, which gets its data from calcFaceLocation
which gets its data from the Clarifai API call in the
onPictureSubmit function :)
*/ 

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol,
                    bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>            
        </div>
    );
}

export default FaceRecognition;