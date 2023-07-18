import { Circle } from './circle'

export class MakeCircle extends Circle {
  constructor(supabase: any) {
    super(supabase)
  }

  private async getSameName(circleValues: CircleType): Promise<boolean> {
    const circles = await this.getUserCircles(circleValues.owner)

    for (let circle of circles as CircleType[]) {
      if (circle.name == circleValues.name) return false
    }

    return true
  }

  async newCircle(config: CircleType): Promise<false|CircleType> {
    const circleValues = {...config}

    if (!await this.getSameName(circleValues)) return false

    const res: CircleType = await this.newValue({
      table: 'Circles',
      values: {
        ...circleValues
      }
    })

    if (!res) return false
    return res
  }
}