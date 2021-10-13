import { useCallback, useMemo } from "react";
import { ClickHandler, Dict } from "../../types";
import Checkbox from "../Checkbox/Checkbox";
import {
  listElementStyle,
  listRendererStyle,
  selectedListElementStyle,
  listCheckDivStyle,
} from "./List.style";

type RendererType<T> = (el: T) => JSX.Element;
type HOCRendererType<T> = (el: T, index: number) => JSX.Element;

function getRendererListElement<T>(
  renderer: RendererType<T>,
  handleClick: ClickHandler<number>,
  selectedItems: Dict<boolean>
): HOCRendererType<T> {
  return (e, i) => {
    const isItemSelected = !!selectedItems[i];
    const clickCallback = useCallback(() => handleClick(i), [i]);
    const infoContent = useMemo(() => {
      return <div className={listRendererStyle}>{renderer(e)}</div>;
    }, [e]);
    const key = useMemo(() => "List_Component_Index_" + i, [i]);
    return useMemo(() => {
      return (
        <div
          key={key}
          className={
            isItemSelected ? selectedListElementStyle : listElementStyle
          }
          onClick={clickCallback}
        >
          {isItemSelected && (
            <div className={listCheckDivStyle}>
              <Checkbox />
            </div>
          )}
          {infoContent}
        </div>
      );
    }, [isItemSelected, clickCallback, infoContent, key]);
  };
}

type ListProps<T> = {
  list?: T[];
  renderer: RendererType<T>;
  handleClick: ClickHandler<number>;
  selectedIndexes: Dict<boolean>;
};

function List<T>({
  list = [],
  renderer,
  handleClick,
  selectedIndexes,
}: ListProps<T>) {
  return (
    <>
      {list.map((e, i) =>
        getRendererListElement(renderer, handleClick, selectedIndexes)(e, i)
      )}
    </>
  );
}

export default List;
