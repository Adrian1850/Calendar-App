using CalendarEventApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CalendarEventApi.Services
{
    public class EventsService
    {
        private readonly IMongoCollection<Event> _eventsCollection;

        public EventsService(
            IOptions<CalendarDatabaseSettings> CalendarDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                CalendarDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                CalendarDatabaseSettings.Value.DatabaseName);

            _eventsCollection = mongoDatabase.GetCollection<Event>(
                CalendarDatabaseSettings.Value.EventsCollectionName);
        }

        public async Task<List<Event>> GetAsync() =>
            await _eventsCollection.Find(_ => true).ToListAsync();

        public async Task<Event?> GetAsync(string id) =>
            await _eventsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Event newEvent) =>
            await _eventsCollection.InsertOneAsync(newEvent);

        public async Task UpdateAsync(string id, Event updatedEvent) =>
            await _eventsCollection.ReplaceOneAsync(x => x.Id == id, updatedEvent);

        public async Task RemoveAsync(string id) =>
            await _eventsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
