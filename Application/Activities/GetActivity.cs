using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class GetActivity
    {
        public class Query : IRequest<Result<ActivityDto>>
        {
            private readonly Guid _id;

            public Guid Id => _id;

            public Query(Guid Id)
            {
                _id = Id;
            }
        }

        public class Handler : IRequestHandler<Query, Result<ActivityDto>>
        {
            private readonly DataContext _context;
            private IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activityDto = await _context.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (activityDto != null)
                {
                    return Result.Ok(activityDto);
                }
                else
                {
                    return Result.Fail("Could not find Activity");
                }
            }
        }
    }
}