import { CommentReply } from "./commentReply";

export class DislikeCommentReply extends CommentReply {
  constructor(supabase: any) {
    super(supabase)
  }

  private async getDisliked(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.getValue({
      table: 'ReplyCommentDislikes',
      value: {
        postUUID,
        userUUID
      }
    })

    if (!res) return false
    return true
  }

  private async actualDislikeComment(postUUID: UUID, userUUID: UUID, commentUUID: UUID): Promise<boolean> {
    const res = await this.newValue({
      table: 'ReplyCommentDislikes',
      values: {
        postUUID,
        userUUID,
        commentUUID
      }
    })

    return res
  }

  async deleteDislike(postUUID: UUID, userUUID: UUID, commentUUID: UUID): Promise<boolean> {
    const res = await this.deleteValue({
      table: 'ReplyCommentDislikes',
      values: {
        postUUID,
        userUUID,
        commentUUID
      }
    })

    return res
  }

  async dislikeComment(postUUID: UUID, userUUID: UUID, commentUUID: UUID): Promise<boolean> {
    const { comment, post } = await this.getCommentAndPost(commentUUID)
    if (!comment) return false
    
    if (await this.getDisliked(postUUID, userUUID)) return false
    
    return await this.actualDislikeComment(postUUID, userUUID, commentUUID)
  }
}