import { time_ranges_to_array } from "svelte/internal";

export class DB {
	supabase: any;

	constructor(supabase: any) {
		this.supabase = supabase;
	}

	async getAllValues(table: string) {
		const { data, error } = await this.supabase.from(table).select('*');

		if (error != undefined) return false;
		return data;
	}

	async getValue(config: {
		table: string;
		value: any;
		amount?: any;
		returnValues?: any;
	}) {
		let { table, value, amount, returnValues } = config;

		if (returnValues == undefined) {
			returnValues = '*';
		}

		console.log(value)

		const { data, error } = await this.supabase
			.from(table)
			.select(returnValues)
			.match(value);

			console.log({data, error})
		if (data.length == 0) return false;
		return data[0];
	}

	async updateValue(config: {
		table: string;
		valueToChange: string;
		columnToChange: string;
		valueToMatch: string;
		columnToMatch: string;
	}) {
		const {
			table,
			valueToChange,
			columnToChange,
			valueToMatch,
			columnToMatch,
		} = config;

		const { data, error } = await this.supabase
			.from(table)
			.update({ [columnToChange]: valueToChange })
			.match({ [columnToMatch]: valueToMatch });

		console.log(data, error)

		if (error != undefined) return false;
		return true;
	}

	async newValue(config: { table: string; values: any }) {
		const { table, values } = config;

		const { data, error } = await this.supabase.from(table).insert([values]);

		if (error != undefined) return false
		return true
	}

	async deleteValue(config: { table: string; values: any }) {
		const { table, values } = config;
		console.log(values)
		const { data, error } = await this.supabase
			.from(table)
			.delete()
			.match(values);
		console.log({data, error})
		if (error != undefined) return true
		return false
	}
}
