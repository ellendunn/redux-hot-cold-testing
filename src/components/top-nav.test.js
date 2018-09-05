import React from 'react';
import {shallow, mount} from 'enzyme';

import {restartGame, generateAuralUpdate} from '../actions/actions'

import { TopNav } from './top-nav';

describe('<TopNav />', () => {
  it('Renders without crashing', () => {
    shallow(<TopNav />)
  });

  it('Dispatches restartGame on restart', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<TopNav dispatch={dispatch} />);
    wrapper.find('.new').simulate('click')
    expect(dispatch).toHaveBeenCalled()
    const action = dispatch.mock.calls[0][0];
    expect(action.type).toEqual('RESTART_GAME')
    expect(action.correctAnswer).toBeGreaterThan(0);
    expect(action.correctAnswer).toBeLessThanOrEqual(100);
  })

  it('Dispatches generateAuralUpdate on generate', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<TopNav dispatch={dispatch} />);
    wrapper.find('.status-link').simulate('click')
    expect(dispatch).toHaveBeenCalled()
    const action = dispatch.mock.calls[0][0];
    expect(action.type).toEqual('GENERATE_AURAL_UPDATE')

  })

})
