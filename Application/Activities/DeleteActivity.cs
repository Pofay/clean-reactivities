using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            private readonly Guid _id;

            public Guid Id => _id;

            public Command(Guid activityId)
            {
                _id = activityId;
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
               var activity =  await _context.Activities.FindAsync(request.Id);
               _context.Remove<Activity>(activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}