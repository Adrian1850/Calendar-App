using CalendarEventApi.Models;
using CalendarEventApi.Services;
using Microsoft.AspNetCore.Mvc;


namespace CalendarEventApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly EventsService _eventsService;

    public EventsController(EventsService eventsService) =>
        _eventsService = eventsService;

    [HttpGet]
    public async Task<List<Event>> Get() =>
        await _eventsService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Event>> Get(string id)
    {
        var calendarEvent = await _eventsService.GetAsync(id);

        if (calendarEvent is null)
        {
            return NotFound();
        }

        return calendarEvent;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Event newEvent)
    {
        await _eventsService.CreateAsync(newEvent);

        return CreatedAtAction(nameof(Get), new { id = newEvent.Id }, newEvent);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Event updatedEvent)
    {
        var calendarEvent = await _eventsService.GetAsync(id);

        if (calendarEvent is null)
        {
            return NotFound();
        }


        updatedEvent.Id = calendarEvent.Id;

        await _eventsService.UpdateAsync(id, updatedEvent);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var calendarEvent = await _eventsService.GetAsync(id);

        if (calendarEvent is null)
        {
            return NotFound();
        }

        await _eventsService.RemoveAsync(id);

        return NoContent();
    }
}
