public class ChecklistRelation
{
    public int Id {get;set;}
    public int ChecklistId {get;set;}

    //Checklista kan kopplas till en eller flera av dem 
    //måste vara kopplat minst till en av dem
    public int? UserId {get;set;}
    public int? TeamId {get;set;}
    public int? CourseSessionId {get;set;}
    public int? CourseId {get;set;}

}