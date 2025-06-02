import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.services';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true;
  editingBookId: number | null = null;
  editedBook: Book | null = null;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  fetchBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data.map(book => ({
          ...book,
          publishedDate: book.publishedDate ? new Date(book.publishedDate).toISOString().substring(0, 10) : null
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar livros:', err);
        this.loading = false;
      }
    });
  }

  editBook(id: number): void {
    this.editingBookId = id;
    const book = this.books.find(b => b.id === id);
    if (book) {
      this.editedBook = { ...book }; 
    }
  }

  cancelEdit(): void {
    this.editingBookId = null;
    this.editedBook = null;
  }

  saveBook(bookId: number): void {
    const book = this.books.find(b => b.id === bookId);
    if (book) {
      const bookToSend: Book = {
        ...book,
        publishedDate: book.publishedDate
          ? new Date(book.publishedDate).toISOString().substring(0, 10)
          : null
      };

      this.bookService.updateBook(bookId, bookToSend).subscribe({
        next: () => {
          this.editingBookId = null;
          this.editedBook = null;
        },
        error: err => console.error('Erro ao atualizar o livro:', err)
      });
    }
  }

  deleteBook(id: number): void {
    if (confirm('Deseja realmente excluir este livro?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== id);
        },
        error: (err) => {
          console.error('Erro ao excluir livro:', err);
        }
      });
    }
  }

}
