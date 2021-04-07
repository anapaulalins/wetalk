import React, {createContext, useState, useContext} from 'react';

import firebaseApp from '../firebase'

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  
  const [enabled, setEnabled] = useState(false);
  const [confirmation, setConfirmation] = useState(null)
  const [loading, setLoading] = useState(false);

  const { auth, db, firebase} = firebaseApp();

  const [data, setData] = useState(() => {

    const user = localStorage.getItem('@wetalk:user')

    if(user){
      return JSON.parse(user)
    }
    
    return null

  });




  const signInWithPhoneNumber = (phoneNumber) => {
    console.log(phoneNumber)
    setLoading(true)
   const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container' , 
   {
      size:"invisible"
   });

    firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha).then( function(e) {

      setConfirmation(e)
      setEnabled(true)
      setLoading(false)

    })
    .catch(function (error) {
        console.error( error);

    });
  };



  const logon = async (code) => {

    console.log(code)
   await confirmation.confirm(code)

    await db
      .collection('users')
      .doc(auth.currentUser?.phoneNumber || undefined)
      .get()
      .then(data => {
          localStorage.setItem('@wetalk:user', JSON.stringify(data.data()))
          setData(data.data())
      });
  };

  const SingOut = async () => {
    localStorage.removeItem('@wetalk:user')
    setData(null);
    auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user: data,
        SingOut: SingOut,
        signInWithPhoneNumber: signInWithPhoneNumber,
        logon: logon,
        enabled: enabled,
        loading: loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(){
  const context = useContext(AuthContext);

  return context;
}
