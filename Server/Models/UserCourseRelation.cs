public class UserCourseRelation
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int CourseId { get; set; }
    public Course? Course { get; set; }
    public int RoleId { get; set; }
    public Role? Role { get; set; }
}