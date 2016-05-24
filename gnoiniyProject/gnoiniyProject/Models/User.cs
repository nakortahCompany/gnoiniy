using System.Collections.Generic;

namespace gnoiniyProject.Models
{
    public class User
    {
        public string ConnectionId { get; set; }
        public string Name { get; set; }
        public List<string> Connections { get; set; }
        public string Style { get; set; }
    }
}