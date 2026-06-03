public static class StudentEndpoints
{
    private static List<StudentDto> students = new()
    {
        new StudentDto { 
            Id = 1, 
            Name = "Emma Andersson", 
            PhoneNumber = "070-111 11 11", 
            Mail = "emma.andersson@mail.com", 
            Company = "Tech AB", 
            Course = "Angular", 
            Group = "A3 24"
            },
        new StudentDto { 
            Id = 2, 
            Name = "Johan Berg", 
            PhoneNumber = "070-222 22 22", 
            Mail = "johan.berg@mail.com", 
            Company = "Webbbolaget", 
            Course = "TypeScript", 
            Group = "H7 25"
            },
       
    };
    private static int _nextId = 3;
    public static IEndpointRouteBuilder MapStudentEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("api/students", () =>
        {
            return Results.Ok(students);
        });
        app.MapPost("api/students", (CreateStudentDto dto) =>
        {
            var student = new StudentDto
            {
                Id = _nextId++,
                Name = dto.Name,
                PhoneNumber = dto.PhoneNumber,
                Mail = dto.Mail,
                Company = dto.Company,
                Course = dto.Course,
                Group = dto.Group
            };

            students.Add(student);

            return Results.Ok(student);
        });
        app.MapDelete("api/students/{id:int}", (int id) =>
        {
            var student = students.FirstOrDefault(c => c.Id == id);

            if (student == null)
                return Results.NotFound();

            students.Remove(student);

            return Results.Ok();
        });
        return app;
    }
    public class StudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public string Mail {get; set;} = "";
        public string Company {get; set;} = "";
        public string Course {get; set;} = "";
        public string Group {get; set;} = "";
    }
    public class CreateStudentDto
    {
        public string Name { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public string Mail {get; set;} = "";
        public string Company {get; set;} = "";
        public string Course {get; set;} = "";
        public string Group {get; set;} = "";
    }
}