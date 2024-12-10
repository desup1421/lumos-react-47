import React, { useState, useEffect } from "react";
import Book from "../types/Book";
import { useParams } from "react-router-dom";
import apiClient from "../utils/api";

interface BookFormProps {
  onSubmit: (book: Omit<Book, "id">) => void;
  onEdit: ( id: string ,book: Omit<Book, "id">) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, onEdit }) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      apiClient
        .get(`/books/${id}`)
        .then((response) => {
          const { title, author, description } = response.data;
          setTitle(title);
          setAuthor(author);
          setDescription(description);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!id) {
      onSubmit({ title, author, description });
    } else {
      onEdit(id, { title, author, description });
    }
    setTitle("");
    setAuthor("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          id="author"
          type="text"
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={`btn btn-${id ? "warning" : "primary"}`}>
        <i className="bi bi-plus-square me-2"></i> {id ? "Edit Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
