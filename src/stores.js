import { writable } from 'svelte/store'
import { DB } from './classes/db'
import { Auth } from './classes/auth'
import { supabase } from './supabaseClient'
import { Parse } from './classes/parse'
import { User } from './classes/user'
import bcryptjs from 'bcryptjs';


export const db = writable(new DB(supabase))
export const auth = writable(new Auth(new Parse, bcryptjs, supabase))
export const user = writable(new User(supabase))