using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace CalendarEventApi.Models
{
    public class Event
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("title")]
        public string title { get; set; } = null!;
        public string startDate { get; set; } = null!;
        public string endDate { get; set; } = null!;
        public string startTime { get; set; } = null!;
        public string endTime { get; set; } = null!;
        public string location { get; set; } = null!;
        public string description { get; set; } = null!;
    }
}
