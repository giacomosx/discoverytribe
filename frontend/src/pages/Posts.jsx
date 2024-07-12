import React, {useEffect} from 'react';
import Layout from "../layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {userState} from "../redux/loginSlice";
import {userPostsState, errorPostsState, loadingPostsState} from "../redux/postsSlice";
import {getPosts} from "../redux/actions/postsActions";
import PostCard from "../components/postcard/PostCard";
import Alerts from "../components/alerts/Alerts";
import Spinner from "../components/spinner/Spinner";

const Posts = () => {
    const user = useSelector(userState)
    const posts = useSelector(userPostsState);
    const error = useSelector(errorPostsState);
    const loading = useSelector(loadingPostsState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts(user._id))
    }, [user, dispatch])

    console.log(posts)

    return (
        <Layout>
            <section
                className="container max-w-2xl h-fit">
                {loading && <Spinner/>}
                {!loading && error && <Alerts type={'danger'}>Something went wrong!</Alerts>}
                <div className={'grid grid-cols-1 gap-8 lg:grid-cols-2 '}>
                    {!loading && posts.length > 0 && posts.map(post => {
                        return <PostCard key={post._id} post={post}/>
                    })}
                    {!loading && posts.length === 0 && (
                        <div className={'w-full col-span-4'}>
                            <Alerts>Nothing to see yet!</Alerts>
                        </div>)
                    }
                </div>
            </section>
        </Layout>
    );
};

export default Posts;
