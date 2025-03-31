import React, { useCallback } from "react";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import LayersItem from "./LayersItem";

const LayersContainer = ({
  layers,
  setLayers,
  activeL,
  setActiveL,
  curCanvas,
  editingL,
  setEditingL
}) => {
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setLayers((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend} className="layers-container">
      <div>
        {layers.map((card, index) =>  (
            <LayersItem
              key={card.id}
              index={index}
              id={card.id}
              name={card.name}
              card={card}
              activeL={activeL}
              setActiveL={setActiveL}
              moveCard={moveCard}
              curCanvas={curCanvas}
              editingL={editingL}
              setEditingL={setEditingL}
            />
          )
        )}
      </div>
    </DndProvider>
  );
};

export default LayersContainer;
