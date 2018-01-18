import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoadingIndicator from 'react-loading-indicator';

class Exchange extends Component {
  constructor(props){
    super(props);
    this.state = {tokenAmount: 0}
  }

  render(){
    return (
      <div>
        {this.props.user ?
          <div>
            <h1>Your token Count {this.props.user}</h1>
            <h3>Buy Tokens: </h3>
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
