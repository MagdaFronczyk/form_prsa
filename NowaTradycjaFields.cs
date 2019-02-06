using MultimediaForms.Services.Validations;

namespace MultimediaForms.JsonModels.ExtraFields
{
    public class NowaTradycjaFields
    {

        [Mandatory]
        public string AddressStreet { get; set; }

        [Mandatory]
        public string AddressCity { get; set; }

        [Mandatory]
        public string ZipCode { get; set; }


        [Mandatory]
        public string Phone { get; set; }

        [Mandatory]
        public string Fax { get; set; }


        [Mandatory]
        public int BandMembersCount { get; set; }


        [Mandatory]
        public string UsedInstruments { get; set; }

        [Mandatory]
        public string TechnicalNeeds { get; set; }

        [Mandatory]
        public string ShortProgramDescribe { get; set; }


        [Mandatory]
        public string PerformerBiography { get; set; }
    }
}