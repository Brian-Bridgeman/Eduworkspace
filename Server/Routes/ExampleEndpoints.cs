// ✅ Always add .Produces<T>() on app.MapX call so NSwag can infer return types.

public static class ExampleEndpoints
{
    public static IEndpointRouteBuilder MapExampleEndpoints(this IEndpointRouteBuilder app)
    {
        // ✅ GET list — return the collection type, not just T
        app.MapGet("api/examples", () =>
        {
            return Results.Ok(new List<ExampleDto>());
        })
        .Produces<List<ExampleDto>>(StatusCodes.Status200OK);

        // ✅ GET single — include the 404 so NSwag knows it can fail
        app.MapGet("api/examples/{id:int}", (int id) =>
        {
            return Results.Ok(new ExampleDto());
        })
        .Produces<ExampleDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);

        // ✅ POST — use 201 Created with the created resource type
        app.MapPost("api/examples", (CreateExampleDto dto) =>
        {
            var created = new ExampleDto();
            return Results.Created($"api/examples/{created.Id}", created);
        })
        .Produces<ExampleDto>(StatusCodes.Status201Created);

        // ✅ PUT — no body on success, but still declare the 404
        app.MapPut("api/examples/{id:int}", (int id, UpdateExampleDto dto) =>
        {
            return Results.NoContent();
        })
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        // ✅ DELETE — same pattern
        app.MapDelete("api/examples/{id:int}", (int id) =>
        {
            return Results.NoContent();
        })
        .Produces(StatusCodes.Status204NoContent)
        .Produces(StatusCodes.Status404NotFound);

        return app;
    }

    // DTOs live here until EF/repository layer is ready
    public class ExampleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
    }
    public class CreateExampleDto
    {
        public string Name { get; set; } = "";
    }
    public class UpdateExampleDto
    {
        public string Name { get; set; } = "";
    }
}
