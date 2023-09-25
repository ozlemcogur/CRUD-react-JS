import { useState } from "react";
import BookCard from "./BookCard";
import CustomButton, { ADD_TYPE } from "./CustomButton";
import { toast } from "react-toastify";

const App = () => {
    const [bookName, setBookName] = useState("");
    const [bookList, setBookList] = useState([]);

    const addBook = (e) => {
        e.preventDefault();
        const newBook = {
            id: new Date().getTime(),
            bookTitle: bookName,
            date: new Date().toLocaleString(),
            isRead: false,
        }

        setBookList([...bookList, newBook]);
        setBookName("");
        toast.success("New product has been added to the bookshelf.")
    }

    const handleDelete = (deletedId) => {
        const filteredList = bookList.filter((book) => book.id !== deletedId)
        setBookList(filteredList);
        toast.error("Taken off the bookshelf");
    }

    const handleReadChange = (book) => {
        const updatedBook = { ...book, isRead: !book.isRead }
        const cloneBookList = [...bookList]
        const bookIndex = cloneBookList.findIndex((item) => (item.id == book.id))
        cloneBookList.splice(bookIndex, 1, updatedBook)
        setBookList(cloneBookList);
    }

    const handleEdit = (book, newTitle) => {
        const updated = {
            ...book, bookTitle: newTitle
        }
        const newList = bookList.map((book) =>
            book.id !== updated.id ? book : updated)
        setBookList(newList);
        toast.info("The book has been updated");
    };

    return (
        <div>
            <header className="bg-dark text-light py-2 text-center fs-5">
                Book Worm</header>
            <div className="container border pb-5">
                <form className="d-flex gap-3 mt-4" onSubmit={addBook}>
                    <input
                        value={bookName}
                        onChange={(e) => { setBookName(e.target.value) }}
                        placeholder="Please enter book title"
                        className="form-control shadow" />
                    <CustomButton title={"Add"} type={ADD_TYPE} />
                </form>
                <div className="d-flex flex-column gap-5 mt-3">
                    {
                        bookList.length == 0 ? <p>No books added yet</p> : bookList.map((book) => {
                            return (
                                <BookCard
                                    deleteClick={() => { handleDelete(book.id) }}
                                    bookInfo={book}
                                    handleEdit={handleEdit}
                                    readUpdateClick={() => { handleReadChange(book) }
                                    }
                                />
                            )

                        })}
                </div>
            </div>
        </div>
    )
}

export default App;