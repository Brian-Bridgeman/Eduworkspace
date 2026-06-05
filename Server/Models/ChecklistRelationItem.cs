public class ChecklistRelationItem
{
    public int Id { get; set; }

    public int ChecklistRelationId { get; set; }
    public ChecklistRelation? ChecklistRelation { get; set; }
    public int ChecklistItemId { get; set; }
    public ChecklistItem? ChecklistItem { get; set; }
    public bool Completed { get; set; }
    public string? Comment {get;set;}
}