import React, {createContext, useEffect, useState, useContext} from 'react';
import firebase from '../firebase';

interface PropsAuthContext {
  user: PropsUser;
  SingOut(): Promise<void>;
  signInWithPhoneNumber(phone: string): Promise<void>;
  logon(code: string): Promise<void>;
  confirmCode: any;
  enabled: boolean;
}

interface PropsUser {
  id: string;
  name: string;
  phone: string;
  region: string;
  avatar: string;
  friends: Array<PropsArrayFriends>;
  chats: Array<PropsArrayChats>;
}

interface PropsArrayChats {
  id: string;
  imageChat: string;
  nameChat: string;
  with: string;
}

interface PropsArrayFriends {
  id: string;
  name: string;
  phone: string;
  region: string;
  avatar: string;
}

const AuthContext = createContext<PropsAuthContext>({} as PropsAuthContext);

export const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState(null as any);

  const [confirmCode, setConfirmCode] = useState(null as any);
  const [enabled, setEnabled] = useState(false);

  const {firestore, auth} = firebase();

  const db = firestore();

  async function storage() {
    if (auth().currentUser) {
      db.collection('users')
        .doc(auth().currentUser?.phoneNumber || undefined)
        .get()
        .then(data => {
          setData(data.data());
        });
    }
  }

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirmCode(confirmation);
    setEnabled(true);
  };

  const logon = async (code: string) => {
    await confirmCode.confirm(code);

    await db
      .collection('users')
      .doc(auth().currentUser?.phoneNumber || undefined)
      .get()
      .then(data => {
        setData(data.data());
      });
  };

  const SingOut = async () => {
    setData(null as any);
    auth().signOut();
  };

  useEffect(() => {
    storage();
  });

  return (
    <AuthContext.Provider
      value={{
        user: data,
        SingOut: SingOut,
        signInWithPhoneNumber: signInWithPhoneNumber,
        logon: logon,
        confirmCode: confirmCode,
        enabled: enabled,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): PropsAuthContext {
  const context = useContext(AuthContext);

  return context;
}
