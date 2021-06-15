import axios from "axios";
import React, { useEffect, useState } from "react";

interface IBook {
  _id?: string;
  author: string;
  title: string;
}

const ListBooks = () => {
  const [books, setBooks] = useState([] as IBook[]);
  const [newBook, setNewBook] = useState({} as IBook);

  const getAllBooks = async () => {
    const response = await axios.get("http://localhost:4099/api/books");
    setBooks(response.data.data);
  };

  const handleInputChange = (event: any) => {
    event.persist();
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async () => {
    const response = newBook._id
      ? await axios.patch(
          `http://localhost:4099/api/books/${newBook._id}`,
          newBook
        )
      : await axios.post("http://localhost:4099/api/books", newBook);
    getAllBooks();
  };

  const handleBookEdit = async (id: string) => {
    if (id.length < 1) {
      return;
    }
    const response = await axios.get(`http://localhost:4099/api/books/${id}`);
    setNewBook(response.data.data);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div>
      <h3>Welcome to Book List</h3>
      <ul>
        {books.map((book, index) => (
          <li
            onClick={() => {
              handleBookEdit(book._id ? book._id : "");
            }}
            key={index}
          >
            {" "}
            {book.title} - {book.author}{" "}
          </li>
        ))}
      </ul>
      <br />
      <div>
        <h3>Add Book</h3>
        <input
          onChange={handleInputChange}
          value={newBook.title}
          type="text"
          name="title"
          placeholder="Enter Book Name"
        />
        <input
          onChange={handleInputChange}
          value={newBook.author}
          type="text"
          name="author"
          placeholder="Enter Author Name"
        />
        <button onClick={handleFormSubmit}>
          {newBook._id ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default ListBooks;
