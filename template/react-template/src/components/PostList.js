import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostList extends Component {
  renderPost(item, index) {
    return (
      <Link to="post" className="post-wrap" key={index}>
        <article className="post">{item.name}</article>
        <div className="post-mask" />
      </Link>
    )
  }

  render() {
    return (
      <div className="post-list">
        {this.props.postList.map(this.renderPost)}
      </div>
    )
  }
}

export default PostList
