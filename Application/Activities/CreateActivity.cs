using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentResults;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class CreateActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            private readonly Activity _activity;

            public Activity Activity => _activity;

            public Command(Activity activity)
            {
                _activity = activity;
            }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(a => a.Activity).SetValidator(new ActivityValidator());
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
                    _context.Activities.Add(request.Activity);
                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result.Fail("Failed to create activity");

                    return Result.Ok(Unit.Value);
                }
            }
        }
    }
}