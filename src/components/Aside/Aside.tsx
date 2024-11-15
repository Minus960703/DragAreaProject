import { ElementStateContext } from 'context';
import { useCallback, useContext } from 'react';

type Props = {}

function Aside({ }: Props) {
  const { elementArray, addElement } = useContext(ElementStateContext);

  const handleAddDiv  = useCallback(() => addElement(<div>div</div>), []);
  const handleAddSpan = useCallback(() => addElement(<span>span</span>), []);
  const handleAddP    = useCallback(() => addElement(<p>p</p>), []);

  return (
    <aside>
      <nav>
        <div className="aside__area">
          <h4>Align</h4>
          <ul>
            <li>
              <button>All Vertically</button>
            </li>
            <li>
              <button>All Horizontally</button>
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
            <li>
              <button>{element.element}</button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export { Aside };