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
                    <TextInputField  defaultValue={user.name}/>
                </div>
            </form>
        </div>
    );
};

export default EditUserInfo;
