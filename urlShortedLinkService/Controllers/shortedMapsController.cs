using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using urlShortedLinkService.Data;
using urlShortedLinkService.Models;

namespace urlShortedLinkService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class shortedMapsController : ControllerBase
    {
        private readonly urlShortedLinkServiceContext _context;

        public shortedMapsController(urlShortedLinkServiceContext context)
        {
            _context = context;
        }

        // GET: api/shortedMaps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<shortedMap>>> GetshortedMap()
        {
            return await _context.shortedMap.ToListAsync();
        }

        // GET: api/shortedMaps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<shortedMap>> GetshortedMap(int id)
        {
            var shortedMap = await _context.shortedMap.FindAsync(id);

            if (shortedMap == null)
            {
                return NotFound();
            }

            return shortedMap;
        }

        [HttpGet("userLinks/{userId}")]
        public async Task<ActionResult<IEnumerable<shortedMap>>> GetUserShortenedLinks(int userId)
        {
            var userLinks = await _context.shortedMap
                                          .Where(s => s.userID == userId)
                                          .ToListAsync();

            if (userLinks == null || !userLinks.Any())
            {
                return NotFound("No shortened links found for the specified user.");
            }

            return Ok(userLinks);
        }

        private string GenerateShortCodeFromGUID()
        {
            // Generate a new GUID
            var guid = Guid.NewGuid();

            // Convert to Base64 and remove padding and special characters
            string base64Guid = Convert.ToBase64String(guid.ToByteArray())
                                        .Replace("=", "") // Remove padding
                                        .Replace("+", "") // Remove '+' characters
                                        .Replace("/", ""); // Remove '/' characters

            // Return the first 4 characters
            return base64Guid.Substring(0, 8);
        }

        // PUT: api/shortedMaps/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutshortedMap(int id, shortedMap shortedMap)
        {
            if (id != shortedMap.Id)
            {
                return BadRequest();
            }

            _context.Entry(shortedMap).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!shortedMapExists(id))
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

        public class ShortedMapRequest
        {
            public string OriginalLink { get; set; }
            public int UserID { get; set; }
        }

        // POST: api/shortedMaps
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<string>> PostshortedMap([FromBody] ShortedMapRequest request)
        {
            if (string.IsNullOrEmpty(request.OriginalLink))
            {
                return BadRequest("Original link cannot be null or empty.");
            }

            // Generate a new shortened link using GUID
            string shortedLink = GenerateShortCodeFromGUID();

            // Create the shortedMap object
            var newShortedMap = new shortedMap
            {
                originalLink = request.OriginalLink,
                userID = request.UserID,
                shortedLink = shortedLink,
                createAt = DateTime.UtcNow
            };

            // Add to database
            _context.shortedMap.Add(newShortedMap);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetshortedMap", new { id = newShortedMap.Id }, shortedLink);
        }

        // DELETE: api/shortedMaps/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteshortedMap(int id)
        {
            var shortedMap = await _context.shortedMap.FindAsync(id);
            if (shortedMap == null)
            {
                return NotFound();
            }

            _context.shortedMap.Remove(shortedMap);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("redirect/{shortedLink}")]
        public async Task<IActionResult> GetOriginalLink(string shortedLink, [FromQuery] int userID)
        {
            if (string.IsNullOrEmpty(shortedLink))
            {
                return BadRequest("Shorted link cannot be null or empty.");
            }

            // Find the original link associated with the provided shorted link
            var shortedMap = await _context.shortedMap.FirstOrDefaultAsync(m => m.shortedLink == shortedLink && m.userID == userID);

            if (shortedMap == null)
            {
                return NotFound("The provided shorted link does not exist.");
            }

            // Return the original link
            return Ok(shortedMap.originalLink);
        }

        private bool shortedMapExists(int id)
        {
            return _context.shortedMap.Any(e => e.Id == id);
        }
    }
}
