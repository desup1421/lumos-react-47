import React from "react";
import Book from "../types/Book";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  const navigate = useNavigate();
  return (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">{book.title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
      <p className="card-text">{book.description}</p>
      <div className="btn-group">
        <button onClick={() => onDelete(book.id)} className="btn btn-sm btn-outline-danger">Delete</button>
        <button onClick={() => navigate(`/edit/${book.id}`)} className="btn btn-sm btn-outline-warning">Edit</button>
      </div>
    </div>
  </div>
);
}

export default BookCard;
