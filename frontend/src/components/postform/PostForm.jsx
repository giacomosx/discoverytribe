import React, {useState} from 'react';
import Button from "../button/Button";
import Label from "../label/Label";
import axiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";

const PostForm = () => {
    const api = new axiosApi();
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);


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
        <section
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700  h-fit container max-w-2xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create a new post</h2>
            <form className="p-4 md:p-5 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    {!preview ? (
                        <>
                            <label htmlFor="dropzone-file"
                                   className="h-64 flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                         aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center"><span
                                    className="font-semibold">Click to upload</span> or
                                    drag and drop</p>
                                <input id="dropzone-file" onChange={handleFile} type="file" className="hidden"
                                       accept="image/*" required/>
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                600x600px)</p>
                        </>
                    ) : (
                        <img className="rounded-lg max-h-64 object-cover w-full overflow-hidden" src={preview}
                             alt="Media preview"/>
                    )}
                </div>
                <div className="mb-4 space-y-4">
                    <div>
                        <Label htmlFor={'content'}>Content</Label>
                        <textarea rows="4"
                                  onChange={handleContent}
                                  name="content"
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write your post content here"></textarea>
                    </div>
                </div>
                <div className={'flex items-center justify-between'}>
                    <Button variants={'rounded flex'} type={'submit'}>
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                  clipRule="evenodd"></path>
                        </svg>
                        <span>Add new post</span>
                    </Button>
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
            </form>

        </section>

    );
};

export default PostForm;
