using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentResults;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class GetActivity
    {
        public class Query : IRequest<Result<Activity>>
        {
            private readonly Guid _id;

            public Guid Id => _id;

            public Query(Guid Id)
            {
                _id = Id;
            }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity != null)
                {
                    return Result.Ok(activity);
                }
                else
                {
                    return Result.Fail("Could not find Activity");
                }
            }
        }
    }
}