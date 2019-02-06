using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace MultimediaForms.DTO
{
    public class JsonModel
    {

        public JsonModel()
        {
            Photos = new List<HttpPostedFile>();
            Songs = new List<SongJsonModel>();
            Documents = new List<HttpPostedFile>();
        }
        [Required]
        [MinLength(3), MaxLength(50)]
        [RegularExpression(@"<([a-z]+) *[^/]*?>", ErrorMessage = "Użuto niedozwolonych znaków")]
        public string FirstName { get; set; }


        [Required]
        [MinLength(3), MaxLength(50)]
        [RegularExpression(@"<([a-z]+) *[^/]*?>", ErrorMessage = "Użuto niedozwolonych znaków")]
        public string LastName { get; set; }


        [MinLength(3), MaxLength(50)]
        [RegularExpression(@"<([a-z]+) *[^/]*?>", ErrorMessage = "Użuto niedozwolonych znaków")]
        public string Nick { get; set; }


        [RegularExpression(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$", ErrorMessage = "Użuto niedozwolonych znaków")]
        // or [EmailAddress]
        public string Email { get; set; }


        [RegularExpression(@"<([a-z]+) *[^/]*?>", ErrorMessage = "Użuto niedozwolonych znaków")]
        public string ExtraFieldsJson { get; set; }


        [RegularExpression(@"<([a-z]+) *[^/]*?>", ErrorMessage = "Użuto niedozwolonych znaków")]
        public string RulesJson { get; set; }

        public List<SongJsonModel> Songs { get; set; } 

        public List<HttpPostedFile> Photos { get; set; }

        public List<HttpPostedFile> Documents { get; set; }



    }
}