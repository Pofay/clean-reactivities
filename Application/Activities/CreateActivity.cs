using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class CreateActivity
    {
        public class Command : IRequest
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

            public class Handler : IRequestHandler<Command>
            {
                private readonly DataContext _context;

                public Handler(DataContext context)
                {
                    _context = context;
                }

                public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                {
                    _context.Activities.Add(request.Activity);
                    await _context.SaveChangesAsync();
                    return Unit.Value;
                }
            }
        }
    }
}