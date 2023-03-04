using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using Application.Pagination;
using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            return result switch
            {
                { IsSuccess: true } => Ok(result.Value),
                { IsFailed: true } => NotFound(),
                _ => BadRequest(result.Errors)
            };
        }

        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            return result switch
            {
                { IsSuccess: true } => HandleWithPagination(result.Value),
                { IsFailed: true } => NotFound(),
                _ => BadRequest(result.Errors)
            };
        }

        protected ActionResult HandleWithPagination<T>(PagedList<T> result)
        {
            Response.AddPaginationHeader(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);
            return Ok(result);
        }
    }
}