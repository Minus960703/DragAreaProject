import { getRandomColor } from 'api/getRandomColor';
import { ElementStateContext } from 'context';
import { useCallback, useContext } from 'react';

function Aside() {
  const { elementArray, addElement, elementSortVertical , sortAllElementSort, toggleActive, groupElementSortVertical, sortGroupElementSort } = useContext(ElementStateContext);

  const handleAllSortVertical     = () => elementSortVertical ? false : sortAllElementSort();
  const handleAllSortHorizontal   = () => elementSortVertical ? sortAllElementSort() : false;
  const handleGroupSortVertical   = () => groupElementSortVertical ? false : sortGroupElementSort();
  const handleGroupSortHorizontal = () => groupElementSortVertical ? sortGroupElementSort() : false;

  const handleAddDiv = useCallback(() => {
    const color = getRandomColor();
    addElement(
      <div style={{ backgroundColor: color }}>div</div>,
      'div'
    );
  }, [addElement]);

  const handleAddSpan = useCallback(() => {
    const color = getRandomColor();
    addElement(
      <span style={{ backgroundColor: color }}>span</span>,
      'span'
    );
  }, [addElement]);

  const handleAddP = useCallback(() => {
    const color = getRandomColor();
    addElement(
      <p style={{ backgroundColor: color }}>p</p>,
      'p'
    );
  }, [addElement]);

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
              <button onClick={handleGroupSortVertical}>Group Vertically</button>
            </li>
            <li>
              <button onClick={handleGroupSortHorizontal}>Group Horizontally</button>
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
                onClick={(event) =>  toggleActive(element.id, event.shiftKey)}
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