public class ChecklistItem
{
    public int Id { get; set; }

    public int ChecklistId { get; set; }
    public Checklist? Checklist { get; set; }

    public string Text { get; set; } = "";
    public int SortOrder { get; set; }
}