import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout";
import AxiosApi from "../api/axiosApi";
import {useSession} from "../hooks/useSession";
import Spinner from "../components/spinner/Spinner";
import Alerts from "../components/alerts/Alerts";
import PostCard from "../components/postcard/PostCard";

const LikedPosts = () => {
    const api = new AxiosApi()
    const user = useSession()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState(null);
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/user/${user.decodedSession.userId}/liked-posts`)
            const data = await response.liked_posts;
            setPosts(data)
        } catch (e) {
            console.log(e)
            setError(true)
            setResponse('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <Layout>
            <section
                className="h-fit container max-w-5xl">
                {loading && <Spinner />}
                {!loading && error && <Alerts type="danger">{response}</Alerts>}
                {!loading && !error && posts.length > 0 && (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        {/* eslint-disable-next-line array-callback-return */}
                        {posts.map((post) => {
                            if (post.media) {
                                return (
                                    <PostCard post={post} />
                                )
                            }
                        })}
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default LikedPosts;
