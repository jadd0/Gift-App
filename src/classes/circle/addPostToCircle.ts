import { DB } from '../db';
import { Circle } from './circle'

export class AddPostToCircle extends Circle {
  constructor(supabase: any) {
    super(supabase)
  }

  private async pushToCircle(circleUUID: UUID, userUUID: UUID, post: Post): Promise<false|Post> {
    const res = await this.newValue({
      table: 'Posts',
      values: {
        ...post
      }
    })

    if (!res) return false
    return res
  }

  async add(circleUUID: UUID, userUUID: UUID, post: Post): Promise<false|Post> {
    const member = await this.getMember(circleUUID, userUUID)
    if (!member) return false

    const res = await this.pushToCircle(circleUUID, circleUUID, post)

    if (!res) return false
    return res
  }
}