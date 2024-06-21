import React from 'react';

const UploadAvatar = ({onChange, preview, onClick}) => {
    return (
        <>
            {!preview ? (
                <>
                    <label htmlFor="dropzone-file"
                           className="flex flex-col items-center justify-center rounded-full w-52 h-52 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                        </div>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span
                            className="font-semibold">Click to upload</span> or
                            drag and drop</p>
                        <input id="dropzone-file" type="file" className="hidden" onChange={onChange} accept="image/*"
                               required/>
                    </label>

                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </>
            ) : (
                <img className="w-52 h-52 rounded-full shadow-lg object-cover"
                     src={preview} alt="Avatar preview"/>
            )}
            {preview && (
                <button type={'button'}
                        className="text-xs text-gray-800 dark:text-gray-400 underline font-semibold"
                        onClick={onClick}>
                    Change Image </button>
            )}

        </>
    )
        ;
};

export default UploadAvatar;
