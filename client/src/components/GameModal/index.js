import React, { useState, useEffect } from "react";
import ModalGameCard from "../Cards/ModalGameCard";
// import { QUERY_GAMES } from "../../utils/queries";
import gameSearch from "../../utils/gameSearch";
import { useMutation } from "@apollo/client";
import { ADD_GAME } from "../../utils/mutations";
import { Modal } from "react-bootstrap";
import "./modal.css";

const GameModal = ({ showModal, searchTerm, closeModal }) => {
  console.log("Search Term: ", searchTerm);
  const [gameData, setGameData] = useState([]);
  const [addGame] = useMutation(ADD_GAME);

  const handleAddBook = async (gameToAdd) => {
    try {
      const { data } = await addGame({
        variables: { ...gameToAdd },
      });
      console.log("Added Game Data: ", data);
      closeModal()
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    gameSearch(searchTerm, setGameData);
    console.log("API Data: ", gameData);
  }, []);

  console.log("State Game Data: ", gameData);

  return (
    <Modal size="xl" className="flex" style={{ top: '-2%', overflow: 'hidden' }}show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Game Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-color">
              <div className="container">
                <div className="row">
        {gameData.length === 0 ? (
          <div>Loading...</div>
        ) : (
          gameData.map((game) => {
            return (

                    <div className="col modalgamecard" key={game.title}>
                      <div >
                      <ModalGameCard game={game} />
                      <button
                        type="button"
                        className="btn center mb-3 btn-green"
                        onClick={() => handleAddBook(game)}
                      >
                        Add Game
                      </button>
                      </div>
                    </div>

      );
    })
    )}
    </div>
  </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <button className="btn-green" onClick={closeModal}>
          Close
        </button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default GameModal;
