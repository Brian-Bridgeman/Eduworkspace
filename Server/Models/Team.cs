public class Team
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int CourseSessionId { get; set; }
    public CourseSession? CourseSession { get; set; }
    public List<TeamMember> TeamMembers {get;set;} = [];
}