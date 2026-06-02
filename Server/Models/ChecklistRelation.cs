public class ChecklistRelation
{
    public int Id { get; set; }

    public int ChecklistId { get; set; }
    public Checklist? Checklist { get; set; }

    //Checklista kan kopplas till user, team, course, coursesession
    //minst en av dessa relationer ska vara satt
    public int? UserId { get; set; }
    public User? User { get; set; }

    public int? TeamId { get; set; }
    public Team? Team { get; set; }

    public int? CourseSessionId { get; set; }
    public CourseSession? CourseSession { get; set; }

    public int? CourseId { get; set; }
    public Course? Course { get; set; }

}