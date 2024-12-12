using System.ComponentModel.DataAnnotations;

namespace Service1.Models
{
    public class ShortenRequest
    {
        [Required]
        public string CurrentUrl { get; set; }
    }
}
