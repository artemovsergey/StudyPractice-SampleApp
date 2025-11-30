using Npgsql;
using SampleApp.API.Data;
using SampleApp.API.Entities;
using SampleApp.API.Interfaces;

namespace SampleApp.API.Repositories;

public class UsersRepository : IUserRepository
{
    private readonly SampleAppContext _db;

    public UsersRepository(SampleAppContext db)
    {
        _db = db;
    }

    public List<User> GetUsers()
    {
        return _db.Users.ToList();
    }

    public User CreateUser(User user)
    {
        try
        {
            _db.Add(user);
            _db.SaveChanges();
            return user;
        }
        catch (NpgsqlException ex)
        {
            throw new NpgsqlException($"Ошибка SQL: {ex.Message}");
        }
        catch (Exception ex)
        {
            throw new Exception($"Ошибка: {ex.Message}");
        }
    }

    public User EditUser(User user, int id)
    {
        throw new NotImplementedException();
    }

    public bool DeleteUser(int id)
    {
        throw new NotImplementedException();
    }

    public User FindUserById(int id)
    {
        var user = _db.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            throw new Exception("Пользователь не найден");
        }
        else
        {
            return user;
        }
    }

    public User FindUserByLogin(string login)
    {
        var user = _db.Users.FirstOrDefault(u => u.Login == login);
        if (user == null)
        {
            throw new Exception("Пользователь не найден");
        }
        return user;
    }
}
