import { time_ranges_to_array } from "svelte/internal";

export class DB {
	supabase: any;

	constructor(supabase: any) {
		this.supabase = supabase;
	}

	generateUUID() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
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
