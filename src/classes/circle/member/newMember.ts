import { DB } from '../../db';
import { Circle } from '../circle'

export class NewMember extends Circle {
  constructor(supabase: any) {
    super(supabase)
  }

  private async newRequest(circleUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.newValue({
      table: 'MemberRequests',
      values: {
        circleUUID,
        userUUID
      }
    })

    if (!res) return false
    return true
  }

  private async deleteRequest(requestUUID: UUID): Promise<boolean> {
    const res = await this.deleteValue({
      table: 'MemberRequests',
      values: {
        uuid: requestUUID
      }
    })

    if (!res) return false
    return true
  }


  async acceptMember(requestUUID: UUID, userUUID: UUID): Promise<boolean> {
    const request = await this.getValue({
      table: 'MemberRequests',
      value: {
        uuid: requestUUID
      }
    })

    if (!request) return false

    const moderator = await this.getValue({
      table: 'CircleModerators',
      value: {
        userUUID
      }
    })

    if (!moderator) return false

    const deleteRes = await this.deleteRequest(requestUUID)
    if (!deleteRes) return false

    const newMemberRes = await this.newMember(request.circleUUID, request.userUUID, true)
    if (!newMemberRes) return false

    return true
  }

  private async addMember(circleUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.newValue({
      table: 'CircleMembers',
      values: {
        circleUUID,
        userUUID
      }
    })

    if (!res) return false
    return true
  }

  async newMember(circleUUID: UUID, userUUID: UUID, request?: boolean): Promise<boolean> {
    const circle = await this.getCircle(circleUUID, userUUID)

    if (!circle && !request) {
      const res = await this.newRequest(circleUUID, userUUID)

      if (!res) return false
      return true
    }

    const res = await this.addMember(circleUUID, userUUID)
    if (!res) return false

    return true
  }

}