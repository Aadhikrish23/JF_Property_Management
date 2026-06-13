export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    pagination: PaginationMeta;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
