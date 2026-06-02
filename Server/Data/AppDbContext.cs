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
        public DbSet <Team> Teams {get;set;}
        public DbSet <TeamMember> TeamMembers {get;set;}
        public DbSet <CalendarEvent> CalendarEvents {get;set;}
        public DbSet <Image> Images {get;set;}
        public DbSet <Note> Notes {get;set;}
}