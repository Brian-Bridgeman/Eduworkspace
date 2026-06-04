using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

public static class OverviewEndpoints
{
    public static IEndpointRouteBuilder MapOverviewEndpoints(this IEndpointRouteBuilder app)
    {

        app.MapGet("/api/overview/statistic", async (AppDbContext db) =>
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            //pågående kurstillfälle
            var ongoingCourseSessions = await db.CourseSessions
            .CountAsync((r => r.StartDate < today && r.EndDate > today));
            var ongoingCourseSessionsIds = await db.CourseSessions.Where(k => k.StartDate < today && k.EndDate > today).Select(i => i.Id).ToListAsync();

            //pågående elever
            var activeStudents = await db.UserCourseSessionRelations
            .Where(l => ongoingCourseSessionsIds
            .Contains(l.CourseSessionId))
            .Select(l => l.User)
            .Distinct() //varför??
            .CountAsync();

            //pågående arbetslag
            var teams = await db.Teams.Where(k => ongoingCourseSessionsIds.Contains(k.CourseSessionId)).CountAsync();
            var upcomingCourseSession = await db.CourseSessions
            .CountAsync(k => k.StartDate > DateOnly.FromDateTime(DateTime.Today));

            return new StatisticDto
            {
                Courses = ongoingCourseSessions,
                Students = activeStudents,
                Teams = teams,
                CourseSession = upcomingCourseSession
            };


        });


        app.MapGet("/api/verview/ongoingteams", async (AppDbContext db) =>
                    {

                        var info = await db.Teams
                        .Include(r => r.CourseSession)
                            .ThenInclude(r => r.Course)
                        .Include(r => r.TeamMembers)
                             .ThenInclude(r => r.User)
                        .Select(r => new ongoingTeams
                        {
                            Id = r.Id,
                            Name = r.Name,
                            Course = r.CourseSession!.Course!.Name,
                            Location = r.CourseSession!.Location,
                            Deltagare = r.TeamMembers.Select(d => d.User!.FirstName + " " + d.User!.LastName).ToList()
                        }).ToListAsync();

                        return info;
                    });
        app.MapGet("api/test", () => { return "Hello"; });

        return app;
    }
}

public class StatisticDto
{
    public int Courses { get; set; }
    public int Students { get; set; }
    public int Teams { get; set; }
    public int CourseSession { get; set; }
}

public class ongoingTeams
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string? Course { get; set; }
    public string? Location { get; set; }
    public string? Status { get; set; }
    public List<string>? Deltagare { get; set; }
}
