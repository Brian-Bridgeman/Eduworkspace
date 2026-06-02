public static class CourseEndpoints
{
    private static List<CourseDto> courses = new()
    {
        new CourseDto { Id = 1, Name = "C#", Educator = "Oscar" },
        new CourseDto { Id = 2, Name = "FIB", Educator = "Johan" },
        new CourseDto { Id = 3, Name = "NIB", Educator = "Johan" }
    };

    private static int _nextId = 4;

    public static IEndpointRouteBuilder MapCourseEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("api/courses", () =>
        {
            return Results.Ok(courses);
        });

        app.MapPost("api/courses", (CreateCourseDto dto) =>
        {
            var course = new CourseDto
            {
                Id = _nextId++,
                Name = dto.Name,
                Educator = dto.Educator
            };

            courses.Add(course);

            return Results.Ok(course);
        });

        app.MapDelete("api/courses/{id:int}", (int id) =>
        {
            var course = courses.FirstOrDefault(c => c.Id == id);

            if (course == null)
                return Results.NotFound();

            courses.Remove(course);

            return Results.Ok();
        });

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
}