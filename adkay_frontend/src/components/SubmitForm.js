import React, { useState } from "react";
import axios from 'axios'
import "./css/submitform.css"

export default function SubmitForm(){
    const [title, setTitle] = useState("");  // setvariable as *title*, to be changed to *setTitle*, default state useState as blank
    const [genre, setGenre] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [sampleFile, setSampleFile] = useState(null);
    const [errors, setErrors] =useState({})
    const [serverError, setServerError] = useState("")

    const handleSubmit = async (e) =>{
         e.preventDefault()

    const newErrors = {};
    if (!title) newErrors.title = "Required";
    if (!genre) newErrors.genre = "Required";
    if (!synopsis) newErrors.synopsis = "Required";
    if (!sampleFile) newErrors.sampleFile = "Required";
    setErrors(newErrors) // replace error with setError and setError as newErrors(which has been updated with all the errors)
    if (Object.keys(newErrors).length>0) return; // check if there are any erros in newErrors object, and if so return



    // create the variables and use (useState) to set default value before input
    const formData = new FormData()
    formData.append("title", title)
    formData.append("genre", genre)
    formData.append("synopsis", synopsis)
    formData.append("sample_file", sampleFile)
    
    try{
        // Post to backend using axios
        const response = await axios.post('http://127.0.0.1:8000/api/submit/',
                                            formData
                                        );
        // log data
        console.log(response.data);
        alert("Manuscript Submitted Successfully"); 

        // set fields to blank after data is POSTed
        setTitle(""); 
        setGenre("");
        setSynopsis("");
        setSampleFile(null);
        setErrors({});
        setServerError("")
    }
    catch(error){
        console.error( "Full error: ", error.response); // log full error (status, date etc)

        const backendErrors = error.response?.data //error.response extract only data
        
        if (backendErrors){
            const listErrors = {} // create a emplty object to collect the erros
            for (const field in backendErrors){  // loop over the fields
                const frontendField = field === 'sample_file' ? 'sampleFile' : field; // frontend uses sampleFile instead of sample_file
                listErrors[frontendField] = Array.isArray(backendErrors[field]) // if this is an array then
                    ? backendErrors[field][0]  //if true ^^^^
                    : backendErrors[field] // if false ^^^^  
            }
            setErrors(listErrors)


            if (backendErrors.non_field_errors || backendErrors.detail){ //If there are non-field errors OR there is a general detail message, run this block.
                const msg = backendErrors.non_field_errors?.[0] || backendErrors.detail //non_field_errors are arrars so return first value, or if details, return details
                alert(msg)
                setServerError(msg) //set this as a server error
            } 
            else if (Object.keys(listErrors).length > 0) {
                // Show the first field-specific error in alert
                const firstField = Object.keys(listErrors)[0];
                alert(`${firstField}: ${listErrors[firstField]}`);
                setServerError(`${firstField}: ${listErrors[firstField]}`)}

            else{ // if it doesnt work, then
                alert("Submission Error. Please Try Again")
                setServerError("Submission Error. Please Try Again")
            }

        }

    }
}


    


    return(
        <div className="submit-form-container">
            <form onSubmit={handleSubmit}>
            {serverError && <div className="server-error">{serverError}</div>}
            <h2>Submit your Manuscript Here</h2>

            <label>Title:</label>
            <input 
                value={title} 
                type="text" 
                onChange={e => setTitle(e.target.value)}
            />
            {errors.title && <p>{errors.title}</p>}

            <label>Genre:</label>
            <input 
                value={genre} 
                type="text" 
                onChange={e => setGenre(e.target.value)}
            />
            {errors.genre && <p>{errors.genre}</p>} 

            <label>Synopsis:</label>
            <textarea 
                value={synopsis}  
                onChange={e => setSynopsis(e.target.value)}
                rows={4}
            />
            {errors.synopsis && <p>{errors.synopsis}</p>} 

            <label>Manuscript:</label>
            <input 
                type="file" 
                onChange={e => setSampleFile(e.target.files[0])}
            />
            {errors.sampleFile && <p>{errors.sampleFile}</p>}

            <button type="submit">Submit</button>
            </form>
        </div>
    )
}
