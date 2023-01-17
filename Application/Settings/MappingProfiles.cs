using Application.Activities;
using Application.Profiles;
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
            CreateMap<Activity, ActivityDto>()
            .ForMember(a => a.HostUsername,
            o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}