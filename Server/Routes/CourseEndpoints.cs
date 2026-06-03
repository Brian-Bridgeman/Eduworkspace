using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

public static class CourseEndpoints
{
    public static IEndpointRouteBuilder MapCourseEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("api/courses", async (AppDbContext db) =>
        {
            var courses = await db.Courses
            
            /*.Include(c => c.UserCourseRelations)  Behövs inte användas här. Include är användbar om man vill hämta hela objektet, men vi behöver bara fälte
                .ThenInclude(k => k.User)
            .Include(c => c.UserCourseRelations)
                .ThenInclude(c =>c.Role)*/
            .Select(c => new CourseDto
            {
                Id = c.Id,
                Name = c.Name,
                Educator = c.UserCourseRelations
                .Where(r => r.Role!.Name == "Lärare")
                .Select(r => r.User!.FirstName + " " + r.User.LastName)
                .FirstOrDefault() ?? ""
            })
                .ToListAsync();
            return Results.Ok(courses);
        })
        .Produces<List<Course>>(StatusCodes.Status200OK);

        app.MapPost("api/courses", async (CreateCourseDto dto, AppDbContext db) =>
        {
            var fullname = dto.Educator.Split(' ');
            if(fullname.Length < 2)
            {return Results.BadRequest("Skriv för ech efternamn");}

            var firstName = fullname[0];
            var lastName = fullname[1];
             var user = await db.Users
             .FirstOrDefaultAsync(r=> r.FirstName == firstName || r.LastName == lastName );

            if(user == null)
            {return Results.BadRequest("Läraren finns inte");}

            var teacherRole = await db.Roles.FirstAsync(r => r.Name == "Lärare");
            var course = new Course
            {
                Name = dto.Name,
            };
            db.Courses.Add(course);
            await db.SaveChangesAsync();
           
            var relation = new UserCourseRelation
            {
                UserId = user.Id,
                CourseId = course.Id,
                RoleId = teacherRole.Id
            };
            db.UserCourseRelations.Add(relation);
            await db.SaveChangesAsync();

            return Results.Created($"api/courses/{course.Id}", 
            new CourseDto
            {
                Id = course.Id,
                Name = course.Name,
                Educator = dto.Educator
            });
        })
        .Produces<CourseDto>(StatusCodes.Status201Created);

        app.MapDelete("api/courses/{id:int}", async (int id, AppDbContext db) =>
        {
            var course = await db.Courses.FindAsync(id);
            if(course == null)
            {return Results.NotFound();}

            var relation = db.UserCourseRelations
            .Where(r => r.CourseId == id);
            db.UserCourseRelations.RemoveRange(relation);
            db.Courses.Remove(course);
            await db.SaveChangesAsync();
            return Results.NoContent();
        })
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

    /*    app.MapPut("api/courses/{id:int}", (int id, UpdateCourseDto dto) =>
        {
            return Results.NoContent();
        })
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);
*/
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