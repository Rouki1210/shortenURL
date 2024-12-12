namespace Service1.Models
{
    public class Url
    {
        public int Id { get; set; }
        public string currentUrl { get; set; }
        public string shorturl { get; set; }

        public int NumofClicks { get; set; }

        public DateTime DateCreate { get; set; } = DateTime.Now;
    }
}
