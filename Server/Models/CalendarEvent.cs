public class CalendarEvent
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public string? Location { get; set; }
    public string? Description { get; set; }

    //användare som skapade event i kalendern 
    public int? CreatedBy { get; set; } //nullable tillfälligt innan vi har skapat inloggning
    public User? CreatedByUser { get; set; }
}