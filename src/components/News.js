import React, { Component } from 'react'
import NewsItem from './NewsItem'
import data from './sampleResult.json';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles : data.articles
        }
    }
    render() {
        return (
            <>
                <div className="container my-3">
                    <h2 className="mainTitle">NewsZilla</h2>
                    <div className="row">
                        
                        {
                            this.state.articles.map((element) => (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} imgUrl={element.urlToImage} url={element.url}/>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </>
        )
    }
}

export default News;