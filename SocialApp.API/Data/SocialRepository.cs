using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SocialApp.API.Models;

namespace SocialApp.API.Data
{
    public class SocialRepository : ISocialRepository
    {
        private readonly DataContext _context;

        public SocialRepository(DataContext context)
        {
            _context = context;
        }
        public void add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int Id)
        {
            var user =await _context.Users.Include(p=>p.Photos).FirstOrDefaultAsync(u=>u.Id==Id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var Users =await _context.Users.Include(p=>p.Photos).ToListAsync();
            return Users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
            
        }
    }
}