import { DB } from '../../db';
import { Circle } from '../circle'
import { NewMember } from './newMember';


export class Moderator extends NewMember {
  constructor(supabase: any) {
    super(supabase)
  }

  private async newModerator(circleUUID: UUID, userUUID: UUID): Promise<any> {
    const res = await this.newValue({
      table: 'CircleModerators',
      values: {
        circleUUID,
        userUUID
      }
    })

    return res
  }
  
  private async removeModerator(circleUUID: UUID, userUUID: UUID): Promise<boolean> {
    const res = await this.deleteValue({
      table: 'CircleModerators',
      values: {
        circleUUID,
        userUUID
      }
    })

    return res
  }

  async demoteModerator(circleUUID: UUID, userUUID: UUID, moderatorUUID: UUID): Promise<boolean> {
    if (!await this.checkIfModerator(circleUUID, moderatorUUID)) return false
    if (!await this.checkIfModerator(circleUUID, userUUID)) return false

    return await this.removeModerator(circleUUID, userUUID)
  }

  async promoteModerator(circleUUID: UUID, userUUID: UUID, moderatorUUID: UUID): Promise<any> {
    if (!await this.checkIfModerator(circleUUID, moderatorUUID)) return false
    if (await this.checkIfModerator(circleUUID, userUUID)) return false

    return await this.newModerator(circleUUID, userUUID)
  }
}