import React, {useEffect, useState} from 'react';
import axiosApi from "../../api/axiosApi";
import {userState} from "../../redux/loginSlice";
import {useSelector} from "react-redux";
import Spinner from "../spinner/Spinner";

const FeedPost = ({content, avatar, username, media, initLikes, id, date}) => {
    const api = new axiosApi()
    const [likes, setLikes] = useState(initLikes);
    const user = useSelector(userState)
    const [alreadyLikes, setAlreadyLikes] = useState(false);
    const [loading, setLoading] = useState(false);

    const postDate = new Date(date);
    const currentTime = new Date();

    const handleLike = async () => {
        setLoading(true)
        setAlreadyLikes(true)
        try {
            const response = await api.patch(`/posts/${id}/like`)

            if (response.likes.length > 0) {
                try {
                    const post = await api.get(`/posts/${id}`)
                    const newLikes = await post.likes
                    await setLikes(newLikes)
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            }

            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    const handleUnLike = async () => {
        setAlreadyLikes(false)
        setLoading(true)
        try {
            const response = await api.patch(`/posts/${id}/unlike`)
            try {
                const post = await api.get(`/posts/${id}`)
                const newLikes = await post.likes
                setLikes(newLikes)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(likes.length > 0){
            likes.forEach((item) => {
                if (user.userId === item._id) {
                    setAlreadyLikes(true)
                }
            })
        }
    }, [likes])

    return (
        <li className="mb-10 ms-6">
            <span
                className="absolute overflow-hidden flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-2 ring-purple-600 dark:ring-gray-900 dark:bg-purple-900">
                <img className="rounded-full shadow-lg" src={avatar} alt="Bonnie"/>
            </span>
            <div
                className="items-center justify-between px-4 py-2 space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center justify-between">
                    <span className={'text-gray-500 dark:text-gray-400 text-sm'}>@{username}</span>
                    <time className="text-xs text-gray-400 sm:mb-0 min-w-fit">{postDate.getDay() === currentTime.getDay() ? 'today' : `${postDate.toDateString()}`}</time>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-4">
                    <img src={media} alt={content} className="rounded-lg max-h-80 w-full object-cover" />
                    <p className={''}>{content}</p>
                </div>
                <div className={`flex items-center ${likes ? 'justify-between' : 'justify-end'}`}>
                    <div className="flex items-center gap-2">
                        {loading && <Spinner size={'w-6 h-6'}/>}
                        {!loading && likes.length > 0 && <span className={'text-sm text-gray-500 dark:text-gray-400'}>Likes:</span>}
                        {!loading && likes.length > 0 && (
                            <div className="flex -space-x-4 rtl:space-x-reverse">
                                {likes.map((item) => (
                                    <img key={item._id} className="w-8 h-8 border-2 border-white dark:border-gray-800 rounded-full "
                                         src={item.avatar} alt=""/>
                                ))}
                            </div>
                        )}
                    </div>
                    {!alreadyLikes ? (
                        <button onClick={handleLike}>
                            <svg
                                className="w-6 h-6 text-xs font-normal text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                            </svg>
                            <span className={'hidden'}>Like</span>
                        </button>
                    ): (
                        <button onClick={handleUnLike}>
                            <svg className="w-6 h-6 text-xs font-normal text-red-400 hover:text-red-800 dark:hover:text-white transition-all"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path
                                    d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                            </svg>

                            <span className={'hidden'}>Like</span>
                        </button>
                    )}
                </div>

            </div>
        </li>
    );
};

export default FeedPost;
