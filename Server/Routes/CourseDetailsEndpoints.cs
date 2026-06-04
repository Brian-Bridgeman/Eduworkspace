using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

public static class CourseDetailsEndpoints
{
    public static IEndpointRouteBuilder MapCourseDetailsEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("api/courses/{courseId:int}/sessions", async (int courseId, AppDbContext db) =>
        {
            var sessions = await db.CourseSessions
                .Where(cs => cs.CourseId == courseId)
                .Select(cs => new CourseSessionDto
                {
                    Id = cs.Id,
                    Name = cs.Name,
                    CourseId = cs.CourseId,
                    CourseName = cs.Course!.Name,
                    StartDate = cs.StartDate,
                    EndDate = cs.EndDate,
                    Location = cs.Location
                })
                .ToListAsync();

            return Results.Ok(sessions);
        })
        .Produces<List<CourseSessionDto>>(StatusCodes.Status200OK);

        app.MapPost("/api/courses/{courseId:int}/sessions", async (int courseId, CreateCourseSessionDto dto, AppDbContext db) =>
        {
            var course = await db.Courses.FindAsync(courseId);

            if (course == null) return Results.BadRequest("Kursen finns inte.");

            var session = new CourseSession
            {
                Name = dto.Name,
                CourseId = courseId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Location = dto.Location
            };

            db.CourseSessions.Add(session);
            await db.SaveChangesAsync();

            return Results.Created(
                $"/api/courses/{courseId}/sessions/{session.Id}",
                new CourseSessionDto
                {
                    Id = session.Id,
                    Name = session.Name,
                    CourseId = session.CourseId,
                    CourseName = course.Name,
                    StartDate = session.StartDate,
                    EndDate = session.EndDate,
                    Location = session.Location
                });
        })
        .Produces<CourseSessionDto>(StatusCodes.Status201Created);

        app.MapDelete("/api/courses/{courseId:int}/sessions/{sessionId:int}", async (int courseId, int sessionId, AppDbContext db) =>
        {
            var session = await db.CourseSessions
            .FirstOrDefaultAsync(s => s.Id == sessionId && s.CourseId == courseId);

            if (session == null) return Results.NotFound();

            db.CourseSessions.Remove(session);
            await db.SaveChangesAsync();

            return Results.NoContent();
        })
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        app.MapPut("/api/courses/{courseId:int}/sessions/{sessionId:int}", async (int courseId, int sessionId, UpdateCourseSessionDto dto, AppDbContext db) =>
        {
            var session = await db.CourseSessions
           .FirstOrDefaultAsync(s => s.Id == sessionId && s.CourseId == courseId);


            if (session == null) return Results.NotFound();

            session.Name = dto.Name;
            session.StartDate = dto.StartDate;
            session.EndDate = dto.EndDate;
            session.Location = dto.Location;

            await db.SaveChangesAsync();

            return Results.NoContent();
        })
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        return app;
    }

    public class CourseSessionDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int CourseId { get; set; }
        public string CourseName { get; set; } = "";
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string Location { get; set; } = "";
    }

    public class CreateCourseSessionDto
    {
        public string Name { get; set; } = "";
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string Location { get; set; } = "";
    }

    public class UpdateCourseSessionDto
    {
        public string Name { get; set; } = "";
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string Location { get; set; } = "";
    }

}