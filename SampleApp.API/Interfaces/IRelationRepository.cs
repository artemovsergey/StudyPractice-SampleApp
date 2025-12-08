using SampleApp.API.Entities;

namespace SampleApp.API.Interfaces;

public interface IRelationRepository
{
    bool CreateRelation(Relation relation);
    public bool DeleteRelation(Relation relation);
    public Relation FindRelation(int followerId, int followedId);
}
