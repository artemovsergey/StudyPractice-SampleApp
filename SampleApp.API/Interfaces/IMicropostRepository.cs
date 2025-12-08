using SampleApp.API.Entities;
using SampleApp.API.Models;

namespace SampleApp.API.Interfaces;

public interface IMicropostRepository
{
    Micropost CreateMicropost(Micropost post);
    List<Micropost> GetMicroposts();
    List<Micropost> GetMicroposts(Option opt);
    List<Micropost> GetMicropostsByUser(int id);

    Micropost DeleteMicropost(int id);
    Micropost FindMicropostById(int id);
    Micropost EditMicropost(Micropost editedMicropost, int id);
}
