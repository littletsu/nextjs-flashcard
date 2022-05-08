import styles from '../styles/Home.module.css'
import { Card, Columns } from 'react-bulma-components'
import React from 'react';
import OptionCard from '../components/OptionCard';
import readJSON from '../lib/readJSON';

function chunk (arr, len) {
  var chunks = [],
      i = 0,
      n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export async function getStaticProps() {
  const hiragana1 = readJSON('hiragana1');
  return {
    props: {
      hiragana1
    }
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "", 
      options: [], 
      answer: "",
      hasAnswered: false,
      maxOptions: 9,
      flashcards: props.hiragana1,
      correct: 0,
      incorrect: 0
    };
  }

  populateState = (isInitializing) => {
    if(isInitializing && this.state.question.length !== 0) return; 
    if(isInitializing && this.state.question.length === 0) {
      document.addEventListener("keyup", this.onKeyDown);
    }
    const { flashcards, maxOptions } = this.state;
    const randomFlashcard = getRandom(flashcards);
    const randomFlashcardIndex = flashcards.indexOf(randomFlashcard);
    let randomOptions = Array.from(Array(flashcards.length).keys()).filter(i => i !== randomFlashcardIndex);
    shuffleArray(randomOptions);
    randomOptions[0] = randomFlashcardIndex
    randomOptions = randomOptions.slice(0, maxOptions).map(i => flashcards[i]);
    shuffleArray(randomOptions);
    this.setState({
      question: randomFlashcard[1],
      answer: randomFlashcard[0],
      options: chunk(randomOptions, 3),
      hasAnswered: false
    });
  }

  onOptionCardClick = (option) => {
    if(this.state.hasAnswered) return;
    let newCorrect = this.state.answer === option[0];
    let newIncorrect = !newCorrect;
    this.setState((state) => ({
      hasAnswered: true,
      correct: state.correct + newCorrect,
      incorrect: state.incorrect + newIncorrect
    }));
  }

  onKeyDown = () => {
    if(this.state.hasAnswered) this.populateState(false);
  }

  componentDidMount() {
    this.populateState(true);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.onKeyDown);
  }

  render() {
    return (
      <div>
        <Card className={`answer-card${this.state.hasAnswered ? ' clickable' : ''}`} onClick={() => this.onKeyDown()}>
          <Card.Content className="has-text-centered">
            {this.state.question}
          </Card.Content>
        </Card>
        
        {this.state.options.map((row) => 
          <Columns key={JSON.stringify(row)}>
            {row.map((option) => <OptionCard app={this} key={JSON.stringify(option)} onClick={(option, component) => this.onOptionCardClick(option, component)} option={option}/>)}
          </Columns>
        )}

        <p className="has-text-centered score">
          <span className="has-text-success">{this.state.correct}</span>
          <span className="has-text-grey"> ━ </span>
          <span className="has-text-danger">{this.state.incorrect}</span>
        </p>
      </div>
    )
  }
}
