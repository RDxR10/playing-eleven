import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const adidasAcesPlayers = [
  {
    id: "1",
    name: "Lionel Messi",
  },
  {
    id: "2",
    name: "Ángel Di María",
  },
  {
    id: "3",
    name: "Bernardo Silva",
  },
  {
    id: "4",
    name: "Mohamed Salah",
  },
  {
    id: "5",
    name: "Karim Benzema",
  },
  {
    id: "6",
    name: "Toni Kroos",
  },
  {
    id: "7",
    name: "Paolo Dybala",
  },
  {
    id: "8",
    name: "Matthijs de Ligt",
  },
  {
    id: "9",
    name: "Achraf Hakimi",
  },
  {
    id: "10",
    name: "Paul Pogba",
  },
  {
    id: "11",
    name: "David de Gea",
  },
];

const nikeNovasPlayers = [
  {
    id: "12",
    name: "Cristiano Ronaldo",
  },
  {
    id: "13",
    name: "Neymar Jr",
  },
  {
    id: "14",
    name: "Luka Modric",
  },
  {
    id: "15",
    name: "Kevin De Bruyne",
  },
  {
    id: "16",
    name: "Kylian Mbappe",
  },
  {
    id: "17",
    name: "Thibaut Courtois",
  },
  {
    id: "18",
    name: "Rúben Dias",
  },
  {
    id: "19",
    name: "Virgil van Dijk",
  },
  {
    id: "20",
    name: "Riyad Mahrez",
  },
  {
    id: "21",
    name: "Bruno Fernandes",
  },
  {
    id: "22",
    name: "Robert Lewandowski",
  },
];

function App() {
  const [adidasAces, updateAdidasAces] = useState(adidasAcesPlayers);
  const [nikeNovas, updateNikeNovas] = useState(nikeNovasPlayers);
  const [centralList, updateCentralList] = useState([]);

  function handleOnDragEnd(result, sourceList, updateList) {
    if (!result.destination) return;

    const items = Array.from(sourceList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateList(items);

    if (result.destination.droppableId === "centralList") {
      handleAddToCentralList(reorderedItem);
    }
  }

  function handleAddToCentralList(player) {
    if (centralList.length < 11) {
      // Changed to < 11
      updateCentralList((prevCentralList) => {
        if (!prevCentralList.some((item) => item.id === player.id)) {
          return [...prevCentralList, player];
        }
        return prevCentralList;
      });
    }
  }

  return (
    <div className="App">
      <div className="list-container left">
        <h1>Adidas Aces</h1>
        <DragDropContext
          onDragEnd={(result) =>
            handleOnDragEnd(result, adidasAces, updateAdidasAces)
          }
        >
          <Droppable droppableId="adidasAces">
            {(provided) => (
              <ul
                className="players"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {adidasAces.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <p>{name}</p>
                          <button
                            onClick={() => handleAddToCentralList({ id, name })}
                          >
                            Add to Team
                          </button>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="list-container central">
        <center>
          <h1>Your Team</h1>
        </center>
        <DragDropContext
          onDragEnd={(result) =>
            handleOnDragEnd(result, centralList, updateCentralList)
          }
        >
          <Droppable droppableId="centralList">
            {(provided) => (
              <ul
                className="players central-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {centralList.map(({ id, name }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="central-player"
                      >
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="list-container right">
        <h1>Nike Novas</h1>
        <DragDropContext
          onDragEnd={(result) =>
            handleOnDragEnd(result, nikeNovas, updateNikeNovas)
          }
        >
          <Droppable droppableId="nikeNovas">
            {(provided) => (
              <ul
                className="players"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {nikeNovas.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <p>{name}</p>
                          <button
                            onClick={() => handleAddToCentralList({ id, name })}
                          >
                            Add to Team
                          </button>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
