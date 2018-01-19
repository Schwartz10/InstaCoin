import React, { Component } from 'react'
import {connect} from 'react-redux'

const images = ["https://i.ytimg.com/vi/2Vl_-W2rOv8/maxresdefault.jpg",
"http://proparazziphotobooths.com/wp-content/uploads/2015/08/new-years-eve.jpg",
"http://s1.thingpic.com/images/jy/LLvCJhrRKEGB33Z9qGHkXNCR.jpeg",
"https://i.ytimg.com/vi/PEeZZUucMVY/hqdefault.jpg"
]

class Seed extends Component {
  constructor(props){
    super(props)
  }

  seed = (seedFunc, accounts) => {
    console.log(seedFunc, accounts)
    seedFunc("Jon","https://i.ytimg.com/vi/2Vl_-W2rOv8/maxresdefault.jpg",
    50, {from: accounts[0]})
    // this.props.contract.seed("Rachel", "http://proparazziphotobooths.com/wp-content/uploads/2015/08/new-years-eve.jpg",
    // 5, {from: this.props.accounts[1]})
  }

  render(){
    return(
      <div>

      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    contract: state.contract,
    accounts: state.accounts
  }
}

export default connect(mapState)(Seed)
