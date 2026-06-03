using Microsoft.EntityFrameworkCore;

public static class CourseEndpoints
{
    private static List<CourseDto> courses = new()
    {
        new CourseDto { Id = 1, Name = "C#", Educator = "Oscar" },
        new CourseDto { Id = 2, Name = "FIB", Educator = "Johan" },
        new CourseDto { Id = 3, Name = "NIB", Educator = "Johan" }
    };

    private static int nextId = 4;

    public static IEndpointRouteBuilder MapCourseEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("api/courses", async (AppDbContext db) =>
        {
            return Results.Ok(
                await db.Courses
                .Include(c => c.CourseSessions)
                .ToListAsync()
            );
        })
        .Produces<List<Course>>(StatusCodes.Status200OK);

        app.MapPost("api/courses", (CreateCourseDto dto) =>
        {
            var course = new CourseDto
            {
                Id = nextId++,
                Name = dto.Name,
                Educator = dto.Educator
            };

            courses.Add(course);

            return Results.Created($"api/courses/{course.Id}", course);
        })
        .Produces<CourseDto>(StatusCodes.Status201Created);

        app.MapDelete("api/courses/{id:int}", (int id) =>
        {
            var course = courses.FirstOrDefault(c => c.Id == id);

            if (course != null) courses.Remove(course);

            return Results.NoContent();
        })
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        app.MapPut("api/courses/{id:int}", (int id, UpdateCourseDto dto) =>
        {
            return Results.NoContent();
        })
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        return app;
    }

    // Temporärt tills att db ef grejerna är klart
    public class CourseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Educator { get; set; } = "";
    }

    public class CreateCourseDto
    {
        public string Name { get; set; } = "";
        public string Educator { get; set; } = "";
    }

    public class UpdateCourseDto
    {
        public string Name { get; set; } = "";
    }
}