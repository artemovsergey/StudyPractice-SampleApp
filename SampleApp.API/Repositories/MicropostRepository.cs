using Microsoft.EntityFrameworkCore;
using SampleApp.API.Data;
using SampleApp.API.Entities;
using SampleApp.API.Exceptions;
using SampleApp.API.Interfaces;
using SampleApp.API.Models;

namespace SampleApp.API.Repositories;

public class MicropostRepository(SampleAppContext db) : IMicropostRepository
{
    public List<Micropost> GetMicroposts()
    {
        return db.Microposts.ToList();
    }

    public List<Micropost> GetMicroposts(Option opt)
    {
        var microposts = db.Microposts.AsNoTracking();

        var result = microposts
            .OrderBy(m => m.Content)
            .Skip((opt.PageNumber - 1) * opt.PageSize)
            .Take(opt.PageSize)
            .ToList();

        return result;
    }

    public Micropost CreateMicropost(Micropost post)
    {
        db.Microposts.Add(post);
        db.SaveChanges();
        return post;
    }

    public Micropost FindMicropostById(int id)
    {
        var post = db.Microposts.Find(id);
        return post != null ? post : throw new NotFoundException($"Нет сообщения c id = {id}");
    }

    public Micropost DeleteMicropost(int id)
    {
        var post = FindMicropostById(id);
        db.Microposts.Remove(post);
        db.SaveChanges();
        return post;
    }

    public Micropost EditMicropost(Micropost editedMicropost, int id)
    {
        var post = FindMicropostById(id);
        post.Content = editedMicropost.Content;
        db.Microposts.Update(post);
        db.SaveChanges();
        return post;
    }
}
