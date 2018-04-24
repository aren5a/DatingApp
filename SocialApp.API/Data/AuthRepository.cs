using System;
using System.Threading.Tasks;
using SocialApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace SocialApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context=context;
        }
        async Task<User> IAuthRepository.Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (username == null)
                return null;

            if(!VerfyPasswordHash(password,user.PasswordHash,user.PasswordSalt))
                return null;

            // auth successfull 
            return user;
        }

        private bool VerfyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
             using (var hmac= new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        async Task<User> IAuthRepository.Register (User user, string password)
        {
            byte[] passwordHash,passwordSalt;
            CreatePasswordHash(password,out passwordHash,out passwordSalt);
            
            user.PasswordSalt=passwordSalt;
            user.PasswordHash=passwordHash;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac= new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt=hmac.Key;
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        async Task<bool> IAuthRepository.UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x=> x.Username == username))
            return true;

        return false;
        }
    }
}