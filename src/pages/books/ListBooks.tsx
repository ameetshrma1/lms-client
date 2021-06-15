import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomBereadcrumb from "../../components/CustomBereadcrumb";
import MainComponent from "../../components/MainComponent";

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

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const bookColumns = [
    { title: "Book Title", dataIndex: "title", key: "title" },
    {
      title: "Book Author",
      dataIndex: "author",
      key: "author",
    },
  ];

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <MainComponent>
      <CustomBereadcrumb items={["Books"]} />
      <h3>Welcome to Book List</h3>
      {/* <ul>
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
      </ul> */}
      <Table dataSource={books} columns={bookColumns} />;
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
    </MainComponent>
  );
};

export default ListBooks;