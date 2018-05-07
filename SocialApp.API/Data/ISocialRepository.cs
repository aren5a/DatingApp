using System.Collections.Generic;
using System.Threading.Tasks;
using SocialApp.API.Models;

namespace SocialApp.API.Data
{
    public interface ISocialRepository
    {
         void add<T> (T entity) where T: class;
         void delete<T> (T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();

         Task<User> GetUser(int Id);
    }
}