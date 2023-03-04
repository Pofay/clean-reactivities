using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using Application.Pagination;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities([FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await _mediator.Send(new ListActivities.Query { Params = pagingParams }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await _mediator.Send(new CreateActivity.Command
            {
                Activity = activity
            }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result = await _mediator.Send(new GetActivity.Query
            {
                Id = id
            });

            return HandleResult(result);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await _mediator.Send(new EditActivity.Command
            {
                Activity = activity
            }));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await _mediator.Send(new DeleteActivity.Command
            {
                Id = id
            }));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await _mediator.Send(new UpdateAttendance.Command
            {
                Id = id
            }));
        }
    }
}