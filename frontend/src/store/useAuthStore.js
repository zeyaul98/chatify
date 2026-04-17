import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
   authUser: null,
   isCheckingAuth : true,
   isSigningUp : false,
   isLoggingIn : false,

   checkAuth   : async () => {
      try {
         const res = await axiosInstance.get('/auth/check');
         set({authUser: res.data.user})
      } catch (error) {
         console.log('error in authCheck',error)
         set({authUser:null})
      } finally{
         set({isCheckingAuth : false})
      }
   },

   signup : async(data)=>{
      set({isSigningUp:true})
      try {
         const res = await axiosInstance.post('/auth/signup',data);
         set({authUser:res.data})

         //toast
         toast.success("Account create succesfully!")

      } catch (error) {
         toast.error(error.response.data.message )
      } finally {
         set({isSigningUp:false})
      }
   },


   login : async(data)=>{
      set({isSigningUp:true})
      try {
         const res = await axiosInstance.post('/auth/login',data);
         set({authUser:res.data})

         //toast
         toast.success("Logged in succesfully!")

      } catch (error) {
         toast.error(error.response.data.message )
      } finally {
         set({isLoggingIn:false})
      }
   },

   logout : async()=>{
      try {
         await axiosInstance.post('/auth/logout');
         set({authUser:null})
         toast.success("Logged out succesfully!")
      } catch (error) {
         toast.error("Failed to log out.")
         
      }
   },

   updateProfile : async(data)=>{
      try {
         const res = await axiosInstance.put('/auth/update-profile',data);
         set({authUser:res.data})
         toast.success("Profile updated succesfully!")
      } catch (error) {
         console.log('error updating profile',error)
         toast.error("Failed to update profile.");
      }
   }
}))