import { Component } from '@angular/core';
import { BookService } from '../../services/book.services';
import { Book } from '../../models/book.model';
import { ReactiveFormsModule ,FormsModule,FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})

export class BookFormComponent{
  book: Book = {
    id: 0,
    title: '',
    author: '',
    publisher: '',
    pageNumber: 0 ,
    publishedDate: '',
  };


  constructor(private bookService: BookService) {}
  
  bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      publisher: new FormControl('', Validators.required),
      pageNumber: new FormControl(0, [Validators.required, Validators.min(1)]),
      publishedDate: new FormControl(null, Validators.required)
    });

  OnSubmit(): void {
  if (this.bookForm.invalid) return;

  const bookToSend: Book = this.bookForm.value as Book;

  this.bookService.addBook(bookToSend).subscribe({
  next: (newBook) => {
    console.log('Livro adicionado: ', newBook);
    this.bookForm.reset();
  },
  error: (err) => {
    console.error('Erro ao adicionar livro: ', err);
  }
});


}


}
