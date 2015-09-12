import React from 'react';
import radium from 'radium';
import OptionList from './options';
import Token from './token';
import {difference, filter} from 'lodash';
import {contains} from 'underscore.string';
import Immutable from 'immutable';
import keyCodes from 'utils/keyCodes';
import styles from './styles';

@radium
export default class TokenAutocomplete extends React.Component {

  static displayName = 'TokenAutocomplete';

  static propTypes = {
    options: React.PropTypes.array,
    values: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    treshold: React.PropTypes.number,
    focus: React.PropTypes.bool,
    processing: React.PropTypes.bool,
    limitToOptions: React.PropTypes.bool
  }

  static contextTypes = {
  }

  static defaultProps = {
    options: [],
    defaultValues: [],
    placeholder: 'add new tag',
    treshold: 3,
    focus: false,
    processing: false,
    limitToOptions: false
  }

  state = {
    focused: false,
    inputValue: '',
    values: Immutable.List([])
  }


  //LIFECYCLE

  componentDidMount() {
    let values = Immutable.List(this.props.defaultValues);
    this.setState({values});
    this.a = 0;
    if (this.props.focus) {
      this.focus();
    }
  }


  //EVENT HANDLERS

  onInputChange = e => {

    this.setState({
      inputValue: e.target.value
    });

  }

  onKeyDown = e => {
    switch (e.keyCode) {
      case keyCodes.ENTER:
        this.addSelectedValue();
        break;
      case keyCodes.BACKSPACE:
        if (!this.state.inputValue.length) {
          this.setState({
            inputValue: this.state.inputValue.slice(0, -1)
          });
          this.deleteValue(this.state.values.size - 1);
        }
        break;
    }
  }

  onFocus = e => {
    this.a = 3;
    this.setState({focused: true});
  }

  onBlur = e => {
    this.setState({focused: false});
  }


  //ACTIONS

  focus = () => {
    React.findDOMNode(this.refs.input).focus();
    this.onFocus();
  }

  deleteValue = index => {
    this.setState({
       values: this.state.values.delete(index)
    });
    this.focus();
  }

  addSelectedValue = () => {
    if (this.refs.options.props.options.length) {
      const newValue = this.refs.options.getSelected();
      this.setState({
        values: this.state.values.push(newValue),
        inputValue: ''
      });

    }

  }


  //HELPERS

  getAvailableOptions = () => {

    //notselected
    let availableOptions = difference(this.props.options, this.state.values.toArray());

    //filter
    availableOptions = filter(availableOptions, option => {
      return contains(option, this.state.inputValue);
    });

    return availableOptions;

  }

  isTresholdReached = () => {
    return this.state.inputValue.length >= this.props.treshold;
  }


  //RENDERERS

  renderOptionsDropdown = () => {

    if (this.isTresholdReached() && this.state.focused) {
      let passProps = {
          options: this.getAvailableOptions(),
          term: this.state.inputValue,
          handleAddSelected: this.addSelectedValue
      };
      return <OptionList ref="options" {...passProps}/>;
    } else {
      return null;
    }


  }

  renderTokens = () => {
    return this.state.values.map((value, key) => {
      return <Token key={key} index={key} handleRemove={this.deleteValue}>{value}</Token>;
    });
  }

  renderProcessing = () => {
    return this.props.processing ? <div ref='processing' style={styles.processing}/> : null;
  }

  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>
        <div ref="inputWrapper" style={styles.inputWrapper}>
          {this.renderTokens()}
          <input
            style={styles.input}
            onKeyDown={this.onKeyDown}
            onChange={this.onInputChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={this.state.inputValue}
            placeholder={this.props.placeholder}
            ref="input"/>
          {this.renderProcessing()}
        </div>
        {this.renderOptionsDropdown()}
      </div>
    );

  }

}
