import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';

// Using Particles library for background
const particlesParams = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
}

// Clarifai API for face detection
const app = new Clarifai.App({apiKey: '35f36d91636c41e18c73e488a92909e0'});



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // Load user for signin and register
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  
  // Using Clarifai API to detect face
  calcFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // Display box via FaceRecognition.js
  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  // Read in img input
  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  // Set picture, run Clarifai API, update user info 
  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
             })
            })
             .then(response => response.json())
             .then(count => {
               this.setState(Object.assign(this.state.user, { entries: count }))
             })
      }
      this.displayFaceBox(this.calcFaceLocation(response))})
    .catch(err => console.log(err)
    );
  }

  // Set route and is signed in or not
  onChangeRoute = (route) => {
    if (route === 'signin' || route === 'register') {
      this.setState({isSignedIn: false});
    } else {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesParams}/>
        <Navigation isSignedIn={isSignedIn} onChangeRoute={this.onChangeRoute} />
        { (route === 'home')
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPictureSubmit={this.onPictureSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (route === 'signin'
        ? <Signin loadUser={this.loadUser} onChangeRoute={this.onChangeRoute} /> 
        : <Register loadUser={this.loadUser} onChangeRoute={this.onChangeRoute} />
        )}
      </div>
    );
  }
}

export default App;
