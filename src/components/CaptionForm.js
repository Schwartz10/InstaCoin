import React, {Component} from 'react'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { postCaption } from '../store/posts';

class CaptionForm extends Component {

  constructor(props){
    super(props)
    this.state = {caption: ""}
  }

  handleChange = (event) => {
    this.setState({
      caption: event.target.value,
    });
  };

  render () {
    return (
      <div>
        <span>
        <TextField
          hintText="Caption"
          value={this.state.caption}
          onChange={this.handleChange}
        />
        <br /><br />
        <RaisedButton
          onClick={e => this.props.createCaption(e, this.props.contract, this.props.accounts[0])}
          label="Submit Caption"
        />
        </span>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    web3: state.web3,
    contract: state.contract,
    accounts: state.accounts,
    posts: state.posts,
  }
}

const mapDispatch = dispatch => {
  return {
    createCaption: function(e, caption, contract, account){
      e.preventDefault();
      dispatch(postCaption(name, contract.createCaption, account));
    }
  }
}

export default connect(mapState, mapDispatch)(CaptionForm)
