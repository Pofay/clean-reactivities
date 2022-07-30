using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
                private readonly IMapper _mapper;

                public Handler(DataContext context, IMapper mapper)
                {
                    _context = context;
                    _mapper = mapper;
                }

                public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                {
                    var activity = await _context.Activities.FindAsync(request.Activity.Id);

                    // Change to use proper APIModel -> DomainModel -> PersistenceModel style
                    _mapper.Map(request.Activity, activity);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }
            }
        }

    }
}