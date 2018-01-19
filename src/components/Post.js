import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CaptionForm from './CaptionForm'

const cardStyle = {
  width: '30vw'
}

const Post = props => (
  <Card style={cardStyle}>
    <CardHeader
      title={props.username}
    />
    <CardMedia
      overlay={<CardTitle title={'Token pot: ' + props.tokenPot} />}
    >
      <img src={props.postUrl} alt="" />
    </CardMedia>
    {!props.isPreview &&
      <div>
        <div>
          <CardTitle title="Leave a Caption"/>
          <CardActions>
            <CaptionForm />
          </CardActions>
        </div>
      </div>
    }
  </Card>
)

export default Post;
