import { Post } from "../post";

export class LikePost extends Post {
  constructor(supabase: any) {
    super(supabase)
  }

  private async getLiked(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.getValue({
      table: 'PostLikes',
      value: {
        postUUID,
        userUUID
      }
    })

    if (!res) return false
    return true
  }

  private async actualLikePost(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.newValue({
      table: 'PostLikes',
      values: {
        postUUID,
        userUUID
      }
    })

    return res
  }

  async deleteLike(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.deleteValue({
      table: 'PostLikes',
      values: {
        postUUID,
        userUUID
      }
    })

    return res
  }

  async likePost(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const post = await this.getPost(postUUID, userUUID)
    
    if (!post) return false
    
    if (await this.getLiked(postUUID, userUUID)) return false
    
    return await this.actualLikePost(postUUID, userUUID)
  }
}