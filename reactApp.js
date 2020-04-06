class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: 0,
      score: 0
    };
    this.shotSound = new Audio("./assets/audio/board.mp3");
    this.scoreSound = new Audio("./assets/audio/swish.mp3");
  }

  shotHandler = () => {
    let score = this.state.score;
    if (Math.random() > 0.5) {
      score += 1;
      this.scoreSound.play();
    } else {
      this.shotSound.play();
    }
    this.setState((state, props) => ({
      shots: state.shots + 1,
      score
    }));
    console.log("shoot");
  };

  render() {
    let shotPercentageDiv;

    if (this.state.shots) {
      const shotPercentage = Math.round(
        (this.state.score / this.state.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage}</strong>
        </div>
      );
    }

    return (
      <div className='Team'>
        <h2>{this.props.name}</h2>
        <div className='identity'>
          <img src={this.props.logo} alt={this.props.name}></img>
        </div>
        <div>
          <strong>Shots:</strong> {this.state.shots}
        </div>
        <div>
          <strong>Score:</strong> {this.state.score}
        </div>

        {shotPercentageDiv}
        <button onClick={this.shotHandler}>Shoot!</button>
      </div>
    );
  }
}

function Game(props) {
  return (
   <div className="Game">
     <h1>Welcome to {props.venue}</h1>
    <div className='stats'>
        
        <Team 
          name={props.visitingTeam.name} 
          logo={props.visitingTeam.logoSrc} 
        />
          
          <div className='versus'>
            <h1>VS</h1>
          </div>
        
        <Team 
          name={props.homeTeam.name} 
          logo={props.homeTeam.logoSrc} 
        />
      </div>
    </div>
  )
}

// Deafault App component that all other compents are rendered through
function App(props) {
  const pigs = {
    name: 'Capitolist Pigs',
    logoSrc: './assets/logos/pig.png'
  }
  const commies = {
    name: 'Soviet Union',
    logoSrc: './assets/logos/com.png'
  }

  const birds = {
    name: 'Dumb Birds', 
    logoSrc: './assets/logos/bird.jpg'
  }

  const wolves = {
    name: 'Wolf Colas',
    logoSrc: './assets/logos/wolf.png'
  }

  return (
    <div className='App'>
      <Game 
      venue="Moscow" 
      homeTeam={commies}
      visitingTeam={pigs} />

      <Game 
      venue="Washington DC" 
      homeTeam={wolves}
      visitingTeam={birds} /> 
    </div>
  );
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
