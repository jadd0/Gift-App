import { writable } from 'svelte/store'

import { supabase } from './supabaseClient'
import bcryptjs from 'bcryptjs';

import { DB } from './classes/db'
import { Auth } from './classes/auth'
import { Parse } from './classes/parse'
import { User } from './classes/user'
import { Circles } from './classes/circles';


export const db = writable(new DB(supabase))
export const auth = writable(new Auth(new Parse, bcryptjs, supabase))
export const user = writable(new User(supabase))
export const circles = writable(new Circles(supabase))