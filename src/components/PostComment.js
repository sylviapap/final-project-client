import React, {Component} from 'react';
import { connect } from 'react-redux';
import {API_ROOT, authHeaders} from '../services/api'

class PostComment extends Component{
  state = {
    content: "",
    user_first_name: ""
  }

  handleChange = (event) => {
    this.setState({content: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${API_ROOT}/comments`, {
      method: "POST", 
      headers: authHeaders,
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        map_marker_id: this.props.markerId,
        content: this.state.content
      })
    })
      .then(response => response.json())
      .then(json => {
        this.props.handleCommentPost(event, json);
        this.setState({content: "", user_first_name: ""})
      })
  }

  render() {
    return(
      <form onSubmit ={this.handleSubmit}>
        <textarea
          value={this.state.content}
          onChange={this.handleChange}
          placeholder="Write a comment"
          className="comment-input"
          maxLength="50"/>
        <span className="info">Comments are posted under user's first name, max: 50 characters</span>
        <input className="post" type="submit" value="Post Comment"/>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
		currentUser: state.user.currentUser
	}
}

export default connect(mapStateToProps)(PostComment)