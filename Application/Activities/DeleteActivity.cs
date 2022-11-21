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
    public class DeleteActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            private readonly Guid _id;

            public Guid Id => _id;

            public Command(Guid activityId)
            {
                _id = activityId;
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity != null)
                {
                    _context.Remove<Activity>(activity);
                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result)
                    {
                        return Result.Fail("Failed to delete activity");
                    }
                    return Result.Ok(Unit.Value);
                }
                else
                {
                    return Result.Fail("Could not find activity to delete");
                }
            }
        }
    }
}