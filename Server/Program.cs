var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    WebRootPath = "wwwroot/browser"
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapFallbackToFile("index.html");

app.MapCourseEndpoints();

app.Run();
