public class UserCourseSessionRelation
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public int CourseSessionId { get; set; }
    public CourseSession? CourseSession { get; set; }

    public int RoleId { get; set; }
    public Role? Role { get; set; }

    public int StatusId { get; set; }
    public UserCourseStatus? UserCourseStatus { get; set; }
    public string? StatusComment { get; set; }
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
}