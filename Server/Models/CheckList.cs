public class Checklist
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }

    //En checklista kan har flera ChecklistItems
    public List<ChecklistItem> ChecklistItems { get; set; } = [];

}