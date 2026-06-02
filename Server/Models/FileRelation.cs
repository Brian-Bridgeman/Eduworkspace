public class FileRelation
{
    public int Id {get;set;}

    // Note/File eller Image som kopplas:
    public int? NoteId {get;set;}
    public int? FileId {get;set;}
    public int? ImageId {get;set;}

    //Till detta ska Image/File/Note kopplas till:  
    public int? UserId {get;set;}
    public int? CourseId {get;set;}
    public int? CourseSessionId {get;set;}
    public int? TeamId  {get;set;}
}