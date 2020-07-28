function Team(props) {

    let shotPercentageDiv

    if (props.stats.shots) {
        const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100) + '%'
        shotPercentageDiv = (
            <div>Shot Percentage: {shotPercentage}</div>
        )
    }

    return (
        <div className="Team">
            <h2>{props.name}</h2>
            <div className="identity">
                <img src={props.logo} alt={props.name} />
            </div>
            <div>Shots: {props.stats.shots}</div>
            <div>Score: {props.stats.score}</div>
            {shotPercentageDiv}
            <button onClick={props.shotHandler}>Shoot!</button>
        </div>
    )
}

function ScoreBoard(props) {
    return (
        <div className='ScoreBoard'>
             <div className='teamStats'>
                <h3>HOME</h3>
                <h3>{props.homeTeamStats.score}</h3>
            </div>

            <h3>SCOREBOARD</h3>

            <div className='teamStats'>
                <h3>VISITORS</h3>
                <h3>{props.awayTeamStats.score}</h3>
            </div>
        </div>
    )
}


class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            awayTeamStats: {
                shots: 0,
                score: 0
            },
            resetCount: 0
        }

        this.shotSound = new Audio('./assets/hockey-stick.mp3')
        this.scoreSound = new Audio('./assets/hockey-horn.mp3')
    }

    shoot = (team) => {
        const teamStatsKey = `${team}TeamStats`
        let score = this.state[teamStatsKey].score
        this.shotSound.play()

        if (Math.floor(Math.random() * 10) <= 2) {
            score += 1
            this.scoreSound.play()
        }

        this.setState((state, props) => ({
            [teamStatsKey]: {
                shots: state[teamStatsKey].shots + 1,
                score
            }
        }))
    }

    resetGame = () => {
        this.setState((state, props) => ({
            resetCount: state.resetCount += 1,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            awayTeamStats: {
                shots: 0,
                score: 0
            }
        }))
    }

    render() {
        return (
            <div className="Game">
                <ScoreBoard 
                awayTeamStats={this.state.awayTeamStats}
                homeTeamStats={this.state.homeTeamStats}
                />
                <h1>Welcome to {this.props.venue}!</h1>
                <div className="stats">

                    <Team
                        name={this.props.homeTeam.name}
                        logo={this.props.homeTeam.logoSrc}
                        stats={this.state.homeTeamStats}
                        shotHandler={() => this.shoot('home')}
                    />

                    <div className="versus">
                        <h1>VS</h1>
                        <div>Resets: {this.state.resetCount}</div>
                        <button onClick={this.resetGame}>Reset Game</button>
                    </div>


                    <Team
                        name={this.props.awayTeam.name}
                        logo={this.props.awayTeam.logoSrc}
                        stats={this.state.awayTeamStats}
                        shotHandler={() => this.shoot('away')}
                    />

                </div>
            </div>
        )
    }
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
            <Game venue="Kenzie Arena" homeTeam={birds} awayTeam={cat} />
            <Game venue="The JavaScript Center" homeTeam={warriors} awayTeam={spartians} />
        </div>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)