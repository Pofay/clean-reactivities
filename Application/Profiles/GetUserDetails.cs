using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class GetUserProfile
    {

        public class Query : IRequest<Result<UserProfile>>
        {
            private readonly string _userName;
            public string UserName => _userName;
            public Query(string userName)
            {
                _userName = userName;
            }

            public class Handler : IRequestHandler<Query, Result<UserProfile>>
            {
                private readonly DataContext _context;
                private readonly IMapper _mapper;

                public Handler(DataContext context, IMapper mapper)
                {
                    _context = context;
                    _mapper = mapper;
                }

                public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
                {
                    var user = await _context.Users.ProjectTo<UserProfile>(_mapper.ConfigurationProvider).SingleOrDefaultAsync(x => x.UserName == request.UserName);

                    if(user == null) return Result.Fail("User profile could not be found");

                    return Result.Ok<UserProfile>(user);
                }
            }
        }
    }
}
