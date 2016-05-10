using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(gnoiniyProject.Startup))]
namespace gnoiniyProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
