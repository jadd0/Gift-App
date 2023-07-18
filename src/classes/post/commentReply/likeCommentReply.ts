import { CommentReply } from "./commentReply";

export class LikeCommentReply extends CommentReply {
  constructor(supabase: any) {
    super(supabase)
  }

  private async getLiked(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.getValue({
      table: 'ReplyCommentLikes',
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
      table: 'ReplyCommentLikes',
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
      table: 'ReplyCommentLikes',
      values: {
        postUUID,
        userUUID,
        commentUUID
      }
    })

    return res
  }

  async likeComment(postUUID: UUID, userUUID: UUID, commentUUID: UUID): Promise<boolean> {
    const { comment, post } = await this.getCommentAndPost(commentUUID)
    if (!comment) return false
    
    if (await this.getLiked(postUUID, userUUID)) return false
    
    return await this.actualLikeComment(postUUID, userUUID, commentUUID)
  }
}