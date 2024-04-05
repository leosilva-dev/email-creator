import { useState } from "react";
import "./App.css";

type Element = HTMLElement | HTMLElement[];

export const App = () => {
  const [elements, setElements] = useState<Element[]>([]);

  const addElement = (newElement: Element) => {
    setElements([...elements, newElement]);
  };

  const createElement = (tag: string, value: string): HTMLElement => {
    const element = document.createElement(tag);
    element.innerHTML = value;

    return element;
  };

  const renderElementsSourceCode = (elements: Element[]) => {
    return elements.map((element, index) => {
      if (Array.isArray(element)) {
        return <div key={index}>{renderElementsSourceCode(element)}</div>;
      } else {
        return <div key={index}>{element.outerHTML}</div>;
      }
    });
  };

  const renderElements = (elements: Element[]) => {
    return elements.map((element, index) => {
      if (Array.isArray(element)) {
        return <div key={index}>{renderElements(element)}</div>;
      } else {
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: element.outerHTML }}
          />
        );
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="elements-panel">
          <button onClick={() => addElement(createElement("h1", "title"))}>
            h1
          </button>
          <button onClick={() => addElement(createElement("p", "paragraph"))}>
            p
          </button>
          <button
            onClick={() =>
              addElement([
                createElement("h3", "title3"),
                createElement("h3", "title3"),
              ])
            }
          >
            h3+h3
          </button>
        </div>
        <div className="email-content">
          <div>{renderElements(elements)}</div>
        </div>

        <div className="element-settings">
          <div>{renderElementsSourceCode(elements)}</div>
        </div>
      </div>
    </>
  );
};
