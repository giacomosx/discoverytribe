import React, {useState} from 'react';
import AxiosApi from "../../api/axiosApi";
import UploadAvatar from "../uploadavatar/UploadAvatar";
import {useDispatch} from "react-redux";
import {getUserInfo} from "../../redux/actions/userActions";
import Button from "../button/Button";
import Spinner from "../spinner/Spinner";
import Alerts from "../alerts/Alerts";

const ChangeUserAvatar = ({data}) => {
    const api = new AxiosApi()
    const [preview, setPreview] = useState(data);
    const [avatar, setAvatar] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const dispatch = useDispatch();

    const resetPreview = () => {
        setAvatar(null);
        setPreview(null);
    }

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPreview(e.target.result);
                setAvatar(file);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
            setAvatar(null);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("avatar", avatar);

            const uploadAvatar = await api.patch('/user/me/avatar', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if (uploadAvatar) {
                setResponse('Avatar changed successfully!')
            }

        } catch (e) {
            console.log(e)
            setError(true);
            setResponse('Something went wrong!')
        } finally {
            setLoading(false)
            dispatch(getUserInfo())
        }
    }

    return (
        <div
            className={'avatar p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Change avatar</h2>
            {loading && <Spinner/>}
            {!loading && error && <Alerts type={'danger'}>{response}</Alerts>}
            {!loading && !error && (
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center flex-col items-center mb-2 space-y-2">
                        <UploadAvatar preview={preview} onChange={handleFile} onClick={resetPreview}/>
                        {avatar && <Button type={'submit'} variants={'rounded'}>Update</Button>}
                    </div>
                </form>
            )
            }
        </div>
    )
        ;
};

export default ChangeUserAvatar;
