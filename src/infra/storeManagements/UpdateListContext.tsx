import {createContext, useState} from 'react';
export const CreateUpdateListContext = createContext(null);

function UpdateListContext({children}) {
  const [updateList, setUpdateList] = useState<void>();

  return (
    <CreateUpdateListContext.Provider value={{updateList, setUpdateList}}>
      {children}
    </CreateUpdateListContext.Provider>
  );
}

export default UpdateListContext;
