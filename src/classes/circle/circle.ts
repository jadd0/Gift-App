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

		if (!circle.private) return circle;
    
    if (await this.getMember(uuid, userUUID)) return circle;

		return false;
	}

  async getUserCircles(userUUID: UUID): Promise<CircleType[]|[]> {
    const res = await this.getValue({
      table: 'Circles',
      value: {
        userUUID
      }
    })

    if (!res) return []
    return res
  }
}

// TODO: make so see if you have requested