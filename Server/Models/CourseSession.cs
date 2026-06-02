public class CourseSession
{
    public int Id {get;set;}
    public string Name {get;set;} = "";
    public int CourseId {get;set;}
    public DateOnly StartDate {get;set;}
    public DateOnly EndDate {get;set;}
    public string Location {get;set;} = "";
}