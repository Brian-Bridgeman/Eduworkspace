using Microsoft.EntityFrameworkCore;


public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {}
        public DbSet <User> Users {get;set;}
        public DbSet <Role> Roles {get;set;}
        public DbSet <Course> Courses {get;set;}
        public DbSet <Company> Companies {get;set;}
        public DbSet <CourseSession> CourseSessions {get;set;}
}