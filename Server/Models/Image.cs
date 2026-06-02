using Microsoft.VisualBasic;

public class Image
{
    public int Id {get;set;}
    public string Name {get;set;} = "";
    public string? Description {get;set;} 
    public string Path {get;set;} ="";
    public DateAndTime? CreatedAt {get; set;}
    public int? CreatedBy {get;set;} //ta bort ? efter fixa inloggningsystem 
}