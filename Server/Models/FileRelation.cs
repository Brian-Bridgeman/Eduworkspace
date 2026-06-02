public class FileRelation
{
    public int Id { get; set; }

    // Note/File eller Image som kopplas:
    public int? NoteId { get; set; }
    public Note? Note { get; set; }

    public int? FileId { get; set; }
    public FileData? FileData { get; set; }

    public int? ImageId { get; set; }
    public Image? Image { get; set; }

    //Till detta ska Image/File/Note kopplas till:  
    public int? UserId { get; set; }
    public User? User { get; set; }

    public int? CourseId { get; set; }
    public Course? Course { get; set; }


    public int? CourseSessionId { get; set; }
    public CourseSession? CourseSession { get; set; }

    public int? TeamId { get; set; }
    public Team? Team { get; set; }
}