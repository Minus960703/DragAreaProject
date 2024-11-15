import { ElementStateContext } from 'context';
import React, { useContext } from 'react'

type Props = {}

function ElementLayout({ }: Props) {
  const { elementArray } = useContext(ElementStateContext);
  return (
    <div className="element__container">
      <button>Download as SVG</button>
      <div className="element__area">
        {elementArray.map((element, index) => (
          <>
            {element.element}
          </>
        ))}
      </div>
    </div>
  )
}

export { ElementLayout };