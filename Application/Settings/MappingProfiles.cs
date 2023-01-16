using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Settings
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Should have a APIModel -> Domain -> PersistenceModel conversion
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>();
        }
    }
}