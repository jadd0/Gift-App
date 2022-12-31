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

    const res = await this.newValue({ table: 'Circles', values: { name, description, owner: username } })

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