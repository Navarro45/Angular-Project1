import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Book } from '../models/book.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class BookService{

    private apiUrl = 'http://localhost:5250/api/books'

    constructor(private http: HttpClient) { }

    getBooks(): Observable<Book[]>{
        return this.http.get<Book[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }

    getBookById(id:number): Observable<Book>{
        return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    addBook(book: Book) {
        return this.http.post<Book>(this.apiUrl, book); 
    }



    updateBook(id:number, book:Book):Observable<Book>{
        return this.http.put<Book>(`${this.apiUrl}/${id}`, book).pipe(
            catchError(this.handleError)
        );
    }

    deleteBook(id:number):Observable<Book>{
        return this.http.delete<Book>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse){
        console.error('Erro ocorrido: ', error);
        return throwError(() => new Error('Erro ao processar a requisição'))
    }

}