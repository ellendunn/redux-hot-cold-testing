import React from 'react';
import {shallow, mount} from 'enzyme';
import {makeGuess} from '../actions/actions'

import { GuessForm } from './guess-form';

describe('<GuessForm />', () => {
  it('Renders without crashing', () => {
    shallow(<GuessForm />)
  });

  it('Dispatches makeGuess from makeGuess', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<GuessForm dispatch={dispatch} />)
    const instance = wrapper.instance();
    const guess = '15';
    wrapper.find("input[type='number']").instance().value = guess;
    wrapper.simulate('submit');
    expect(dispatch).toHaveBeenCalledWith(makeGuess(guess))
    })

})
