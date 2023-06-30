import { Circle } from './circle'

export class DeleteCircle extends Circle {
  constructor(supabase: any) {
    super(supabase)
  }

  private async privateGetPosts(circleUUID: UUID, iterations: number): Promise<false|Post[]> {
    const offset = 10 * iterations;

    const { data, error } = await this.supabase
      .from('Posts')
      .select()
      .order('created_at', { ascending: false })
      .offset(offset)
      .limit(10);

    if (error) return false
    return data
  }

  async getPosts(circleUUID: UUID, userUUID: UUID, iterations: number): Promise<false|Post[]> {
    if (!await this.getCircle(circleUUID, userUUID)) return false

    const posts = await this.privateGetPosts(circleUUID, iterations)
    if (!posts) return false

    return posts
  }
}