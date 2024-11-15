import React, { createContext, useState, ReactNode, FC, useCallback, useEffect, useRef } from 'react';

interface ElementProps {
  id: number;
  index: number;
  element: React.ReactNode;
}

interface ElementStateContextProps {
  elementArray: ElementProps[];
  addElement: (element: React.ReactNode) => void
}

export const ElementStateContext = createContext<ElementStateContextProps>({
  elementArray: [],  
  addElement: () => {},
});

export const ElementStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [elementArray, setElementArray] = useState<ElementProps[]>([
    { id: 1, index: 0, element: <div>div</div> }
  ]);

  const lastIdRef = useRef<number>(1);

  const addElement = useCallback((newElement: React.ReactNode) => {
    const newId = lastIdRef.current + 1;
    lastIdRef.current = newId;

    setElementArray((prev) => [
      ...prev,
      { id: newId, index: prev.length, element: newElement },
    ]);
  }, []);

  return (
    <ElementStateContext.Provider value={{ elementArray, addElement }}>
      {children}
    </ElementStateContext.Provider>
  );
};