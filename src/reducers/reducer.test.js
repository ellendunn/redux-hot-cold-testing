import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from '../actions/actions';

describe(reducer, () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.guesses).toEqual([]);
    expect(state.auralStatus).toEqual('');
    expect(state.feedback).toEqual('Make your guess!')
    expect(state.correctAnswer).toBeGreaterThan(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
  })

  it('Should return the current state of an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  })
});

describe('generateAuralUpdate', () => {
  it('Should generate aural udpate', () => {
    let state = {
      guesses: [1, 2, 3],
      feedback: "You're Ice Cold...",
      auralStatus: ''
    };
    state = reducer(state, generateAuralUpdate());
    expect(state.auralStatus).toEqual("Here's the status of the game right now: You're Ice Cold... You've made 3 guesses. In order of most- to least-recent, they are: 3, 2, 1")
  })
})

describe('restartGame', () => {
  it('Should restart game', () => {
    let state = {
      guesses: [1, 2, 3, 4],
      feedback: "You're Ice Cold...",
      auralStatus: '',
      correctAnswer: 55
    };
    const correctAnswer = 78
    state = reducer(state, restartGame(correctAnswer));
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.auralStatus).toEqual('');
    expect(state.correctAnswer).toEqual(correctAnswer);
  })
})

describe('makeGuess', () => {
  it('Should update the state on a new guess', () => {
    let state = {
      guesses: [1, 2, 3, 4],
      feedback: "You're Ice Cold...",
      correctAnswer: 100
    };

    state = reducer(state, makeGuess(5));
    expect(state.guesses).toEqual([1, 2, 3, 4, 5])
    expect(state.feedback).toEqual("You're Ice Cold...")

    state = reducer(state, makeGuess(65));
    expect(state.guesses).toEqual([1, 2, 3, 4, 5, 65])
    expect(state.feedback).toEqual("You're Cold...")

    state = reducer(state, makeGuess(85));
    expect(state.guesses).toEqual([1, 2, 3, 4, 5, 65, 85])
    expect(state.feedback).toEqual("You're Warm.")

    state = reducer(state, makeGuess(95));
    expect(state.guesses).toEqual([1, 2, 3, 4, 5, 65, 85, 95])
    expect(state.feedback).toEqual("You're Hot!")

    state = reducer(state, makeGuess(100));
    expect(state.guesses).toEqual([1, 2, 3, 4, 5, 65, 85, 95, 100])
    expect(state.feedback).toEqual("You got it!")

  })
})
