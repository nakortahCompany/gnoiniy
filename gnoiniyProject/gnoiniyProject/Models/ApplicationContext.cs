using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace gnoiniyProject.Models
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext() : base("ChatDB") { }

        public static ApplicationContext Create()
        {
            return new ApplicationContext();
        }
    }
}