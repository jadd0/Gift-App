import { Post } from "./post";

export class DeletePost extends Post {
  constructor(supabase: any) {
    super(supabase)
  }

  private async actualDeletePost(uuid: UUID): Promise<boolean> {
    const res = await this.deleteValue({
      table: 'Posts',
      values: {
        uuid
      }
    })

    return res
  }

  async deletePost(uuid: UUID, userUUID: UUID): Promise<boolean> {
    const post = await this.getPost(uuid, userUUID)
    if (!post) return false

    if (!await this.checkIfModerator(post.circleUUID, userUUID) || (userUUID != post.userUUID)) return false
    
    return await this.actualDeletePost(uuid)
  }
}