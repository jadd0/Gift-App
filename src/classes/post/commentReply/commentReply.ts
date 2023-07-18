import { Post } from "../post";

export class CommentReply extends Post {
  constructor(supabase: any) {
    super(supabase)
  }

  private async actualPostReply(commentUUID: UUID, userUUID: UUID, body: string): Promise<boolean> {
    const res = await this.newValue({
      table: 'PostCommentsReplies',
      values: {
        commentUUID,
        userUUID,
        body
      }
    })
    
    return res
  }

  private async privateDeleteReply(commentUUID: UUID): Promise<boolean> {
    const res = await this.deleteValue({
      table: 'PostCommentsReplies',
      values: {
        uuid: commentUUID
      }
    })

    return res
  }


  async getCommentReplyAndPost(commentUUID: UUID) : Promise<any> {
    const comment = await this.getValue({
      table: 'PostCommentsReplies',
      value: {
        commentUUID
      }
    })

    if (!comment) return false

    const post = await this.getValue({
      table: 'Posts',
      value: {
        uuid: comment.postUUID
      }
    })

    if (!post) return false

    return {comment, post}
  }

  async deleteReply(commentUUID: UUID, userUUID: UUID): Promise<boolean> {
    const { comment, post } = await this.getCommentReplyAndPost(commentUUID)
    
    if (!comment) return false
    if (comment.userUUID != userUUID || !await this.checkIfModerator(post.uuid, userUUID)) return false

    return await this.privateDeleteReply(commentUUID)
  }

  async replyToComment(commentUUID: UUID, userUUID: UUID, body: string): Promise<boolean> {
    const { comment, post } = await this.getCommentAndPost(commentUUID)
    if (!comment) return false

    return await this.actualPostReply(commentUUID, userUUID, body)
  }
}