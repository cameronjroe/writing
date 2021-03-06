
import React from 'react'

import bass from '../css/base.css'

class Head extends React.Component {

  render () {
    var post = this.props.post
    var keywords = this.props.keywords
    if (post && post.tags) {
      keywords = keywords.concat(post.tags)
    }
    var description
    if (post && post.excerpt) {
      description = post.excerpt
    } else {
      description = this.props.description
    }
    return (
      <head>
        <meta charSet='utf-8' />
        <title>{post ? (post.title + ' | ' + this.props.title) : this.props.title}</title>
        <meta name='description' content={description} />
        <meta name='author' content={this.props.author} />
        <meta name='keywords' content={keywords.join()} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <style dangerouslySetInnerHTML={{ __html: bass }} />
      </head>
    )
  }

}

Head.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  author: React.PropTypes.string,
  css: React.PropTypes.string
}

export default Head

