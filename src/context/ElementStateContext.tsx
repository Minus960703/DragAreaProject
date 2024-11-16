import React, { createContext, useState, ReactNode, FC, useCallback, useEffect, useRef } from 'react';

interface ElementProps {
  id                      : number;
  index                   : number;
  element                 : React.ReactNode;
  attribute               : 'div' | 'span' | 'p';
  active                  : boolean;
}

interface ElementStateContextProps {
  elementArray            : ElementProps[];
  elementSortVertical     : boolean;
  addElement              : (element: React.ReactNode, attribute: ElementProps['attribute']) => void
  sortAllElementSort      : () => void;
  toggleActive            : (id: ElementProps['id'], isShiftPressed: boolean) => void;
}

export const ElementStateContext = createContext<ElementStateContextProps>({
  elementArray            : [],  
  elementSortVertical     : false,
  addElement              : () => { },
  sortAllElementSort      : () => { },
  toggleActive            : () => { },
});

export const ElementStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [elementArray         , setElementArray         ] = useState<ElementProps[]>([
    { id: 1, index: 0, element: <div style={{backgroundColor: '#fff'}}>div</div>, attribute: 'div', active: true }
  ]);
  const [elementSortVertical  , setElementSortVertical  ] = useState<ElementStateContextProps['elementSortVertical']>(false);
  

  const toggleActive = useCallback((id: number, isShiftPressed: boolean) => {
    setElementArray((prev) => {
      if (!isShiftPressed) {
        // 개별 클릭: 모든 요소를 비활성화하고 클릭된 요소만 활성화
        return prev.map((el) => ({ ...el, active: el.id === id }));
      }

      // Shift + 클릭: 범위 활성화
      const lastActiveIndex = prev.findIndex((el) => el.active);
      const currentIndex = prev.findIndex((el) => el.id === id);

      // 범위 계산
      const [start, end] = [lastActiveIndex, currentIndex].sort((a, b) => a - b);

      return prev.map((el, idx) => ({
        ...el,
        active: idx >= start && idx <= end ? true : el.active,
      }));
    });
  }, []);

  const sortAllElementSort = () => {
    setElementSortVertical((prev) => !prev);
  }

  const lastIdRef = useRef<number>(1);

  const addElement = useCallback((newElement: React.ReactNode, attribute: ElementProps['attribute']) => {
    const newId = lastIdRef.current + 1;
    lastIdRef.current = newId;

    setElementArray((prev) => [
      ...prev,
      { id: newId, index: prev.length, element: newElement, attribute, active: false },
    ]);
  }, []);

  // const selectElement = useCallback(())

  return (
    <ElementStateContext.Provider value={{ elementArray, addElement, elementSortVertical, sortAllElementSort, toggleActive }}>
      {children}
    </ElementStateContext.Provider>
  );
};