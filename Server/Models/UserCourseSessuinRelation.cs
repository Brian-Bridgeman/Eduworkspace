public class UserCourseSessionRelation
{
    public int Id {get;set;}
    public int UserId{get;set;}
    public int CourseSessionId{get;set;}
    public int RoleId{get;set;}
    public int StatusId{get;set;}
    public string? StatusComment {get;set;}
    public DateTime? UpdatedAt {get;set;}
}