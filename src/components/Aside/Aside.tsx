import { getRandomColor } from 'api/getRandomColor';
import { ElementStateContext } from 'context';
import { useCallback, useContext } from 'react';

type Props = {}

function Aside({ }: Props) {
  const { elementArray, addElement, elementSortVertical , sortAllElementSort, toggleActive } = useContext(ElementStateContext);

  const handleAllSortVertical = () => {
    return elementSortVertical ? false : sortAllElementSort();
  };
  const handleAllSortHorizontal = () => {
    return elementSortVertical ? sortAllElementSort() : false;
  }

  const handleAddDiv = useCallback(() => {
    const color = getRandomColor();
    addElement(
      <div
        style={{ backgroundColor: color }}
      >
        div
      </div>,
      'div'
    );
  }, [addElement, getRandomColor]);

  const handleAddSpan = useCallback(() => {
    const color = getRandomColor();
    addElement(
      <span
        style={{ backgroundColor: color }}
      >
        span
      </span>,
      'span'
    );
  }, [addElement, getRandomColor]);

  const handleAddP = useCallback(() => {
    const color = getRandomColor();
    addElement(
      <p
        style={{ backgroundColor: color }}
      >
        p
      </p>,
      'p'
    );
  }, [addElement, getRandomColor]);

  return (
    <aside>
      <nav>
        <div className="aside__area">
          <h4>Align</h4>
          <ul>
            <li>
              <button onClick={handleAllSortVertical}>All Vertically</button>
            </li>
            <li>
              <button onClick={handleAllSortHorizontal}>All Horizontally</button>
            </li>
            <li>
              <button>Group Vertically</button>
            </li>
            <li>
              <button>Group Horizontally</button>
            </li>
          </ul>
        </div>
        <div className="aside__area">
          <h4>Add</h4>
          <ul>
            <li>
              <button onClick={handleAddDiv}>Div</button>
            </li>
            <li>
              <button onClick={handleAddSpan}>Span</button>
            </li>
            <li>
              <button onClick={handleAddP}>Paragraph</button>
            </li>
          </ul>
        </div>
        <ul className="aside__element">
          {elementArray.map((element, index) => (
            <li className={element.active ? 'active' : ''} key={element.id}>
              <button
                onClick={(event) => toggleActive(element.id, event.shiftKey)}
              >
                {element.attribute}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export { Aside };