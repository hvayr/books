using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using booklist_server;
using Books.Models;
using Microsoft.EntityFrameworkCore;

namespace Books.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly BookDbContext _context;

        public BookRepository(BookDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book> AddBook(Book book)
        {
            try
            {
                book.ID = 0;
                await _context.AddAsync(book);
                await _context.SaveChangesAsync();
                return book;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<Book> GetById(int id)
        {
            return await _context.Books.FirstOrDefaultAsync(b => b.ID == id);
        }

        public async Task<Book> UpdateBook(int id, Book book)
        {
            Book bookToUpdate = await GetById(id);

            bookToUpdate.Title = book.Title;
            bookToUpdate.Author = book.Author;
            bookToUpdate.Description = book.Description;

            await _context.SaveChangesAsync();

            return bookToUpdate;
        }

        public async Task DeleteBook(int id)
        {
            Book bookToDelete = await GetById(id);

            _context.Books.Remove(bookToDelete);

            await _context.SaveChangesAsync();

        }
    }
}