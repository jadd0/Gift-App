import { Circle } from "../circle/circle";

export class Post extends Circle {
  constructor(supabase: any) {
    super(supabase)
  }

  async checkIfModerator(circleUUID: UUID, userUUID: UUID): Promise<boolean> {
    const moderator = await this.getValue({
      table: 'CircleModerators',
      value: {
        circleUUID,
        userUUID
      }
    })

    if (!moderator) return false
    return moderator 
  }

  private async mapComments(post: any): Promise<any> {
    const comments = post.PostComments
    const replyComments = post.PostCommentReplies

    for (let i of replyComments) {

    }
  }

  private async actualGetPost(uuid: UUID): Promise<false|PostType> {
    const { data, error } = await this.supabase
      .from('Posts')
      .select('*, PostLikes(*), PostDislikes(*), Comments: PostComments(*, CommentLikes(*), CommentDislikes(*), PostCommentReplies(*, ReplyCommentDislikes(*), ReplyCommentLikes(*)))')
      .eq('uuid', uuid)

    console.log(data,error)
    if (!error) return false
    return data[0]
  }

  async getPost(uuid: UUID, userUUID: UUID): Promise<false|PostType> {
    const post = await this.actualGetPost(uuid)
    if (!post) return false

    if (!await this.getCircle(post.circleUUID, userUUID)) return false
    return post
  }
  
  async riskyGetPost(uuid: UUID) {
    // const { data, error } = await this.supabase
    //   .from('Posts')
    //   .select('*, PostLikes(*), PostDislikes(*), PostComments(*), CommentLikes(*), CommentDislikes(*), PostCommentReplies(*), ReplyCommentDislikes(*), ReplyCommentLikes(*)')
    //   .eq('uuid', uuid)

    const { data, error } = await this.supabase
      .from('Posts')
      .select('*, PostLikes(*), PostDislikes(*), Comments: PostComments(*, CommentLikes(*), CommentDislikes(*), PostCommentReplies(*, ReplyCommentDislikes(*), ReplyCommentLikes(*)))')
      .eq('uuid', uuid)

      console.log(data,error)
      if (!error) return false
      return data[0]
  }

}