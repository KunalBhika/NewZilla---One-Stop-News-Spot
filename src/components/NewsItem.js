import React, { Component } from 'react'

export class NewItem extends Component {
  render() {
    let {title, desc, imgUrl, url, date, author} = this.props;
    let dateToShow = new Date(date).toGMTString();
    return (
      <div className="card my-4">
        <img className="card-img-top" src={imgUrl} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <span className="font-weight-bold">Date : <span className="font-weight-normal">{dateToShow.slice(0,16)}</span> </span> 
          <br />
          <span className="font-weight-bold">Author : <span className="font-weight-normal">{author?author:"Unknown"}</span> </span>
          <p className="card-text my-3">{desc}..</p>
          <a href={url} className="btn btn-sm btn-primary">Read more..</a>
        </div>
      </div>
    )
  } 
}

export default NewItem;