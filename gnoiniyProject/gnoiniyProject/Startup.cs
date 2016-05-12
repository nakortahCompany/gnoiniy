using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(gnoiniyProject.Startup))]

namespace gnoiniyProject
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
