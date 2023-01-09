import { DB } from "./db";

export class Circles extends DB {
  constructor(supabase: any) {
    super(supabase)
  }

  async createCircle(config: { name: string, description?: string, username: string}) {
    let { name, description, username } = config;
    
    if (description == undefined) {
      description = '[Insert description here...]';
    }
    const uuid: string = this.generateUUID()

    const createRes = await this.newValue({ table: 'Circles', values: { name, description, owner: username, uuid } })
    if (!createRes) return false

    const joinRes = await this.joinCircle({ username, uuid })
    if (!joinRes) return false

    return true
  }

  async joinCircle(config: { uuid: string, username: string }) {
    const { uuid, username } = config;

    const res = await this.newValue({ table: 'CircleMembers', values: { username, circleID: uuid } })

    if (!res) return false
    return true
  }

  async deleteCircle() {

  }

  async leaveCircle() {

  }

  async addToCircle() {

  }

  async deleteFromCircle() {

  }
  
  async getCircleContent() {

  }

  async getCircleDetails() {
    
  }
}