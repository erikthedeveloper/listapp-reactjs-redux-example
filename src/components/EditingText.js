import React, {Component, PropTypes} from 'react';

const ESCAPE = 27;
const ENTER = 13;

export default class EditingText extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  focus() {
    const {value} = this.props;
    this._input.focus();
    this._input.setSelectionRange(value.length, value.length);
  }

  handleKeyDown(event) {
    const {props} = this;
    if (event.which === ENTER) props.save(props.value);
    if (event.which === ESCAPE) props.cancel();
  }

  handleChange({target: {value}}) {
    this.props.onChange(value);
  }

  render() {
    const {value} = this.props;
    return (
      <input
        ref={(node) => this._input = node}
        type="text"
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        className="form-control input-md"
        />
    )
  }
}

EditingText.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};
