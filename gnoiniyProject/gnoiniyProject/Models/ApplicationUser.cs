using Microsoft.AspNet.Identity.EntityFramework;

namespace gnoiniyProject.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string NickName { get; set; }
        public ApplicationUser()
        { }
    }
}