import React, {useEffect} from 'react';
import FeedPost from "../feedpost/FeedPost";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {getUserFeed} from "../../redux/actions/feedAction";
import {dataFeed, isErrorFeed, isLoadingFeed} from "../../redux/userFeedSlice";
import Spinner from "../spinner/Spinner";
import Alerts from "../alerts/Alerts";

const Feed = () => {
    const isLoading = useSelector(isLoadingFeed);
    const isError = useSelector(isErrorFeed);
    const data = useSelector(dataFeed);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUserFeed())
    }, [dispatch])

    return (
        <div className={'flex flex-col container max-w-2xl'}>
            {isLoading && (
                <Spinner/>
            )}
            {isError && (
                <Alerts type={'danger'}>
                    {data}
                </Alerts>
            )}
            {!isLoading && data.posts && (
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    {data.posts.map((feed) => (
                        <FeedPost key={feed._id}
                                  date={feed.createdAt}
                                  id={feed._id}
                                  initLikes={feed.likes}
                                  avatar={feed.userId.avatar}
                                  username={feed.userId.username}
                                  content={feed.content}
                                  media={feed.media}/>
                    ))}
                </ol>
            )}
            {!isLoading && !data.posts && (
                <p className={'inline-flex items-center gap-2 justify-center'}>
                    <svg className="flex-shrink-0 w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    {data}
                </p>
            )}
        </div>
    )
        ;
};

export default Feed;
