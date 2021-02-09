using System.Collections.Generic;
using System.Threading.Tasks;
using Books.Models;

namespace Books.Repositories
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetBooks();
        Task<Book> AddBook(Book book);
        Task<Book> GetById(int id);
        Task<Book> UpdateBook(int id, Book book);
        Task DeleteBook(int id);
    }
}