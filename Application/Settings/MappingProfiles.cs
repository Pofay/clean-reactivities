using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        }
    }
}