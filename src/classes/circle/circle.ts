import { DB } from '../db';

export class Circle extends DB {
	constructor(supabase: any) {
    super(supabase)
  }

	async getMember(circleUUID: UUID, userUUID: UUID): Promise<any> {
		const value = await this.getValue({
			table: 'CircleMembers',
			value: {
				circleUUID,
				userUUID,
			},
		});

    if (!value) return false
    return true
	}

	async getCircle(uuid: UUID, userUUID: UUID): Promise<any> {
		const circle = await this.getValue({
			table: 'Circles',
			value: {
				uuid,
			},
		});

		if (!circle) return false;

		const request = await this.getValue({
      table: 'MemberRequests',
      value: {
        circleUUID: uuid,
				userUUID
      }
    })

		if (!circle.private) return {
			...circle,
			requested: request ? true : false
		};
    
    if (await this.getMember(uuid, userUUID)) return circle;

		return false;
	}

  async getUserCircles(userUUID: UUID, checkingUserUUID: UUID): Promise<CircleType[]|[]> {
		// TODO: check if private
    const res = await this.getValue({
      table: 'Circles',
      value: {
        userUUID
      }
    })

    if (!res) return []
    return res
  }

	async getMembers(circleUUID: UUID, userUUID: UUID): Promise<false|string[]> {
		const res = await this.getCircle(circleUUID, userUUID)
		if (!res) return false

		const members = await this.getValue({
			table: 'CircleMembers',
			value: {
				circleUUID
			}
		})

		return members
	}
}