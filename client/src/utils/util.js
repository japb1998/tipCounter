import React, { useState} from 'react';


export const useForm = (callBack,initialState={}) =>{
const [values,setValues] = useState(initialState);

function onChange({target}){
const name = target.name;
const value = target.type === "checkbox" ? target.checked : target.value;
setValues({...values,[name]:value})
}

const onSubmit = event =>{
    event.preventDefault();
    callBack();
}

return {
    onChange,
    onSubmit,
    values
}
}