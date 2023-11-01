import React from "react";

interface CheckBoxInterface {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
    id?: number;
    checked: boolean;
    labelContent?: string;
    boxClass?:string;
};

const CheckBox = ({ onChange, id, checked, labelContent,boxClass }: CheckBoxInterface) => {
    return (
        <>
            <input
                onChange={(e) => (onChange && id) && onChange(e, id)}
                name="selectAll"
                type="checkbox"
                checked={checked}
                className={`${boxClass} w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:rounded-md`}
            />
            {labelContent && <label htmlFor="default-checkbox" className="ml-2 font-bold text-md text-gray-600">{labelContent}</label>}
        </>
    )
}

export default CheckBox