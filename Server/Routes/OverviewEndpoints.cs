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


        app.MapGet("/api/overview/ongoingteams", async (AppDbContext db) =>
                    {
                        var today = DateOnly.FromDateTime(DateTime.Today);
                        var ongoingCourseSessionsIds = await db.CourseSessions.Where(k => k.StartDate < today && k.EndDate > today).Select(i => i.Id).ToListAsync();

                        var info = await db.Teams
                        /* .Include(r => r.CourseSession)
                             .ThenInclude(r => r.Course)
                         .Include(r => r.TeamMembers)
                              .ThenInclude(r => r.User)
                              .Where(l => ongoingCourseSessionsIds
                             .Contains(l.CourseSessionId))*/
                        .Where(l => ongoingCourseSessionsIds
                        .Contains(l.CourseSessionId))
                        .Select(r => new TeamDto
                        {
                            Id = r.Id,
                            Name = r.Name,
                            CourseSessionId = r.CourseSession!.Id,
                            Course = r.CourseSession!.Course!.Name,
                            Location = r.CourseSession!.Location,
                            Deltagare = r.TeamMembers.Select(d => new OverviewStudentDto
                            {
                                Id = d.User!.Id,
                                Name = d.User!.FirstName + " " + d.User!.LastName
                            }).ToList()
                        }).ToListAsync();

                        return info;
                    });

        app.MapGet("/api/overview/upcomingcourse", async (AppDbContext db) =>
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var info = await db.CourseSessions
                    .Where(k => k.StartDate > today)
                    .Select(r => new CourseSessionDto
                    {
                        Id = r.Id,
                        Name = r.Name,
                        Course = r.Course!.Name,
                        Location = r.Location,
                        StartDate = r.StartDate,
                        EndDate = r.EndDate


                    }).ToListAsync();

            return info;
        });

        app.MapGet("/api/overview/activestudents", async (AppDbContext db) =>
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var info = await db.UserCourseSessionRelations
                .Where(k => k.CourseSession!.StartDate < today && k.CourseSession!.EndDate > today)
                .Select(k => new ActiveStudentDto
                {
                    Id = k.User!.Id,
                    Image = k.User.ProfileImage,
                    FirstName = k.User.FirstName,
                    LastName = k.User.LastName,
                    Company = k.User!.Company!.Name,
                    CourseSession = k.CourseSession!.Name
                })
                .ToListAsync();
            return info;

        });
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

public class TeamDto
{
    public int Id { get; set; }
    public int CourseSessionId {get;set;}
    public string Name { get; set; } = "";
    public string? Course { get; set; }
    public string? Location { get; set; }
    public string? Status { get; set; }
    public List<OverviewStudentDto>? Deltagare { get; set; } = [];
}

public class CourseSessionDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Course { get; set; } = "";
    public string Location { get; set; } = "";
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
}
public class ActiveStudentDto
{
    public int? Id { get; set; }
    public ImageData? Image { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Company { get; set; }
    public string? CourseSession { get; set; }
}

public class OverviewStudentDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
}

