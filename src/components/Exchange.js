import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoadingIndicator from 'react-loading-indicator';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Exchange extends Component {
  constructor(props){
    super(props);
    this.state = {tokenAmount: 0}
  }

  handleChange = (event, index, value) => this.setState({tokenAmount: value});

  render(){
    return (
      <div>
        {this.props.user ?
          <div>
            <h1>Your token Count {this.props.user}</h1>
            <h3>Buy Tokens: </h3>
            {/* <SelectField
              floatingLabelText="CapCoins"
              value={this.state.tokenAmount}
              onChange={this.handleChange} >
              <MenuItem value={1} primaryText="1" />
              <MenuItem value={2} primaryText="3" />
              <MenuItem value={3} primaryText="5" />
              <MenuItem value={4} primaryText="10" />
              <MenuItem value={5} primaryText="25" />
              <MenuItem value={6} primaryText="50" />
            </SelectField> */}
          </div>
          :
          <LoadingIndicator />
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    contract: state.contract,
    accounts: state.accounts
  }
}

const mapDispatch = (dispatch) => {
  return {}
}

export default connect(mapState, mapDispatch)(Exchange)
