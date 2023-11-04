import React, { Component } from 'react'

export class NewItem extends Component {
  render() {
    let {title, desc, imgUrl, url} = this.props;
    return (
      <div className="card my-4" style={{width: "18rem"}}>
        <img className="card-img-top" src={imgUrl} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
          <a href={url} className="btn btn-sm btn-primary" target="_blank">Read more..</a>
        </div>
      </div>
    )
  } 
}

export default NewItem;