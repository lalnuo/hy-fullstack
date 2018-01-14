import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      anecdotes: [
        { anecdote: 'If it hurts, do it more often', votes: 0 },
        { anecdote: 'Adding manpower to a late software project makes it later!', votes: 0 },
        { anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
        { anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
        { anecdote: 'Premature optimization is the root of all evil.', votes: 0 },
        { anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it', votes: 0 }
      ]
    }
  }

  nextAnecdote = () => {
    return this.setState({ selected: Math.floor(Math.random() * this.state.anecdotes.length) })
  }

  voteSelected = () => {
    let anecdote = this.state.anecdotes[this.state.selected];
    anecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const nextAnecdotes = [...this.state.anecdotes];
    nextAnecdotes[this.state.selected] = anecdote;
    this.setState({ anecdotes: nextAnecdotes });
  }

  render() {
    const { anecdote, votes } = this.state.anecdotes[this.state.selected];

    const mostVoted = this.state.anecdotes.reduce((acc, i) => i.votes > acc.votes ? i : acc);
    return (
      <div>
        <button onClick={this.nextAnecdote}>next anecdote</button>
        <button onClick={this.voteSelected}>vote</button>
        <br />
        <Anecdote anecdote={anecdote} votes={votes} />
        <br />
        <h2>Anecdote with the most votes:</h2>
        <Anecdote anecdote={mostVoted.anecdote} votes={mostVoted.votes} />
      </div>
    )
  }
}

const Anecdote = ({ votes, anecdote }) => (
  <div>
    <h4>{anecdote}</h4>
    <p>has {votes} votes</p>
  </div>
)
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
