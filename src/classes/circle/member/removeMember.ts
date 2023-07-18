import { DB } from '../../db';
import { Circle } from '../circle';
import { NewMember } from './newMember';

export class RemoveMember extends NewMember {
  constructor(supabase: any) {
    super(supabase)
  }

  private async actualRemoveMember(circleUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.deleteValue({
      table: 'CircleMembers',
      values: {
        userUUID
      }
    })

    if (!res) return false
    return true
  }

  async removeMember(circleUUID: UUID, userUUID: UUID, moderatorUUID: UUID): Promise<boolean> {
    if (!await this.checkIfModerator(circleUUID, moderatorUUID) || moderatorUUID != userUUID) return false

    if (!await this.actualRemoveMember(circleUUID, userUUID)) return false
    
    return true
  }

}