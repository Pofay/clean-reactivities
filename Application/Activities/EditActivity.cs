using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class EditActivity
    {
        public class Command : IRequest
        {
            private readonly Activity _activity;

            public Activity Activity => _activity;

            public Command(Activity activity) 
            {
                _activity = activity;
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
                    var activity = await _context.Activities.FindAsync(request.Activity.Id);

                    activity.Title = request.Activity.Title ?? activity.Title;

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }
            }
        }

    }
}