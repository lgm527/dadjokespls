import './App.css';
import { useEffect, useState } from 'react';
import DadJoke from './DadJoke';

function App() {

  const [joke, setJoke] = useState('');
  const [color, setColor] = useState('');

  const randomHex = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
       color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const fetchDadJoke = () => {
    fetch(`https://icanhazdadjoke.com/`, {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      setJoke(data.joke);
    })
    .catch(err => {
      console.log(err);
      setJoke('Oh no! something went wrong, 😞 dad jokes unavailable right now');
    })
  }

  const handleClick = ()  => {
    fetchDadJoke();
    setColor(randomHex());
  }

  useEffect(() => {
    fetchDadJoke();
    setColor(randomHex());  
  }, [])

  return (
    <div className="App" style={{backgroundColor: color}}>
      <header className="App-content">
        Welcome to your infinite supply of dad jokes!
        <br></br>
        ∞ 👨 💬
      </header>

      <DadJoke joke={joke}/>

      <button onClick={handleClick}>One Fresh Dad Joke Please</button>

      <footer> <p>Made for&nbsp;<span role="img" aria-label="dad emoji">👨</span> by <a href="https://github.com/lgm527/" target="_blank" rel="noopener noreferrer">@lgm527</a></p></footer>

    </div>
  );
}

export default App;
