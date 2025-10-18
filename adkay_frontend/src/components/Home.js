import Navbar from "./navbar";
import "./css/home.css";

export default function Home() {
    const books = [
        {
            title: "Killed by Illiteracy",
            description: "A gripping tale of education lost and found.",
            rating: 4.5,
        },
        {
            title: "French Composition",
            description: "Master the art of writing in French with ease.",
            rating: 4,
        },
        {
            title: "The Young Shall Grow",
            description: "An inspiring journey of hope and ambition.",
            rating: 5,
        },
    ];

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        return (
            "★".repeat(fullStars) + (halfStar ? "½" : "")
        );
    };

    return (
        <div>
            <Navbar />
            <div className="home-container">
                <h2>Welcome to A-D Kay Publications</h2>
                <p>Featured Books:</p>

                <div className="featured-books">
                    {books.map((book, index) => (
                        <div key={index} className="book-card">
                            <h3>{book.title}</h3>
                            <p className="book-desc">{book.description}</p>
                            <p className="book-rating">{renderStars(book.rating)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
