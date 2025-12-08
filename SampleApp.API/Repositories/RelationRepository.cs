using SampleApp.API.Data;
using SampleApp.API.Entities;
using SampleApp.API.Interfaces;

namespace SampleApp.API.Repositories;

public class RelationRepository(SampleAppContext db) : IRelationRepository
{
    public Relation FindRelation(int followerId, int followedId)
    {
        var r = db
            .Relations.Where(r => r.FollowedId == followedId && r.FollowerId == followerId)
            .FirstOrDefault();
        return r != null ? r : throw new Exception("Нет такой связи");
    }

    public bool CreateRelation(Relation relation)
    {
        db.Relations.Add(relation);
        db.SaveChanges();
        return true;
    }

    public bool DeleteRelation(Relation relation)
    {
        db.Relations.Remove(relation);
        db.SaveChanges();
        return true;
    }
}
