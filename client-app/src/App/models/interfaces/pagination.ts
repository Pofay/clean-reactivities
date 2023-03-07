export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  data: T;
  pagination: Pagination;

  constructor(data: T, pagination: Pagination) {
    this.data = data;
    this.pagination = pagination;
  }
}

export interface PagingParams {
  pageNumber: number;
  pageSize: number;
}

export function createPagingParams(
  pageNumber: number = 1,
  pageSize = 2
): PagingParams {
  return {
    pageNumber,
    pageSize,
  };
}
