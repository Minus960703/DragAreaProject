import { ElementStateContext } from 'context';
import { toSvg } from 'html-to-image';
import React, { useContext, useEffect, useRef } from 'react'

function ElementLayout() {
  const { elementArray, elementSortVertical, toggleActive, groupElements, ungroupElements, groupElementSortVertical, handleDragStart, handleDrop } = useContext(ElementStateContext);

  const handleElementClick = (id: number, event: React.MouseEvent) => {
    toggleActive(id, event.shiftKey);
  };

  const elementAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'g') {
        groupElements();
        event.preventDefault();
      } else if (event.ctrlKey && event.shiftKey && event.key === 'G') {
        ungroupElements();
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [groupElements, ungroupElements]);

  const handleCapture = async () => {
    if (elementAreaRef.current) {
      try {
        const svgDataUrl = await toSvg(elementAreaRef.current);
        const link = document.createElement('a');
        link.href = svgDataUrl;
        link.download = `${Date.now()}_capture.svg`;
        link.click();
      } catch (error) {
        console.error('SVG 캡처 오류:', error);
      }
    }
  };
  
  return (
    <div className="element__container">
      <button onClick={handleCapture}>Download as SVG</button>
      <div
        className={`element__area ${elementSortVertical ? 'element__vertical' : 'element__horizontal'}`}
        ref={elementAreaRef}
      >
        {elementArray.map((element, index) => (
          <React.Fragment key={element.id}>
            <div
              key={element.id}
              className={`
                ${element.active ? 'active' : ''}
                ${element.groupId ? 'grouped' : ''}
                ${element.groupId && groupElementSortVertical ? 'grouped__vertical': 'grouped__horizontal'}
              `}
              draggable
              onDragStart = {() => handleDragStart(index)}
              onDragOver  = {(e) => e.preventDefault()}
              onDrop      = {() => handleDrop(index)}
              onClick     = {(event) => handleElementClick(element.id, event)}
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