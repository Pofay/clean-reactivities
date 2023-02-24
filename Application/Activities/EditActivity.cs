using AutoMapper;
using Domain;
using FluentResults;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class EditActivity
    {
        public record Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; init; }

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
                private readonly IMapper _mapper;

                public Handler(DataContext context, IMapper mapper)
                {
                    _context = context;
                    _mapper = mapper;
                }

                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var activity = await _context.Activities.FindAsync(request.Activity.Id);

                    if (activity != null)
                    {
                        // Change to use proper APIModel -> DomainModel -> PersistenceModel style
                        _mapper.Map(request.Activity, activity);
                        var operations = await _context.SaveChangesAsync();

                        if (operations > 0)
                        {
                            return Result.Ok(Unit.Value);
                        }
                        return Result.Fail("Failed to update Activity");
                    }
                    else
                    {
                        return Result.Fail("Could not find Activity to update");
                    }
                }
            }
        }

    }
}