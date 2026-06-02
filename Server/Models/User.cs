
using Microsoft.EntityFrameworkCore;

[Index(nameof(Username), IsUnique = true)]
[Index(nameof(Email), IsUnique = true)]

public class User
{
    public int Id { get; set; }
    public string? Username { get; set; }

    public int? ImageId { get; set; }
    public Image? ProfileImage { get; set; }

    public int? CompanyId { get; set; }
    public Company? Company { get; set; }

    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string? Email { get; set; }
    public string? MobileNumber { get; set; }
    public string? PasswordHash { get; set; }


    // [] här är samma som att skriva new "List<CalendarEvent>()"
    //User kan har flera events som den skapade
    public List<CalendarEvent> CreatedCalendarEvents { get; set; } = [];

    //User kan har flera checklistor som den äger 
}