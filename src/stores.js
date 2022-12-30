import { writable } from 'svelte/store'
import { DB } from './classes/db'
import { Auth } from './classes/auth'
import { supabase } from './supabaseClient'
import { Parse } from './classes/parse'
import bcryptjs from 'bcryptjs';


export const db = writable(new DB(supabase))
console.log()
export const auth = writable(new Auth(new Parse, bcryptjs, supabase))