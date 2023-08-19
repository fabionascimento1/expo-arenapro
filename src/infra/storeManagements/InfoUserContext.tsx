import {createContext, useState} from 'react';
export const UserContext = createContext(null);

function InfoUserContext({children}) {
  const [userInfo, setUserInfo] = useState({
    userToken: undefined,
    userId: undefined,
    userEmail: undefined,
    userType: undefined,
  });

  return (
    <UserContext.Provider value={{setUserInfo, userInfo}}>
      {children}
    </UserContext.Provider>
  );
}

export default InfoUserContext;
