public class Course
{
    public int Id { get; set; }
    public string Name { get; set; } = "";


    //EN kurs har listan av kurstillfälle
    public List<CourseSession> CourseSessions { get; set; } = [];
    public List<UserCourseRelation> UserCourseRelations {get;set;} = [];

}