// Keycodes:
  // Q = 81, W = 87, E = 69
  // A = 65, S = 83, D = 68
  // Z = 90, X = 88, C = 67

// Array of dicts with the info for each key
const beats = [
  {
    key: 'Q',
    keycode: 81,
    name: 'Heater-1',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    key: 'W',
    keycode: 87,
    name: 'Heater-2',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    key: 'E',
    keycode: 69,
    name: 'Heater-3',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    key: 'A',
    keycode: 65,
    name: 'Heater-4',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    key: 'S',
    keycode: 83,
    name: 'Heater-6',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    key: 'D',
    keycode: 68,
    name: 'Dsc_Oh',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    key: 'Z',
    keycode: 90,
    name: 'Kick_n_Hat',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    key: 'X',
    keycode: 88,
    name: 'Kick_1',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    key: 'C',
    keycode: 67,
    name: 'Cev_H2',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyClick = this.handleKeyClick.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  
  
  handleKeyPress(event) {
    
    // find out which key was pressed, and save it if it's one on the drumpad
    let keypressed = 0;
    for (let i = 0; i < beats.length; i++) {
      if (event.keyCode === beats[i].keycode) {
        keypressed = beats[i];
      }
    }
    
   // if the key pressed is one of the drumpad keys, pass it to handleActions
   if (keypressed !== 0) {
    this.handleActions(keypressed);
   }
   else {
    this.setState((state) => ({
      message: ''
    }));
   }
   
  } // end of handleKeyPress func
  
  
  handleKeyClick(key) {
    
    // find out which key was clicked on
    let keypressed = 0;
    for (let i = 0; i < beats.length; i++) {
      if (key === beats[i].key) {
        keypressed = beats[i];
      }
    }
    
    // pass the info on the clicked key to handleActions
    this.handleActions(keypressed);
  } // end of handleKeyClick
  
  
  handleActions(keyobject) {
    
    // play the sound associated to the key that was pressed/clicked
    let sound = document.getElementById(keyobject.key);
    sound.play();
    
    // display the name of the key
    this.setState((state) => ({
      message: keyobject.name
    }));
    
    // change the bg color of the key pressed/clicked, and then change it back
    document.getElementById(keyobject.name).style = "background: linear-gradient(to top, #EBCC07 0%, #C4C4AB 100%);";
    setTimeout(() => document.getElementById(keyobject.name).style = "background: linear-gradient(to bottom, #ccccff 0%, #669999 100%);", 200);
  }
  
  
  render() {
    
    const keys = [];
    for (let i = 0; i < beats.length; i++) {
      let key = beats[i].key;
      keys.push(
        <div class="drum-pad" id={beats[i].name} onClick={ () => this.handleKeyClick(key) }>
          {beats[i].key}
          <audio src={beats[i].sound} class="clip" id={beats[i].key}></audio>
        </div>
      )
    }
    
    return (
      <div id="drum-machine">
        <div id="keys-container">
          {keys}
        </div>
        <div>
          <h1 id="display-title">Drumpad</h1>
          <div id="display-div">
            <p id="display">{ this.state.message }</p>
          </div>
        </div> 
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
