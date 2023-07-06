import { Post } from "../post";

export class DislikePost extends Post {
  constructor(supabase: any) {
    super(supabase)
  }

  private async getDisliked(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.getValue({
      table: 'PostDislikes',
      value: {
        postUUID,
        userUUID
      }
    })

    if (!res) return false
    return true
  }

  private async actualDislikePost(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.newValue({
      table: 'PostDislikes',
      values: {
        postUUID,
        userUUID
      }
    })

    return res
  }

  async deleteDislike(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.deleteValue({
      table: 'PostDislikes',
      values: {
        postUUID,
        userUUID
      }
    })

    return res
  }

  async dislikePost(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const post = await this.getPost(postUUID, userUUID)
    if (!post) return false

    if (await this.getDisliked(postUUID, userUUID)) return false

    return await this.actualDislikePost(postUUID, userUUID)
  }
}