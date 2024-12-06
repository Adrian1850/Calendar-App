namespace CalendarEventApi.Models
{
    public class CalendarDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string EventsCollectionName { get; set; } = null!;
    }
}
