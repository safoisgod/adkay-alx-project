import React, { useState } from "react";
import axios from 'axios'

export default function SubmitForm(){
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [sampleFile, setSampleFile] = useState(null);

    const handleSubmit = async (e) =>{
         e.preventDefault()
    if (!title || !genre || !synopsis || !sampleFile){
        alert("Kindly fill out all fields")
        return;
    }

    // create the variables and use (useState) to set default value before input
    const formData = new FormData()
    formData.append("title", title)
    formData.append("genre", genre)
    formData.append("synopsis", synopsis)
    formData.append("sample_file", sampleFile)
    
    try{
        // Post to backend using axios
        const response = await axios.post('http://127.0.0.1:8000/api/submit/',
                                            formData, 
                                            {headers:{"Content-Type": "multipart/form-data"}}
                                        );
        // log data
        console.log(response.data);
        alert("Manuscript Submitted Successfully"); 

        // set fields to blank after data is POSTed
        setTitle(""); 
        setGenre("");
        setSynopsis("");
        setSampleFile("");
    }
    catch(error){
        console.log(error)
        alert("Submission Failed")
    }
}


    


    return(
        <form onSubmit={handleSubmit}>
            <h2>Sumit your Manuscript Here</h2>

            <label>Title:</label>
            <input 
                value={title} 
                type="text" 
                onChange={e => setTitle(e.target.value)}
            />

            <label>Genre:</label>
            <input 
                value={genre} 
                type="text" 
                onChange={e => setGenre(e.target.value)}
            />

            <label>Synopsis:</label>
            <input 
                value={synopsis} 
                type="text" 
                onChange={e => setSynopsis(e.target.value)}
            />

            <label>Manuscrip:</label>
            <input 
                type="file" 
                onChange={e => setSampleFile(e.target.files[0])}
            />

            <button type="Submit">Submit</button>
        </form>
    )
}
