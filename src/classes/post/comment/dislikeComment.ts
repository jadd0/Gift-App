import { Comment } from './comment';

export class DislikeComment extends Comment {
  constructor(supabase: any) {
    super(supabase)
  }

  private async getDisliked(postUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.getValue({
      table: 'CommentDislikes',
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
      table: 'CommentDislikes',
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
      table: 'CommentDislikes',
      values: {
        postUUID,
        userUUID,
        commentUUID
      }
    })

    return res
  }

  async dislikeComment(postUUID: UUID, userUUID: UUID, commentUUID: UUID): Promise<boolean> {
    const post = await this.getPost(postUUID, userUUID)
    if (!post) return false
    
    if (await this.getDisliked(postUUID, userUUID)) return false
    
    return await this.actualDislikeComment(postUUID, userUUID, commentUUID)
  }
}