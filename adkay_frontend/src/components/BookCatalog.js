import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./css/bookcatalog.css";


export default function BookCatalog(){
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null) // null instead of blank object (like in submistform)

        useEffect(()=>{
            async function fetchBooks(){
                try{
                    const response = await axios.get('http://127.0.0.1:8000/api/books/');
                    setBooks(response.data)
                }catch(error){
                    console.log(error.response?.data)
                    setError("Failed to retrieve data")
                }finally{
                    setLoading(false)
                }
            }
            fetchBooks()
        },
        []);   // []); Empty deps = run once on mount


    return(
        <div className="book-catalog-container">
        <h2>Book Catalog</h2>
        {loading && <p className="loading">Loading .....</p>}
        {error && <p className="error">Error : {error}</p>}

        {books.length > 0 && (
        <div className="book-grid">
            {books.map((book) => (
            <div key={book.id} className="book-card">
                <h4>{book.title}</h4>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Synopsis:</strong> {book.synopsis}</p>
                <p><strong>Price:</strong> ${book.price}</p>
            </div>
            ))}
        </div>
        )}
    </div>
    );
}