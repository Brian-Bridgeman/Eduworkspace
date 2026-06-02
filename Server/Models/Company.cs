public class Company
{
    public int Id { get; set; }
    public string Name { get; set; } = "";

    //En företag kan har flera användare
    public List<User> Users { get; set; } = [];
}