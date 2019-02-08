using System.Web;

namespace MultimediaForms.DTO
{
    public class SongJsonModel
    {
        public string Title { get; set; }

        public string SongWriters { get; set; }

        public string Performer { get; set; }

        public HttpPostedFile Tune { get; set; }
        [ ]

    }
}