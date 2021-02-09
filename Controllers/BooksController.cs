using System.Collections.Generic;
using System.Threading.Tasks;
using Books.Models;
using Books.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace Books.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;


        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IEnumerable<Book> books = await _bookRepository.GetBooks();

            if (books is null)
            {
                return NotFound();
            }

            return Ok(books);
        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            if (!TryValidateModel(book))
            {
                return BadRequest(ModelState);
            }

            await _bookRepository.AddBook(book);
            return Created(Request.Path, book);
        }

        [HttpPut("id/{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            Book bookToUpdate = await _bookRepository.GetById(id);

            if (bookToUpdate is null)
            {
                return NotFound();
            }

            await _bookRepository.UpdateBook(id, book);

            return NoContent();
        }

        [HttpDelete("id/{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            Book bookToDelete = await _bookRepository.GetById(id);

            if (bookToDelete is null)
            {
                return NotFound();
            }

            await _bookRepository.DeleteBook(id);
            
            return Ok(bookToDelete);
        }
    }
}