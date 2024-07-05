import React from 'react';
import Label from "../label/Label";
import TextInputField from "../textinputfield/TextInputField";

const EditUserInfo = ({user}) => {
    return (
        <div className={'details'}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Change your info details</h2>
            <form className="space-y-6">
                <div>
                    <Label htmlFor={'name'}>Name:</Label>
                    <TextInputField defaultValue={user.name}/>
                </div>
                <div>
                    <Label htmlFor={'name'}>Lastname:</Label>
                    <TextInputField defaultValue={user.name}/>
                </div>
                <div>
                    <Label htmlFor={'name'}>Username:</Label>
                    <TextInputField defaultValue={user.name}/>
                </div>
                <div>
                    <Label htmlFor={'name'}>Description:</Label>
                    <textarea rows="4"
                              name="description"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Type a simple description about you..."></textarea>
                </div>
            </form>
        </div>
    );
};

export default EditUserInfo;
