using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Service1.Data;
using Service1.Models;

namespace Service1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlsController : ControllerBase
    {
        private readonly Service1Context _context;

        public UrlsController(Service1Context context)
        {
            _context = context;
        }

        // GET: api/Urls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Url>>> GetUrl()
        {
            return await _context.Url.ToListAsync();
        }

        // GET: api/Urls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Url>> GetUrl(int id)
        {
            var url = await _context.Url.FindAsync(id);

            if (url == null)
            {
                return NotFound();
            }

            return url;
        }

        // GET: api/Urls/userLinks/{userId}
        [HttpGet("userLinks/{userId}")]
        public async Task<ActionResult<IEnumerable<Url>>> GetUserShortenedLinks(int userId)
        {
            var userLinks = await _context.Url
                                          .Where(s => s.userID == userId)
                                          .ToListAsync();

            if (userLinks == null || !userLinks.Any())
            {
                return NotFound("No shortened links found for the specified user.");
            }

            return Ok(userLinks);
        }

        // Helper method to generate short code from GUID
        private string GenerateShortCodeFromGUID()
        {
            var guid = Guid.NewGuid();
            string base64Guid = Convert.ToBase64String(guid.ToByteArray())
                                        .Replace("=", "")  // Remove padding
                                        .Replace("+", "")  // Remove '+' characters
                                        .Replace("/", ""); // Remove '/' characters

            return base64Guid.Substring(0, 8);  // Return the first 8 characters
        }

        public class UrlRequest
        {
            public string CurrentUrl { get; set; }
            public int UserID { get; set; }
        }

        // POST: api/Urls
        [HttpPost]
        public async Task<ActionResult<string>> PostUrl([FromBody] UrlRequest request)
        {
            if (string.IsNullOrEmpty(request.CurrentUrl))
            {
                return BadRequest("Original link cannot be null or empty.");
            }

            // Generate a new shortened link using GUID
            string shortedLink = GenerateShortCodeFromGUID();

            // Create a new URL object
            var newUrl = new Url
            {
                currentUrl = request.CurrentUrl,
                userID = request.UserID,
                shorturl = shortedLink,
                DateCreate = DateTime.UtcNow
            };

            // Add to database
            _context.Url.Add(newUrl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUrl", new { id = newUrl.Id }, shortedLink);
        }

        // GET: api/Urls/redirect/{shortedLink}
        [HttpGet("redirect/{shortedLink}")]
        public async Task<IActionResult> RedirectToOriginalUrl(string shortedLink)
        {
            var urlEntry = await _context.Url.FirstOrDefaultAsync(u => u.shorturl == shortedLink);
            if (urlEntry == null)
            {
                return NotFound("Short URL not found.");
            }
            _context.Entry(urlEntry).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            // Redirect to the original URL
            return Redirect(urlEntry.currentUrl);
        }

        // DELETE: api/Urls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUrl(int id)
        {
            var url = await _context.Url.FindAsync(id);
            if (url == null)
            {
                return NotFound();
            }

            _context.Url.Remove(url);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UrlExists(int id)
        {
            return _context.Url.Any(e => e.Id == id);
        }
    }
}
