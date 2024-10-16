// POST events の際の Body Request 定義
export interface CreateEventDto {
  name: string
}

// PATCH events/:id の際の Body Request 定義
export interface UpdateEventDto {
  name: string
}