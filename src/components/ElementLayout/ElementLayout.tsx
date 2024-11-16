import { ElementStateContext } from 'context';
import React, { useContext } from 'react'

type Props = {}

function ElementLayout({ }: Props) {
  const { elementArray, elementSortVertical, toggleActive } = useContext(ElementStateContext);

  const handleElementClick = (id: number, event: React.MouseEvent) => {
    toggleActive(id, event.shiftKey); // Shift 키 상태 확인
   };
  
  return (
    <div className="element__container">
      <button>Download as SVG</button>
      <div className={`element__area ${elementSortVertical ? 'element__vertical' : 'element__horizontal'}`}>
        {elementArray.map((element, index) => (
          <React.Fragment key={element.id}>
            <div
              key={element.id}
              className={`${element.active ? 'active' : ''}`}
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