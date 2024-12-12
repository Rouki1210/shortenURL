using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Service1.Data;
using Service1.Models;

namespace Service1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlsController : ControllerBase
    {
        private readonly UrlContext _context;
        private readonly ConcurrentDictionary<string, string> UrlMap = new();
        private readonly string BaseUrl = "https://short.ly/";

        public UrlsController(UrlContext context)
        {
            _context = context;
        }

        // GET: api/Urls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Url>>> GetUrls()
        {
            var urls = await _context.Urls.ToListAsync();
            if (urls == null || urls.Count == 0)
            {
                return NotFound("No URLs found.");
            }

            return Ok(urls);
        }

        // GET: api/Urls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Url>> GetUrl(int id)
        {
            var url = await _context.Urls.FindAsync(id);

            if (url == null)
            {
                return NotFound();
            }

            return url;
        }

        // PUT: api/Urls/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUrl(int id, Url url)
        {
            if (id != url.Id)
            {
                return BadRequest();
            }

            _context.Entry(url).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UrlExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Urls
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Url>> PostUrl(Url url)
        {
            _context.Urls.Add(url);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUrl), new { id = url.Id }, url);
        }



        [HttpPost("shorten")]

        public async Task<IActionResult> ShortenUrl([FromBody]ShortenRequest request)
        {
            string currentUrl = request.CurrentUrl;
            var shortenUrl = GenerateShortCode(currentUrl);


            UrlMap[shortenUrl] = currentUrl;

            var urlEntry = new Url
            {
                Id = 0,
                currentUrl = currentUrl,
                shorturl = BaseUrl + shortenUrl,
                NumofClicks = 0,
                DateCreate = DateTime.UtcNow
            };

            _context.Urls.Add(urlEntry);
            await _context.SaveChangesAsync();

            return Ok(new {shortUrl = urlEntry.shorturl});
        }

        [HttpGet("expand/{shortCode}")]
        public async Task<IActionResult> RedirectToOriginalUrl(string shortCode)
        {
            var originalUrl = Uri.UnescapeDataString(shortCode);
            var urlEntry = await _context.Urls.FirstOrDefaultAsync(u => u.shorturl == originalUrl);
            if (urlEntry == null)
            {
                // Return 404 if not found
                return NotFound("Short URL not found.");
            }

            urlEntry.NumofClicks++;
            _context.Entry(urlEntry).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            // Redirect to the original URL
            return Redirect(urlEntry.currentUrl);
        }

        private string GenerateShortCode(string url)
        {
            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var shortCode = new string(Enumerable.Repeat(chars, 8)
                                        .Select(s => s[random.Next(s.Length)]).ToArray());
            return shortCode;
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAll()
        {
            try
            {
                _context.Urls.RemoveRange(_context.Urls);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUrl(int id)
        {
            var urlDb = await _context.Urls.FirstOrDefaultAsync(n => n.Id == id);

            if (urlDb != null)
            {
                _context.Remove(urlDb);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }


        private bool UrlExists(int id)
        {
            return _context.Urls.Any(e => e.Id == id);
        }
    }
}
