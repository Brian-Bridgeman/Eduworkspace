
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

[Index(nameof(Username), IsUnique = true)]
[Index(nameof(Email), IsUnique = true)]

public class User
{
    public int Id {get; set;}
    public string Username{get; set;} = "";
    public string ImageId {get; set;}= "";
    public int? CompanyId {get; set;} 
    public string FirstName {get; set;}= "";
    public string LastName {get; set;}= "";
    public string Email {get; set;}= "";
    public string MobileNumber {get; set;}= "";
    public string PasswordHash {get; set;} ="";
}