import React, {Component} from 'react';

const ESCAPE = 27;
const ENTER = 13;

export default class TextInput extends Component {
  componentDidMount() {
    this.focus();
  }

  focus() {
    const {value} = this.props;
    this.refs.input.focus();
    this.refs.input.setSelectionRange(value.length, value.length);
  }

  handleKeyDown(event) {
    const {value, cancel, save} = this.props;
    if (event.which === ESCAPE) cancel();
    if (event.which === ENTER) save(value);
  }

  render() {
    const {value, onChange} = this.props;
    return (
      <input
        ref="input"
        type="text"
        value={value}
        onChange={({target: {value}}) => onChange(value)}
        onKeyDown={this.handleKeyDown.bind(this)}
        className="form-control input-md"
        />
    )
  }
}
