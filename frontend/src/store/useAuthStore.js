import {create} from 'zustand'

export const useAuthStore = create((set) => ({
   authUser: {name  : 'John Doe', _id : 123, age: 30},
   isLoggedIn: false,

   login : () => {
    console.log('Login function called');
    set({ isLoggedIn: true })
   }
}))