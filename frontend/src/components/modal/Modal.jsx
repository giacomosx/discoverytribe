import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setPostModal, postModal} from "../../redux/postModalSlice";
import {getPosts} from "../../redux/actions/postsActions";
import {userState} from "../../redux/loginSlice";
import Button from "../button/Button";
import Label from "../label/Label";
import axiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";
import {useLocation} from "react-router-dom";
import {getUserFeed} from "../../redux/actions/feedAction";

const Modal = () => {
    const api = new axiosApi();
    const dispatch = useDispatch();
    const modalState = useSelector(postModal)
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const user = useSelector(userState);
    const location = useLocation();

    const handleClose = () => {
        if (location.pathname === "/posts" && response) {
            dispatch(getPosts(user._id))
        }
        if (location.pathname === "/me" && response) {
            dispatch(getUserFeed())
        }
        dispatch(setPostModal(false))
        setContent('')
        setMedia(null)
        setPreview(null)
        setTags(null)
        setResponse(null)
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
    const handleFile = (e) => {

        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPreview(e.target.result);
                setMedia(file);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
            setMedia(null);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        extractHashtags(content)
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("media", media);
            formData.append("content", content);
            if (tags.length > 0) {
                formData.append("tags", tags)
            }
            const createPost = await api.post('/posts/create', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if (createPost) {
                setResponse('Post successfully published!')
            }

        } catch (e) {
            console.log(e)
            setError(true)
            if (e.response.data.error) {
                setResponse(e.response.data.error)
            }
            if (e.response.data.errors) {
                setError(true)
                setResponse('Something went wrong!')
            }
            ;
        } finally {
            setLoading(false)
        }
    }


    return (
        <div aria-hidden="true"
             className={`${modalState ? 'visible' : 'hidden'} fixed z-[100] w-full top-0 left-0 h-full bg-black bg-opacity-80 `}>
            <div className="p-4 flex justify-center items-center h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full sm:max-w-md">
                    <div
                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create a new post
                        </h3>
                        <button onClick={handleClose}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Modal;
