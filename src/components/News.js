import React, { Component } from 'react'
import NewsItem from './NewsItem'
import data from './sampleResult.json';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles : []
        }
    }

    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9180273d9b564bb3b4b437b702785a4a';
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles : parsedData.articles});
    }

    render() {
        let defaultImage = "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=2048x2048&w=is&k=20&c=ZyHCcX0F_DVM-r_R_vG8OX_CqYLb-G16afTyaVGtB3o=";
        return (
            <>
                <div className="container my-3">
                    <h2 className="mainTitle">NewsZilla</h2>
                    <div className="row">
                        
                        {
                            this.state.articles.map((element) => (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title.slice(0,50)} desc={element.description?element.description.slice(0,100):" "} imgUrl={element.urlToImage?element.urlToImage:defaultImage} url={element.url}/>
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