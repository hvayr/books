using Books.Models;
using Microsoft.EntityFrameworkCore;

namespace booklist_server
{
    public class BookDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }

        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }
    }
}