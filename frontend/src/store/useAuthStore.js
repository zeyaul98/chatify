import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set,get) => ({
   authUser: null,
   isCheckingAuth : true,
   isSigningUp : false,
   isLoggingIn : false,
   socket : null,
   onlineUsers : [],

   checkAuth   : async () => {
      try {
         const res = await axiosInstance.get('/auth/check');
         set({authUser: res.data.user})
         get().connectSocket();
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

      get().connectSocket();

      } catch (error) {
         toast.error(error.response.data.message )
      } finally {
         set({isSigningUp:false})
      }
   },


   login : async(data)=>{
      set({isLoggingIn:true})
      try {
         const res = await axiosInstance.post('/auth/login',data);
         set({authUser:res.data})

         //toast
         toast.success("Logged in succesfully!")

      get().connectSocket();
      } catch (error) {
   console.log("LOGIN ERROR:", error);

   const message =
      error.response?.data?.message ||
      error.message ||
      "Login failed";

   toast.error(message);
} finally {
         set({isLoggingIn:false})
      }
   },

   logout : async()=>{
      try {
         await axiosInstance.post('/auth/logout');
         set({authUser:null})
         toast.success("Logged out succesfully!")

         get().disconnectSocket();
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
   },


   connectSocket: async()=>{
      const {authUser} = get()
      if(!authUser || get().socket?.connected) return;
      const socket = io(BASE_URL, {withCredentials:true}
         
      );
      socket.connect();

      set({socket})

      // listen for online users events
      socket.on("getOnlineUsers", (userIds)=>{
         set({onlineUsers: userIds})
      })
   },

   disconnectSocket: async()=>{
     if(get().socket?.connected) get().socket?.disconnect();
   }
}))