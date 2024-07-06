import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {errorPostsState, loadingPostsState, userPostsState} from "../../redux/postsSlice";
import {getPosts} from "../../redux/actions/postsActions";
import Spinner from "../spinner/Spinner";
import PostCard from "../postcard/PostCard";
import Alerts from "../alerts/Alerts";
import {useParams} from "react-router-dom";

const UserPostsPanel = () => {
    const params = useParams();
    const posts = useSelector(userPostsState);
    const error = useSelector(errorPostsState);
    const loading = useSelector(loadingPostsState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts(params.id))
    }, [params, dispatch])

    return (
        <section
            className="container max-w-2xl h-fit mt-8">
            {loading && <Spinner/>}
            <div className={'grid grid-cols-1 gap-8 lg:grid-cols-2 '}>
                {!loading && posts.length > 0 && posts.map(post => {
                    return <PostCard key={post._id} post={post}/>
                })}
                {!loading && posts.length === 0 && (
                    <div className={'w-full col-span-4'}>
                        <Alerts>Nothing to see yet!</Alerts>
                    </div>)
                }
                {!loading && error && <Alerts type={'danger'}>Something went wrong!</Alerts>}
            </div>
        </section>
    );
};

export default UserPostsPanel;
