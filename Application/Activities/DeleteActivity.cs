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
        public record Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; init; }
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

                var result = await Result.Ok(activity)
                .Bind(activity => activity != null ? Result.Ok(activity) : Result.Fail("Cannot find activity to delete"))
                .Bind(activity =>
                {
                    _context.Remove<Activity>(activity);
                    return Result.Try(() => _context.SaveChangesAsync());
                });

                return result.Bind(deletions => Result.OkIf(deletions > 0, "Failed to delete activity"));
            }
        }
    }
}