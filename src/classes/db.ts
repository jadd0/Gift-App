export class DB {
	supabase: any;

	constructor(supabase: any) {
		this.supabase = supabase;
	}

  async getAllValues(table: string) {

    const { data, e } = await this.supabase
			.from(table)
			.select('*')

		if (data.length == 0) return false;
		return data;
  }

	async getValue(config: {
		table: string;
		column: string;
		value: string;
		amount?: any;
    returnValues?: any;
	}) {
    let { table, column, value, amount, returnValues } = config;

    if (returnValues == undefined) {
      returnValues = '*';
    }

    const { data, e } = await this.supabase
			.from(table)
			.select(returnValues)
			.eq(column, value);

		if (data.length == 0) return false;
		return data;
  }

	async updateValue() {}

	async newValue(config: {
    table: string;
    values: any;
  }) {
    const { table, values } = config;

    const { data, error } = await this.supabase.from(table).insert([
			{
				values
			},
		]);
  }

	async deleteValue() {}
}
