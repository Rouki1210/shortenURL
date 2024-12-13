namespace urlShortedLinkService.Models
{
    public class shortedMap
    {
        public int Id { get; set; }
        public string originalLink { get; set; }
        public int userID { get; set; }
        public string shortedLink { get; set; }
        public DateTime createAt { get; set; }
    }
}
