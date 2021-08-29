import React from "react";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
const Extra = () => {
  const [news, setnews] = React.useState({
    articles: [],
    totalResults: 0,
    page: 1,
  });
  const fetchData = async () => {
    var axios = require("axios").default;
    var options = {
      method: "GET",
      url: "https://free-news.p.rapidapi.com/v1/search",
      params: { q: "pakistan", lang: "en", page: news.page, page_size: "25" },
      headers: {
        "x-rapidapi-host": "free-news.p.rapidapi.com",
        "x-rapidapi-key": "884f9315eemshfc17ca4d618877ap1a09aajsnf3bfa3f6d501",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setnews({
          totalResults: response.data.total_hits,
          articles: news.articles.concat(response.data.articles),
          page: news.page + 1,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, [0]);

  return (
    <>
      {Object.keys(news.articles).length === 0 ? (
        <>{<Spinner />}</>
      ) : (
        <section class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
            <div class="-my-8 divide-y-2 divide-gray-100">
              <InfiniteScroll
                dataLength={news.page * 25}
                next={fetchData}
                hasMore={true}
                loader={<Spinner />}
              >
                {news.articles.map((n) => {
                  return (
                    <>
                      {n.media === null ? (
                        console.log("")
                      ) : (
                        <div class="py-8 flex flex-wrap md:flex-nowrap">
                          <img
                            alt="Image"
                            style={{
                              width: "260px",
                              height: "200px",
                            }}
                            class="lg:w-1/2 w-1/2 lg:h-auto h-64 object-cover object-center rounded"
                            src={n.media}
                          ></img>

                          <div class="md:flex-grow mx-10">
                            <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                              {n.title}
                            </h2>
                            <p class="leading-relaxed">{n.summary}</p>
                            <a
                              href={n.link} target="_blank"
                              class="text-red-500 inline-flex items-center mt-4"
                            >
                              Learn More
                              <svg
                                class="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </InfiniteScroll>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Extra;
