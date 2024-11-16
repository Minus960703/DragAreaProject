import { ElementStateContext } from 'context';
import React, { useContext, useEffect } from 'react'

type Props = {}

function ElementLayout({ }: Props) {
  const { elementArray, elementSortVertical, toggleActive, groupElements, ungroupElements, groupElementSortVertical } = useContext(ElementStateContext);

  const handleElementClick = (id: number, event: React.MouseEvent) => {
    toggleActive(id, event.shiftKey); // Shift 키 상태 확인
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'g') {
        // Ctrl + G: 그룹화
        groupElements();
        event.preventDefault();
      } else if (event.ctrlKey && event.shiftKey && event.key === 'G') {
        // Ctrl + Shift + G: 그룹 해제
        ungroupElements();
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [groupElements, ungroupElements]);
  
  return (
    <div className="element__container">
      <button>Download as SVG</button>
      <div className={`element__area ${elementSortVertical ? 'element__vertical' : 'element__horizontal'}`}>
        {elementArray.map((element, index) => (
          <React.Fragment key={element.id}>
            <div
              key={element.id}
              className={`
                ${element.active ? 'active' : ''}
                ${element.groupId ? 'grouped' : ''}
                ${element.groupId && groupElementSortVertical ? 'grouped__vertical': 'grouped__horizontal'}
              `}
              onClick={(event) => handleElementClick(element.id, event)}
            >
              {element.element}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export { ElementLayout };