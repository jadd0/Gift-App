import { Circle } from './circle'

export class DeleteCircle extends Circle {
  constructor(supabase: any) {
    super(supabase);
  }

  private async delete(circleUUID: UUID): Promise<boolean> {
    const res = await this.deleteValue({
      table: 'Circles',
      values: {
        uuid: circleUUID
      }
    })

    if (!res) return false

    return true
  }

  async deleteCircle(circleUUID: UUID, userUUID: UUID): Promise<boolean> {
    const circle = await this.getCircle(circleUUID, userUUID)

    if (!circle) return false
    if (circle.owner != userUUID) return false

    const res = await this.delete(circleUUID)
    if (!res) return false

    return true
  }
}