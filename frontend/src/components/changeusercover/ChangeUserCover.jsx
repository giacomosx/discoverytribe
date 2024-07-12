import React, {useState} from 'react';
import Button from "../button/Button";
import AxiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";
import {useDispatch} from "react-redux";
import {getUserInfo} from "../../redux/actions/userActions";

const ChangeUserCover = ({preview}) => {
    const api = new AxiosApi();
    const [cover, setCover] = useState(null);
    const [previewImage, setPreviewImage] = useState(preview);
    const [newPreview, setNewPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editCover, setEditCover] = useState(false);
    const [response, setResponse] = useState(null);
    const [fileSize, setFileSize] = useState(0);
    const [disabled, setDisabled] = useState(true)
    const maxSize = 2266274;
    const dispatch = useDispatch();

    const handleCover = (e) => {
        const coverFile = e.target.files[0];
        if (coverFile && coverFile.type.startsWith('image/')) {
            const coverReader = new FileReader();
            coverReader.onload = function (e) {
                setNewPreview(e.target.result);
                setCover(coverFile);
                setFileSize(coverFile.size)
            };
            if (coverFile.size < maxSize) {
                setDisabled(false)
            }
            coverReader.onerror = function (e) {
                setError('Failed to read file');
            };
            coverReader.readAsDataURL(coverFile);
        } else {
            setNewPreview(null);
            setCover(null);
        }
    };

    const resetPreview = () => {
        setCover(null);
        setNewPreview(null);
        setFileSize(0)
        setDisabled(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!cover) {
            setError(true);
            setResponse('No file selected')
            setLoading(false);
            return;
        }
        try {
            const formData = new FormData();
            formData.append("cover", cover);

            const changeCover = await api.patch(`/user/me/cover`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (changeCover) {
                setResponse('Cover changed successfully!')
                setEditCover(false);
            }
        } catch (e) {
            console.error('Error uploading file:', e);
            setError(true);
            setResponse('Failed to upload file')
        } finally {
            setLoading(false);
            dispatch(getUserInfo())
        }
    };


    return (
        <div
            className={'cover p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'}>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Change cover</h2>
                {!editCover ? (
                    <button
                        className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
                        onClick={() => {
                            setEditCover(!editCover)
                            setPreviewImage(preview)
                        }}>
                        Edit
                    </button>
                ) : (
                    <button
                        className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
                        onClick={() => {
                            setEditCover(!editCover)
                            setPreviewImage(preview)
                            setNewPreview(null)
                        }}>
                        Cancel
                    </button>
                )}
            </div>
            {!loading && previewImage && !editCover && (
                <img
                    className="preview rounded-lg h-56 w-full object-cover"
                    src={previewImage}
                    alt="Preview"
                />
            )}
            <form onSubmit={handleSubmit}>
                {editCover && !newPreview && (
                    <>
                        <label
                            htmlFor="dropzone-file"
                            className="h-56 flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                <span className="font-semibold">Click to upload a cover</span> or drag and drop
                            </p>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                name="cover"
                                onChange={handleCover}
                                accept="image/*"/>
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            SVG, PNG, JPG or GIF (MAX. 600x400px)
                        </p>
                    </>
                )}

                {newPreview && (
                    <>
                        <img
                            className="preview rounded-lg h-56 w-full object-cover"
                            src={newPreview}
                            alt="Preview"/>
                        {fileSize > maxSize && (
                            <p className={'text-red-500 dark:text-red-800 text-sm mt-2'}>Too big image!</p>
                        )}
                        <button type={'button'}
                                onClick={resetPreview}
                                className="text-xs text-gray-800 dark:text-gray-400 underline font-semibold">Change
                            Image
                        </button>
                    </>
                )}

                {cover && (
                    <div className="justify-between flex mt-4 items-center">
                        <div>
                            {!response && (
                                <Button variants="rounded shrink-0" type="submit" disabled={disabled}>Update</Button>
                            )}
                            {response && (
                                <Button variants="rounded shrink-0" type="button" onClick={() => {
                                    setCover(null)
                                    setNewPreview(null)
                                    setEditCover(true)
                                    setResponse(null)
                                }}>Change</Button>
                            )}
                        </div>
                        {loading && <Spinner/>}
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
                )}
            </form>
        </div>
    );
};

export default ChangeUserCover;
