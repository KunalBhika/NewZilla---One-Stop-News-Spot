import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalShown: 6,
            totalResults: 0,
            isLoading: true
        }
        document.title = "NewsZilla - " + this.props.category;
    }

    async updateNews() {
        this.setState({ totalShown: this.state.totalShown + this.props.pageSize, isLoading: true });
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9180273d9b564bb3b4b437b702785a4a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, isLoading: false });
    }

    async componentDidMount() {
        this.updateNews();
    }

    onNextBtn = async () => {
        this.setState({ page: this.state.page + 1 });
        setTimeout(() => {    // Added this small delay to give some time to this.state.page to update.
            this.updateNews();
        }, 90)
    }

    // onPrevBtn = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     setTimeout(() => {     // Added this small delay to give some time to this.state.page to update.
    //         this.updateNews();
    //     }, 90)
    // }

    render() {
        const defaultImage = "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=2048x2048&w=is&k=20&c=ZyHCcX0F_DVM-r_R_vG8OX_CqYLb-G16afTyaVGtB3o=";
        return (
            <>
                <div className="container my-3">
                    <h2 className="mainTitle text-center" style={{ margin: '40px 0px' }}>NewsZilla - top {this.props.category} headlines</h2>

                    {/* if page is loading then show spinner else show actual data */}

                    <InfiniteScroll
                        style={{overflow : 'none'}}
                        dataLength={this.state.articles.length} //This is important field to render the next data
                        next={this.onNextBtn}
                        hasMore={this.state.totalShown < this.state.totalResults}
                        loader={<Spinner/>}
                        endMessage={
                            <p style={{ textAlign: 'center', fontSize : '14px', color: 'grey' }}>
                                You have fulfilled your daily {this.props.category} news dose
                            </p>
                        }
                    >
                        <div className="row">
                            {
                                this.state.articles.map((element) => (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title} desc={element.description ? element.description.slice(0, 100) : " "} imgUrl={element.urlToImage ? element.urlToImage : defaultImage}
                                            url={element.url} date={element.publishedAt.slice(0, 10)} author={element.author} />
                                    </div>
                                ))
                            }
                        </div>
                    </InfiniteScroll>


                </div>
                {/* <div className="container my-5">
                    <button id="prev-btn" className="btn btn-dark mx-2" onClick={this.onPrevBtn} disabled={this.state.page <= 1}>Prev</button>
                    <button id="next-btn" className="btn btn-dark mx-2" onClick={this.onNextBtn} disabled={this.state.totalShown >= this.state.totalResults}>Next</button>
                </div> */}
            </>
        )
    }
}

export default News;