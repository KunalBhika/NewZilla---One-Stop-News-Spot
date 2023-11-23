import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [totalShown, setTotalShown] = useState(6);

    const updateNews = async () => {
        props.setProgress(30);

        setTotalShown(totalShown + props.pageSize);

        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);  

        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        document.title = "NewsZilla - " + props.category; 
    }, [])

    const onNextBtn = async () => {
        setTimeout(() => {    // Added this small delay to give some time to this.state.page to update.
            updateNews();
        }, 90)
    }

    const defaultImage = "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=2048x2048&w=is&k=20&c=ZyHCcX0F_DVM-r_R_vG8OX_CqYLb-G16afTyaVGtB3o=";
    return (
        <>
            <div className="container my-3">
                <h2 className="mainTitle text-center" style={{ margin: '100px 0px 40px 0px' }}>NewsZilla - top {props.category} headlines</h2>

                {/* if page is loading then show spinner else show actual data */}
                {isLoading ? <Spinner /> :
                    <InfiniteScroll
                        style={{ overflow: 'none' }}
                        dataLength={articles.length} //This is important field to render the next data
                        next={onNextBtn}
                        hasMore={totalShown < totalResults}
                        loader={<Spinner />}
                        endMessage={
                            <p style={{ textAlign: 'center', fontSize: '14px', color: 'grey' }}>
                                You have fulfilled your daily {props.category} news dose
                            </p>
                        }
                    >
                        <div className="row">
                            {
                                articles.map((element) => (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title} desc={element.description ? element.description.slice(0, 100) : " "} imgUrl={element.urlToImage ? element.urlToImage : defaultImage}
                                            url={element.url} date={element.publishedAt.slice(0, 10)} author={element.author} />
                                    </div>
                                ))
                            }
                        </div>
                    </InfiniteScroll>}


            </div>
            {/* <div className="container my-5"> uncomment for next and prev button functionality and comment above infinite scroll component
                    <button id="prev-btn" className="btn btn-dark mx-2" onClick={this.onPrevBtn} disabled={this.state.page <= 1}>Prev</button>
                    <button id="next-btn" className="btn btn-dark mx-2" onClick={this.onNextBtn} disabled={this.state.totalShown >= this.state.totalResults}>Next</button>
                </div> */}
        </>
    )

}

export default News;