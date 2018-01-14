import React from 'react';
import ReactDOM from 'react-dom';

class Feedback extends React.Component {
  state = {
    hyva: 0,
    neutraali: 0,
    huono: 0,
  }

  kasvataYhdella = arvosana => {
    return () => {
      switch (arvosana) {
        case 'hyva':
          return this.setState({ hyva: this.state.hyva + 1 });
        case 'neutraali':
          return this.setState({ neutraali: this.state.neutraali + 1 });
        case 'huono':
          return this.setState({ huono: this.state.huono + 1 });
      }
    }
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <Button onClick={this.kasvataYhdella('hyva')}>hyvä</Button>
        <Button onClick={this.kasvataYhdella('neutraali')}>neutraali</Button>
        <Button onClick={this.kasvataYhdella('huono')}>huono</Button>
        <h2>statistiikka</h2>
        <Statistics
          hyva={this.state.hyva}
          neutraali={this.state.neutraali}
          huono={this.state.huono}
        />
      </div>
    );
  }
}

const Button = ({ children, onClick }) => <button onClick={onClick}>{children}</button>

const Statistics = ({ hyva, neutraali, huono }) => {
  if (hyva === 0 && neutraali === 0 && huono === 0) {
    return <p>Yhtään palautetta ei ole annettu</p>
  }
  const keskiarvo = (hyva + (huono ? huono * -1 : 0)) / (hyva + neutraali + huono);
  const positiivisia = hyva / (hyva + huono + neutraali) * 100;
  return (
    <table>
      <tbody>
        <Statistic otsake={"hyvä"} arvo={hyva} />
        <Statistic otsake={"neutraali"} arvo={neutraali} />
        <Statistic otsake={"huono"} arvo={huono} />
        <Statistic otsake={"keskiarvo"} arvo={keskiarvo} />
        <Statistic otsake={"positiivisia"} arvo={`${positiivisia}%`} />
      </tbody>
    </table>
  )
}

const Statistic = ({ otsake, arvo }) => (
  <tr>
    <td>{otsake}</td>
    <td>{arvo}</td>
  </tr>
)


ReactDOM.render(<Feedback />, document.getElementById('root'));
