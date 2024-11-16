import React, { createContext, useState, ReactNode, FC, useCallback, useEffect, useRef, isValidElement } from 'react';

interface ElementProps {
  id                      : number;
  index                   : number;
  element                 : ReactNode;
  attribute               : 'div' | 'span' | 'p' | 'grouped element';
  active                  : boolean;
  groupId                ?: number;
}

interface ElementStateContextProps {
  elementArray            : ElementProps[];
  elementSortVertical     : boolean;
  groupElementSortVertical: boolean;
  addElement              : (element: React.ReactNode, attribute: ElementProps['attribute']) => void
  sortAllElementSort      : () => void;
  sortGroupElementSort    : () => void;
  toggleActive            : (id: ElementProps['id'], isShiftPressed: boolean) => void;
  groupElements           : () => void;
  ungroupElements         : () => void;
}

export const ElementStateContext = createContext<ElementStateContextProps>({
  elementArray            : [],  
  elementSortVertical     : false,
  groupElementSortVertical: false,
  addElement              : () => { },
  sortAllElementSort      : () => { },
  sortGroupElementSort    : () => { },
  toggleActive            : () => { },
  groupElements           : () => { },
  ungroupElements         : () => { },
});

export const ElementStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [elementArray             , setElementArray             ] = useState<ElementProps[]>([
    { id: 1, index: 0, element: <div style={{backgroundColor: '#fff'}}>div</div>, attribute: 'div', active: true }
  ]);
  const [elementSortVertical      , setElementSortVertical      ] = useState<ElementStateContextProps['elementSortVertical']>(false);
  const [groupElementSortVertical , setGroupElementSortVertical ] = useState<ElementStateContextProps['groupElementSortVertical']>(false);

  const toggleActive = useCallback((id: number, isShiftPressed: boolean) => {
    setElementArray((prev) => {
      if (!isShiftPressed) {
        return prev.map((el) => ({ ...el, active: el.id === id }));
      }

      const lastActiveIndex = prev.findIndex((el) => el.active);
      const currentIndex = prev.findIndex((el) => el.id === id);

      const [start, end] = [lastActiveIndex, currentIndex].sort((a, b) => a - b);

      return prev.map((el, idx) => ({
        ...el,
        active: idx >= start && idx <= end ? true : el.active,
      }));
    });
  }, []);

  const groupElements = useCallback(() => {
    const groupId = lastIdRef.current + 1;
    lastIdRef.current = groupId;

    setElementArray((prev) => {
      const activeElements = prev.filter((el) => el.active);

      if (activeElements.length < 2) {
        return prev;
      }
      const activeIndices = activeElements.map((el) => el.index);
      const remainingElements = prev.filter((el) => !el.active);
      const mergedContent = (
        <div>
          {activeElements.flatMap((el) => {
            if (isValidElement(el.element) && el.attribute === 'grouped element') {
              return React.Children.toArray(el.element.props.children); // ReactElement에서만 props 접근
            }
            return [el.element];
          })}
        </div>
      );

      // 그룹 생성
      const newGroup: ElementProps = {
        id: groupId,
        index: Math.min(...activeIndices),
        element: mergedContent,
        attribute: 'grouped element',
        active: false,
        groupId,
      };

      const resultArray = [...remainingElements, newGroup].sort(
        (a, b) => a.index - b.index
      );

      return resultArray;
    });
  }, []);

  const ungroupElements = useCallback(() => {
    setElementArray((prev) => {
      const updatedElements: ElementProps[] = [];

      prev.forEach((el) => {
        if (el.attribute === 'grouped element' && el.active) {
          if (isValidElement(el.element)) {
            React.Children.forEach(el.element.props.children, (child, index) => {
              if (isValidElement(child)) {
                updatedElements.push({
                  id: lastIdRef.current + 1 + index,
                  index: updatedElements.length,
                  element: child,
                  attribute: 'div',
                  active: false,
                });
              }
            });
            lastIdRef.current += React.Children.count(el.element.props.children);
          }
        } else {
          updatedElements.push(el);
        }
      });

      return updatedElements;
    });
  }, []);

  const sortAllElementSort    = () => setElementSortVertical((prev) => !prev);
  const sortGroupElementSort  = () => setGroupElementSortVertical((prev) => !prev);

  const lastIdRef = useRef<number>(1);

  const addElement = useCallback((newElement: React.ReactNode, attribute: ElementProps['attribute']) => {
    const newId = lastIdRef.current + 1;
    lastIdRef.current = newId;

    setElementArray((prev) => [
      ...prev,
      { id: newId, index: prev.length, element: newElement, attribute, active: false },
    ]);
  }, []);

  return (
    <ElementStateContext.Provider value={{ elementArray, addElement, elementSortVertical, sortAllElementSort, toggleActive, groupElements, ungroupElements, groupElementSortVertical, sortGroupElementSort }}>
      {children}
    </ElementStateContext.Provider>
  );
};