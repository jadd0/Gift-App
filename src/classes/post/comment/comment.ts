import { Post } from "../post";

export class Comment extends Post {
  constructor(supabase: any) {
    super(supabase)
  }

  async getComment(uuid: UUID) {
    const { data, error } = await this.supabase
      .from('PostComments')
      .select('*, CommentLikes(*)')
      .eq('PostComemnts.uuid', uuid)
  }

  private async actualPostComment(postUUID: UUID, userUUID: UUID, body: string): Promise<boolean> {
      const res = await this.newValue({
        table: 'PostCommentsReplies',
        values: {
          postUUID,
          userUUID,
          body
        }
      })
      
      return res
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

  private async privateGetCommentAndPost(commentUUID: UUID) : Promise<any> {
    const comment = await this.getValue({
      table: 'PostComments',
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

  private async privateDeleteComment(commentUUID: UUID) : Promise<boolean> {
    const res = await this.deleteValue({
      table: 'PostComments',
      values: {
        uuid: commentUUID
      }
    })

    return res
  }


  async deleteComment(commentUUID: UUID, userUUID: UUID): Promise<boolean> {
    const { comment, post } = await this.privateGetCommentAndPost(commentUUID)
    
    if (!comment) return false
    if (comment.userUUID != userUUID || !await this.checkIfModerator(post.uuid, userUUID)) return false

    return await this.privateDeleteComment(commentUUID)
  }

  async replyToComment(commentUUID: UUID, userUUID: UUID, body: string): Promise<boolean> {
    const { comment, post } = await this.privateGetCommentAndPost(commentUUID)
    if (!comment) return false

    return await this.actualPostReply(commentUUID, userUUID, body)
  }

  async postComment(postUUID: UUID, userUUID: UUID, body: string): Promise<boolean> {
    const post = await this.getPost(postUUID, userUUID)
    if (!post) return false

    return await this.actualPostComment(postUUID, userUUID, body)
  }
}