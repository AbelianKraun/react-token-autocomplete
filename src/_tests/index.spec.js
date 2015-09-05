import React from 'react/addons';
import TokenAutocomplete from '../';
import Token from '../token';
import TestUtils from './utils';

let component;

describe('TokenAutocomplete', () => {

  afterEach(done => {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    done();
  });


  //INITIAL STATE

  describe('by default', () => {
    beforeEach(() => {
      component = TestUtils.renderComponent(TokenAutocomplete);
    });

    it('has empty options array', () => {
        expect(component.props.options).to.be.instanceof(Array);
        expect(component.props.options).to.be.empty;
    });

    it('has empty value array by default', () => {
        expect(component.props.defaultValues).to.be.instanceof(Array);
        expect(component.props.defaultValues).to.be.empty;
    });

    it('has treshold of 3', () => {
        expect(component.props.treshold).to.be.equal(3);
    });

    it('has predefined placeholder', () => {
        const placeholder = 'add new tag';
        expect(component.props.placeholder).to.be.equal(placeholder);
        expect(component.refs.input.props.placeholder).to.equal(placeholder);
    });

    it('has predefined place', () => {
        const component = TestUtils.renderComponent(TokenAutocomplete);
        const placeholder = 'add new tag';
        expect(component.props.placeholder).to.be.equal(placeholder);
        expect(component.refs.input.props.placeholder).to.equal(placeholder);
    });

  });

  describe('contains', () => {

      it('input with placeholder', () => {
        const component = TestUtils.renderComponent(TokenAutocomplete);
        expect(component.refs.input).to.exist;
      });

  });


  //UNIT

  it('stores input value in state.inputValue', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete);

    expect(component.state.inputValue).to.equal('');

    TestUtils.changeInputValue(component, 'abc');

    expect(component.state.inputValue).to.equal('abc');

  });

  describe('passes to options list', () => {

    beforeEach(() => {
      component = TestUtils.renderComponent(TokenAutocomplete, {
        defaultValues: ['a', 'b']
      });
      TestUtils.changeInputValue(component, 'def');
    });

    it('inputValue as term props', () => {
      expect(component.refs.options.props.term).to.equal('def');
    });


  });


  //FUNCTIONAL

  it('displays a list when options are provided and treshold is achieved', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete);
    expect(component.refs.options).not.to.exist;

    TestUtils.changeInputValue(component, 'abc');


    expect(component.refs.options).to.exist;

  });

  it('displays a token for each passed value', done => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      defaultValues: ['a', 'b', 'c', 'd']
    });

    let tokens = TestUtils.scryRenderedComponentsWithType(component.refs.wrapper, Token);
    expect(tokens.length).to.equal(4);
    done();
  });

  it('dont show already selected options', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      options: ['aaa1', 'aaa2', 'aaa3', 'aaa4'],
      defaultValues: ['aaa1', 'aaa2', 'aaa3']
    });


    TestUtils.changeInputValue(component, 'aaa');

    expect(component.refs.options.props.options).to.include('aaa4');

  });

  it('dont show options not matching currently type value', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      options: ['aaa1', 'aaa2', 'aaa3', 'aaa4', 'ddd1'],
      defaultValues: ['aaa1', 'aaa2', 'aaa3']
    });

    TestUtils.changeInputValue(component, 'aaa');

    expect(component.refs.options.props.options.length).to.equal(1);
    expect(component.refs.options.props.options).to.include('aaa4');

  });

  describe('on enter', () => {

    it('adds currently selected element on enter', () => {

      const component = TestUtils.renderComponent(TokenAutocomplete, {
        options: ['aaa', 'ccc'],
        defaultValues: ['bbb']
      });

      TestUtils.changeInputValue(component, 'aaa');
      TestUtils.hitEnter(component);

      expect(component.state.values.size).to.equal(2);

      TestUtils.changeInputValue(component, 'aaa');
      expect(component.refs.options.props.options).to.be.empty;

    });

    it('clears inputValue', () => {

      const component = TestUtils.renderComponent(TokenAutocomplete, {
        options: ['aaa'],
        defaultValues: ['bbb']
      });

      TestUtils.changeInputValue(component, 'aaa');
      TestUtils.hitEnter(component);

      expect(component.state.inputValue).to.be.empty;

    });

  });


  it('on backspace when input is empty deletes the last value', () => {

    const component = TestUtils.renderComponent(TokenAutocomplete, {
      defaultValues: ['aaa1', 'aaa2', 'aaa3']
    });

    TestUtils.hitBackspace(component);
    expect(component.state.values.size).to.equal(2);
    TestUtils.hitBackspace(component);
    expect(component.state.values.size).to.equal(1);
  });

});
