using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using gnoiniyProject.Models;

namespace gnoiniyProject.Hubs
{
    public class ChatHub : Hub
    {
        static List<User> Users = new List<User>();

        public void Send(string name, string message)
        {
            if (message != "")
            {
                string newName = "[" + DateTime.Now.ToString("hh:mm:ss") + "] " + name + ": ";
                string style = Users.FirstOrDefault(x => x.Name == name).Style;
                Clients.All.addMessage(newName, message, style);
            }
        }

        public void Connect(string userName)
        {
            var id = Context.ConnectionId;

            if(!Users.Any(x => x.Name == userName))
            {
                Random rnd = new Random();
                Users.Add(new User { ConnectionId = id, Name = userName, Connections = new List<string>(),Style = "style = \"color:rgb("+rnd.Next(0,255).ToString()+","+rnd.Next(0,255).ToString()+","+rnd.Next(0,255)+")\"" });
                var curr = Users.FirstOrDefault(x => x.Name == userName);
                curr.Connections.Add(id);
                Clients.Caller.onConnected(id, userName, Users);
                Clients.AllExcept(id).onNewUserConnected(id, userName);
                //Clients.AllExcept(curr.Connections.ToArray()).onNewUserConnected(id, userName);
            }else
            {
                var curr = Users.FirstOrDefault(x => x.Name == userName);
                Clients.Caller.onConnected(id, userName, Users);
                curr.Connections.Add(id);
            }


            //if (!Users.Any(x => x.ConnectionId == id))
            //{
            //    Users.Add(new User { ConnectionId = id, Name = userName });
            //    Clients.Caller.onConnected(id, userName, Users);
            //    Clients.AllExcept(id).onNewUserConnected(id, userName);
            //}
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            var item = Users.FirstOrDefault(x => x.Connections.Any(y => y == Context.ConnectionId));
            if (item != null)
            {
                var cid = item.Connections.FirstOrDefault(x => x == Context.ConnectionId);
                if (cid != null)
                {
                    item.Connections.Remove(cid);
                    if(!item.Connections.Any())
                    {
                        Users.Remove(item);
                        Clients.All.onUserDisconnected(item.ConnectionId, item.Name);
                    }
                }
                //Users.Remove(item);
                //var id = Context.ConnectionId;
                //Clients.All.onUserDisconnected(id, item.Name);
            }
            return base.OnDisconnected(stopCalled);
        }
    }
}