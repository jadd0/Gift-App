import { Circle } from './circle'

export class GetCirclePosts extends Circle {
  constructor(supabase: any) {
    super(supabase)
  }

  private async privateGetPosts(circleUUID: UUID, iterations: number): Promise<false|PostType[]> {
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

  async getPosts(circleUUID: UUID, userUUID: UUID, iterations: number): Promise<false|PostType[]> {
    if (!await this.getCircle(circleUUID, userUUID)) return false

    const posts = await this.privateGetPosts(circleUUID, iterations)
    if (!posts) return false

    return posts
  }
}