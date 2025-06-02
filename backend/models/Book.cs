using System.ComponentModel.DataAnnotations;


namespace BookApi.Models

{
    public class Book

    {

        [Key]
        public int id { get; set; }


        public string title { get; set; }
        public string author { get; set; }

        public string publisher { get; set; }

        public int pageNumber { get; set; }

        public DateOnly publishedDate { get; set; }
    }
}