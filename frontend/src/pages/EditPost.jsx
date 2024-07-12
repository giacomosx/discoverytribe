import React, {useEffect, useState} from 'react';
import axiosApi from "../api/axiosApi";
import Label from "../components/label/Label";
import Button from "../components/button/Button";
import Spinner from "../components/spinner/Spinner";
import Layout from "../layout/Layout";
import {useParams} from "react-router-dom";

const EditPost = () => {
    const api = new axiosApi();
    const params = useParams()
    const [defaultPost, setDefaultPost] = useState(null);
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const getPost = async () => {
        try{
            const post = await api.get('/posts/' + params.id);
            if(post) {
                setMedia(post.media)
                setDefaultPost(post)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleContent = (e) => {
        setContent(e.target.value);
    }

    const extractHashtags = async (string) => {
        const regex = /#\w+/g;
        const matches = await string.match(regex);
        const hashtags = matches ? matches : [];
        setTags(hashtags);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        extractHashtags(content)
        try {
            setLoading(true);
            const edited = {
                content,
                tags
            }
            const updatePost = await api.patch(`/posts/${params.id}/edit`, edited)
            if (updatePost) {
                setResponse('Post successfully edited!')
            }
        } catch (e) {
            console.log(e)
            setError(true)
            setResponse('Something went wrong!');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <Layout>
            <section
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700  h-fit container max-w-2xl">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit post content</h2>
                <form className="p-4 md:p-5 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <img className="rounded-lg max-h-64 object-cover w-full overflow-hidden" src={media}
                             alt="Media preview"/>
                    </div>
                    <div className="mb-4 space-y-4">
                        <div>
                            <Label htmlFor={'content'}>Content</Label>
                            <textarea rows="4"
                                      onChange={handleContent}
                                      defaultValue={defaultPost?.content}
                                      name="content"
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Write your post content here"></textarea>
                        </div>
                    </div>
                    <div className={'flex items-center justify-between flex-wrap gap-4 columns-2'}>
                        <div className={'max-w-xs'}>
                            <Button variants={` rounded flex`} type={'submit'} >
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                          clipRule="evenodd"></path>
                                </svg>
                                <span>Update post</span>
                            </Button>
                        </div>
                        <div className={'max-w-xs'}>
                            {loading && <Spinner size={'w-6 h-6'}/>}
                            {!error && response && (
                                <span className={'text-green-800 dark:text-green-400 text-sm flex items-center gap-2'}>
                                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    {response}
                                </span>
                            )}
                            {error && (
                                <span className={'text-red-800 dark:text-red-400 text-sm'}>
                                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    {response}
                                </span>
                            )}
                        </div>
                    </div>
                </form>

            </section>
        </Layout>
    );
};

export default EditPost;