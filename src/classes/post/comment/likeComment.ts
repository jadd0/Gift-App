import { Comment } from "../commentReply/commentReply";

export class LikeComment extends Comment {
  constructor(supabase: any) {
    super(supabase)
  }

  private async getLiked(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.getValue({
      table: 'CommentLikes',
      value: {
        postUUID,
        userUUID
      }
    })

    if (!res) return false
    return true
  }

  private async actualLikeComment(postUUID: UUID, userUUID: UUID, commentUUID: UUID): Promise<boolean> {
    const res = await this.newValue({
      table: 'CommentLikes',
      values: {
        postUUID,
        userUUID,
        commentUUID
      }
    })

    return res
  }

  async deleteLike(postUUID: UUID, userUUID: UUID, commentUUID: UUID): Promise<boolean> {
    const res = await this.deleteValue({
      table: 'CommentLikes',
      values: {
        postUUID,
        userUUID,
        commentUUID
      }
    })

    return res
  }

  async likeComment(postUUID: UUID, userUUID: UUID, commentUUID: UUID): Promise<boolean> {
    const post = await this.getPost(postUUID, userUUID)
    if (!post) return false
    
    if (await this.getLiked(postUUID, userUUID)) return false
    
    return await this.actualLikeComment(postUUID, userUUID, commentUUID)
  }
}