import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter, Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { createMemoryHistory } from "history";
import { act } from 'react-dom/test-utils';


import  { Screen, Route, Link, Navigation } from '../src';
import BoolCSSTransition from '../src/BoolCSSTransition';

jest.useFakeTimers();

describe('Route', () => {

  describe('Snapshots', () => {

    test('screen prop', () => {
      const component = renderer.create(
        <BrowserRouter>
          <Navigation>
            <Route path='/' screen>
              <div />
            </Route>
          </Navigation>
        </BrowserRouter>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('screen with screen props', () => {
      const component = renderer.create(
        <BrowserRouter>
          <Navigation>
            <Route path='/' screen screenProps={{id: 'my-screen'}}>
              <div />
            </Route>
          </Navigation>
        </BrowserRouter>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('custom className', () => {
      const component = renderer.create(
        <BrowserRouter>
          <Navigation>
            <Route path='/' className='custom'>
              <div />
            </Route>
          </Navigation>
        </BrowserRouter>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('disableStyle', () => {
      const component = renderer.create(
        <BrowserRouter>
          <Navigation>
            <Route path='/' disableStyle>
              <div />
            </Route>
          </Navigation>
        </BrowserRouter>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

  describe('on navigation', () => {

    let history, callback;

    beforeEach(() => {
      history = createMemoryHistory();
      callback = jest.fn(args => null);
    })

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('should pass empty animations when cancelAnimation', () => {

      const wrapper = mount(
        <Router history={history}>
          <Navigation>
            <Route path='/'>
              <Link to='/second'>
                Second
              </Link>
            </Route>
            <Route
              path='/second'
              cancelAnimation
              transitionProps={{
                onEnter: node => {
                  callback('onEnter')
                },
                onEntering: node =>{
                  callback('onEntering')
                },
                onEntered: node =>{
                  callback('onEntered')
                }
              }}
            >
              <div />
            </Route>
          </Navigation>
        </Router>
      );

      const secondLink = wrapper.find('Link');

      secondLink.simulate('click', { button: 0 });
      wrapper.update();

      expect(callback).not.toBeCalled();

    });

    it('forceTransition should take over transition', () => {

      const forcedCallback = jest.fn(args => null);

      const wrapper = mount(
        <Router history={history}>
          <Navigation>
            <Route path='/'>
              <Link to='/second'
                transition={{
                  onEnter: node => {
                    callback('onEnter')
                  },
                }}>
                Second
              </Link>
            </Route>
            <Route
              path='/second'
              forceTransition={{
                onEnter: node => {
                  forcedCallback('onEnter')
                },
              }}
            >
              <div />
            </Route>
          </Navigation>
        </Router>
      );

      const secondLink = wrapper.find('Link');

      secondLink.simulate('click', { button: 0 });
      wrapper.update();

      expect(forcedCallback).toBeCalled();
      expect(callback).not.toBeCalled();

    });

    it('froceTransition fallback to globalTransitionProps.timeout', () => {

      const wrapper = mount(
        <Router history={history}>
          <Navigation globalTransitionProps={{timeout: 1000}}>
            <Route path='/'>
              <Link to='/second'>
                Second
              </Link>
            </Route>
            <Route
              path='/second'
              forceTransition='custom-transition'
            >
              <div />
            </Route>
          </Navigation>
        </Router>
      );

      const secondLink = wrapper.find('Link');
      secondLink.simulate('click', { button: 0 });
      wrapper.update();
      const transitionComponent = wrapper.find('BoolCSSTransition').last();
      expect(transitionComponent.props().timeout).toBe(1000)

    });

    it('froceTransition fallback to transitionProps.timeout', () => {

      const wrapper = mount(
        <Router history={history}>
          <Navigation>
            <Route path='/'>
              <Link to='/second'>
                Second
              </Link>
            </Route>
            <Route
              path='/second'
              forceTransition='custom-transition'
              transitionProps={{timeout: 1200}}
            >
              <div />
            </Route>
          </Navigation>
        </Router>
      );

      const secondLink = wrapper.find('Link');
      secondLink.simulate('click', { button: 0 });
      wrapper.update();
      const transitionComponent = wrapper.find('BoolCSSTransition').last();
      expect(transitionComponent.props().timeout).toBe(1200)

    });

  });

});
