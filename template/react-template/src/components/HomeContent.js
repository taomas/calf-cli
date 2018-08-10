import React, { Component } from 'react'
import PostList from './PostList'

class HomeContent extends Component {
  constructor() {
    super()
    this.postList = [
      { name: '测试' },
      { name: '测试' },
      { name: '测试' },
      { name: '测试' },
      { name: '测试' },
      { name: '测试' },
      { name: '测试' },
      { name: '测试' }
    ]
  }

  renderHeader() {
    return (
      <header className="header">
        <h1 className="header-title">博客列表</h1>
        <h3 className="header-subtitle">下面是一些文章的列表</h3>
      </header>
    )
  }

  renderContent() {
    return <PostList postList={this.postList} />
  }

  renderButton() {
    let showReadMore = this.postList.length > 6
    return showReadMore ? (
      <button className="button button-readmore">查看更多</button>
    ) : null
  }

  render() {
    return (
      <div className="home-content">
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderButton()}
      </div>
    )
  }
}

export default HomeContent
