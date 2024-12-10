import React, { useState, useEffect } from "react";
import BookList from "../components/BookList";
import Book from "../types/Book";
import apiClient from "../utils/api";
import Swal from "sweetalert2";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const getData = () => {
    apiClient
      .get("/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fetch books from the API
  useEffect(() => {
    getData();
  }, []);

  // Delete a book
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient
          .delete(`/books/${id}`)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Delete Data successfully",
            });
            getData();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h1>Bookshelf</h1>
      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
