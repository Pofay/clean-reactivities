using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Pagination
{
    public class PagingParams
    {
        // should be set in the .env
        private const int MaxPageSize = 50;
        private int _pageSize = 2;
        public int PageNumber { get; set; } = 1;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}