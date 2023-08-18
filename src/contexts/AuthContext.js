import React, { useContext, useState, useEffect } from 'react'
import {  auth  } from '../firebase.js'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    //Reset password
    function resetpassword(email) {
      return auth.sendPasswordResetEmail(email)
    }

    //Sign up funciton
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }


    //Login Function
    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
    }

        //update email
        function updateEmail(email) {
          return currentUser.updateEmail(email) 
        }

            //update password
    function updatePassword(password) {
      return currentUser.updatePassword(password)
    }

     //logout Function
     function logout() {
      return auth.signOut()
    }

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    }, []);
    
    // ...
    const value = {
      currentUser,
      userID: currentUser ? currentUser.uid : null, // Add user ID here
      login,
      signup,
      logout,
      resetpassword,
      updateEmail,
      updatePassword
    };

  return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
  )
}
