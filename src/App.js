import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register'
import Bck from './Components/Bck'
                
const initialState = {
  input:'',
    imageUrl:'',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user : {
      id:'',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    }
}
class App extends Component  {
  constructor(){
    super();
    this.state= initialState;
  } 

  loadUser = (data) => {
    this.setState({user:{
        id:data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
    }})
  }

  faceLocation = (data) => {
    const face =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow : face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height),
    }
  }

  displayBox = (box) => {
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  } 

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://nameless-lake-46715.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify ({
            input: this.state.input,
        })})
     .then(response => response.json())
     .then(response => {
      if(response) {
        fetch('https://nameless-lake-46715.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify ({
            id: this.state.user.id,
        })
      })
        .then(response=> response.json())
        .then(count=> {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })}
      this.displayBox(this.faceLocation(response))})
     .catch(err => console.log(err))
  }

  onRouteChange = (route) => { 
    if(route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }

  render(){ 
    const { isSignedIn, imageUrl, box } = this.state;
    return (
      <div className="App">

        <Bck />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route==='home'
        ? <div> 
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/> 
          </div>
        : (
          this.state.route==='signin'
          ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
      }
      </div>
    );
  }
}
export default App;
