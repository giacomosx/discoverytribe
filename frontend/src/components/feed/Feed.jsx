import React, {useEffect} from 'react';
import FeedPost from "../feedpost/FeedPost";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {getUserFeed} from "../../redux/actions/feedAction";
import {dataFeed, isErrorFeed, isLoadingFeed} from "../../redux/userFeedSlice";
import Spinner from "../spinner/Spinner";
import Alerts from "../alerts/Alerts";
import BreadCrumb from "../breadcrumb/BreadCrumb";
import {Link} from "react-router-dom";

const Feed = () => {
    const isLoading = useSelector(isLoadingFeed);
    const isError = useSelector(isErrorFeed);
    const data = useSelector(dataFeed);
    const dispatch = useDispatch();
    console.log(data);


    useEffect(() => {
        dispatch(getUserFeed())
    }, [dispatch])

    return (
        <>
            <div className={'flex flex-col container max-w-2xl'}>

                {isLoading && (
                    <Spinner/>
                )}
                {isError && (
                    <Alerts type={'danger'}>
                        {data}
                    </Alerts>
                )}
                {!isLoading && data.posts?.length > 0 && (
                    <>
                        <ol className="relative border-s border-gray-200 dark:border-gray-700">
                            {data.posts.map((feed) => (
                                <FeedPost key={feed._id}
                                          postUser={feed.userId}
                                          date={feed.createdAt}
                                          id={feed._id}
                                          initLikes={feed.likes}
                                          avatar={feed.userId.avatar}
                                          content={feed.content}
                                          media={feed.media}/>
                            ))}
                        </ol>
                    </>
                )}
                {!isLoading && data.posts?.length === 0 && (
                    <div className="py-8 text-center ">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 xl:text-5xl dark:text-white">The
                            world is at your fingertips</h1>
                        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Haven't
                            started your journey with us yet? Write your first post and tell us about yourself, or find
                            inspiration by exploring the profiles of travelers from around the globe.</p>
                        <span className="inline-block font-semibold text-base lg:text-xl">Ready for an adventure?</span>
                        <div className={'flex flex-wrap mt-8 gap-4 items-center justify-center'}>
                            <div
                                className="bg-white shadow-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-8 max-w-xs flex flex-col items-center">
                                <svg className="w-12 h-12 text-gray-800 dark:text-white mb-6" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                     viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z"
                                          clipRule="evenodd"/>
                                </svg>

                                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">Post a photo of
                                    the place you dream of visiting.</p>
                                <Link to={'/post/create'}
                                      className="text-purple-600 dark:text-purple-500 hover:underline font-medium text-lg inline-flex items-center">Start
                                    now
                                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </Link>
                            </div>
                            <div
                                className="bg-white shadow-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-8 max-w-xs flex flex-col items-center">
                                <svg
                                    className="w-12 h-12 text-gray-800 dark:text-white mb-6"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M8.64 4.737A7.97 7.97 0 0 1 12 4a7.997 7.997 0 0 1 6.933 4.006h-.738c-.65 0-1.177.25-1.177.9 0 .33 0 2.04-2.026 2.008-1.972 0-1.972-1.732-1.972-2.008 0-1.429-.787-1.65-1.752-1.923-.374-.105-.774-.218-1.166-.411-1.004-.497-1.347-1.183-1.461-1.835ZM6 4a10.06 10.06 0 0 0-2.812 3.27A9.956 9.956 0 0 0 2 12c0 5.289 4.106 9.619 9.304 9.976l.054.004a10.12 10.12 0 0 0 1.155.007h.002a10.024 10.024 0 0 0 1.5-.19 9.925 9.925 0 0 0 2.259-.754 10.041 10.041 0 0 0 4.987-5.263A9.917 9.917 0 0 0 22 12a10.025 10.025 0 0 0-.315-2.5A10.001 10.001 0 0 0 12 2a9.964 9.964 0 0 0-6 2Zm13.372 11.113a2.575 2.575 0 0 0-.75-.112h-.217A3.405 3.405 0 0 0 15 18.405v1.014a8.027 8.027 0 0 0 4.372-4.307ZM12.114 20H12A8 8 0 0 1 5.1 7.95c.95.541 1.421 1.537 1.835 2.415.209.441.403.853.637 1.162.54.712 1.063 1.019 1.591 1.328.52.305 1.047.613 1.6 1.316 1.44 1.825 1.419 4.366 1.35 5.828Z"
                                          clipRule="evenodd"/>
                                </svg>

                                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">Explore our
                                    community and find users who share your passion.</p>
                                <Link to={'/explore'}
                                      className="text-purple-600 dark:text-purple-500 hover:underline font-medium text-lg inline-flex items-center">Start
                                    now
                                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </Link>
                            </div>

                        </div>

                    </div>
                )}
            </div>
        </>
    )
        ;
};

export default Feed;
