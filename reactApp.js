class Team extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shots: 0,
            score: 0,
        }

        this.shotSound = new Audio('./assets/hockey-stick.mp3')
        this.scoreSound = new Audio('./assets/hockey-horn.mp3')
    }

    shotHandler = () => {
        let score = this.state.score
        this.shotSound.play()

        if (Math.floor(Math.random() * 10) <= 2) {
            score += 1
            this.scoreSound.play()
        }

        this.setState((state, props) => ({
            shots: state.shots + 1,
            score
        }))
    }

    render() {
        let shotPercentageDiv

        if (this.state.shots) {
            const shotPercentage = Math.round((this.state.score / this.state.shots) * 100) + '%'
            shotPercentageDiv = (
                <div>Shot Percentage: {shotPercentage}</div>
            )
        }

        return (
            <div className="Team">
                <h2>{this.props.name}</h2>
                <div className="identity">
                    <img src={this.props.logo} alt={this.props.name} />
                </div>
                <div>Shots: {this.state.shots}</div>
                <div>Score: {this.state.score}</div>
                {shotPercentageDiv}
                <button onClick={this.shotHandler}>Shoot!</button>
            </div>
        )
    }
}

function Game(props) {
    return (
        <div className="Game">
            <h1>Welcome to {props.venue}!</h1>
            <div className="stats">
                <Team name={props.homeTeam.name} logo={props.homeTeam.logoSrc} />
                <div className="versus"><h1>VS</h1></div>
                <Team name={props.awayTeam.name} logo={props.awayTeam.logoSrc} />
            </div>
        </div>
    )
}

function App(props) {
    const birds = {
        name: 'The Automatic Avian Squad',
        logoSrc: './assets/bird-logo.png'
    }
    const cat = {
        name: 'The Basic Big-Cat Brigade',
        logoSrc: './assets/cat-logo.png'
    }
    const warriors = {
        name: 'The Wide-Web Warriors',
        logoSrc: './assets/warrior-logo.gif'
    }
    const spartians = {
        name: 'The Script-Writing Spartians',
        logoSrc: './assets/spartian-logo.png'
    }
    return (
        <div className="App">
            <Game venue="Kenzie Arena" homeTeam={birds} awayTeam={cat}/>
            <Game venue="The JavaScript Center" homeTeam={warriors} awayTeam={spartians} />
        </div>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)