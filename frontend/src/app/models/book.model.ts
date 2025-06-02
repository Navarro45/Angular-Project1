export interface Book {
  id?: number | null;
  title?: string | null;
  author?: string | null;
  publisher?: string | null;
  pageNumber?: number | null;
  publishedDate?: string | Date | null;
}
