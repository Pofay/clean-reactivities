using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class ListFollowersOrFollowings
    {
        public record Query : IRequest<Result<List<UserProfile>>>
        {
            public string Predicate { get; init; }
            public string UserName { get; init; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserProfile>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserProfile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<UserProfile>();

                switch (request.Predicate)
                {
                    case "followers":
                        profiles = await _context.UserFollowings.Where(x => x.Target.UserName == request.UserName)
                                                                .Select(u => u.Observer)
                                                                .ProjectTo<UserProfile>(_mapper.ConfigurationProvider)
                                                                .ToListAsync();
                        break;
                    case "following":
                        profiles = await _context.UserFollowings.Where(x => x.Observer.UserName == request.UserName)
                                                                .Select(u => u.Target)
                                                                .ProjectTo<UserProfile>(_mapper.ConfigurationProvider)
                                                                .ToListAsync();
                        break;
                }

                return Result.Ok(profiles);
            }
        }
    }
}