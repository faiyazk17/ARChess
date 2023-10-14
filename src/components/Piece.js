import React, {useState, useEffect} from "react"
import pieceImages from "./pieceImages"

function Piece(props) {
    const [coordinates, setCoordinates] = useState([0, 0]);
    const [offset, setOffset] = useState([0, 0]);
    const [selected, setSelected] = useState(false);
    const [lastMove, setLastMove] = useState();
    const [img, setImg] = useState()
    const [renderMe, setRenderMe] = useState(true)
    const [thisPieceType, setPieceType] = useState()

    // Set the initial x, y variables
    useEffect(() => {
        setImg(pieceImages[props.pieceType][props.pieceColor])
        setLastMove([indexCoordinates(props.startX, 0), indexCoordinates(props.startY, 1)])
        setCoordinates([props.startX, props.startY])
        setPieceType(props.pieceType)
    }, [])

    function indexCoordinates(coord, coordNum) {
        return Math.floor((coord - props.boardCoords[coordNum]) / props.tileSize);
    }

    // Pick up the piece, start following the mouse
    function clickDown({ target }) {
        // Don't grab piece if it isn't your turn
        if (props.turn !== props.pieceColor) {
            return
        }

        props.savePossibleMoves(lastMove[0], lastMove[1], thisPieceType, props.pieceColor)

        const elem = target.getBoundingClientRect();
        if (!selected) {
            setOffset([elem.right - props.mouseX, elem.top - props.mouseY])
        }

        setLastMove([indexCoordinates(props.mouseX, 0), indexCoordinates(props.mouseY, 1)])

        setSelected(true)
    }

    // Drop the piece, or put in back in its valid spot
    function clickRelease() {
        setSelected(false)
        props.clearPossibleMoves()

        let col = indexCoordinates(props.mouseX, 0)
        let row = indexCoordinates(props.mouseY, 1)

        if (props.validMove(lastMove[0], lastMove[1], col, row, props.pieceColor, thisPieceType)) {
            // If this disables the castle 
            /*--------------------------------------------------------*/
            let thisPiece = `${props.pieceColor + thisPieceType}`
            if (thisPiece === 'br') {
                props.setCastleStatus((prevStatus) => {
                    let newStatus = [...prevStatus]
                    console.log("Black Rook moved, no more castling here...")
                    if (col === 0 && row === 0) {
                        newStatus[0][0] = false
                    } else if (col === 7 && row === 0) {
                        newStatus[0][2] = false
                    } 
                    return newStatus
                })
            } else if (thisPiece === 'wr') {
                    props.setCastleStatus((prevStatus) => {
                        let newStatus = [...prevStatus]
                        console.log("White Rook moved, no more castling here...")
                        if (col === 0 && row === 7) {
                            newStatus[1][0] = false
                        } else if (col === 7 && row === 7) {
                            newStatus[1][2] = false
                        }
                        return newStatus 
                })
            } else if (thisPiece === 'bk' && !(col === 2 && row === 0) && !(col === 6 && row === 0)) {
                props.setCastleStatus((prevStatus) => {
                    let newStatus = [...prevStatus]
                    console.log("Black King moved, no more castling here...")
                    newStatus[0][1] = false
                    return newStatus
                })
            } else if (thisPiece === 'wk' && !(col === 2 && row === 7) && !(col === 6 && row === 7)) {
                props.setCastleStatus((prevStatus) => {
                    let newStatus = [...prevStatus]
                    console.log("White King moved, no more castling here...")
                    newStatus[1][1] = false
                    return newStatus 
                })
            }
            /*----------------------------------------------------------------*/

            // Put in new position
            setCoordinates([(col * props.tileSize) + props.boardCoords[0], (row * props.tileSize) + props.boardCoords[1]])
            props.changeTurn()
            setLastMove([col, row])

            if (props.pieceColor === 'w' && row === 0) {
                setPieceType('q')
                setImg(pieceImages['q'][props.pieceColor])
            } else if (props.pieceColor === 'b' && row === 7) {
                setPieceType('q')
                setImg(pieceImages['q'][props.pieceColor])
            } 
            
        } else {
            // Put in previous spot
            setCoordinates([props.boardCoords[0] + (lastMove[0] * props.tileSize), props.boardCoords[1] + (lastMove[1] * props.tileSize)])
        }
    }

    // Listen for a castleStatus update, and move me one time
    useEffect(() => {
        // Make sure the rook exists!
        // Make sure they back row is open
        if (thisPieceType === 'r' && lastMove) {
            if (lastMove[0] === 0 && lastMove[1] === 0 && props.castleStatus[0][0] === true) {
                if (props.castleStatus[0][0] !== false && props.castleStatus[0][1] !== false && props.castleStatus[0][2] !== false) {
                    //console.log("Castle the top left rook")
                    setCoordinates([(3 * props.tileSize) + props.boardCoords[0], (0 * props.tileSize) + props.boardCoords[1]])
                    setLastMove([3, 0])
                    return
                }
            } else if (lastMove[0] === 7 && lastMove[1] === 0 && props.castleStatus[0][2] === true) {
                if (props.castleStatus[0][0] !== false && props.castleStatus[0][1] !== false && props.castleStatus[0][2] !== false) {
                    //console.log("Castle the top right rook")
                    setCoordinates([(5 * props.tileSize) + props.boardCoords[0], (0 * props.tileSize) + props.boardCoords[1]])
                    setLastMove([5, 0])
                    return
                }
            } else if (lastMove[0] === 0 && lastMove[1] === 7 && props.castleStatus[1][0] === true) {
                if (props.castleStatus[1][0] !== false && props.castleStatus[1][1] !== false && props.castleStatus[1][2] !== false) {
                    //console.log("Castle the bot left rook"
                    setCoordinates([(3 * props.tileSize) + props.boardCoords[0], (7 * props.tileSize) + props.boardCoords[1]])
                    setLastMove([3, 7])
                    return
                }
            } else if (lastMove[0] === 7 && lastMove[1] === 7 && props.castleStatus[1][2] === true) {
                if (props.castleStatus[1][0] !== false && props.castleStatus[1][1] !== false && props.castleStatus[1][2] !== false) {
                    // console.log("Castle the bot right rook")
                    setCoordinates([(5 * props.tileSize) + props.boardCoords[0], (7 * props.tileSize) + props.boardCoords[1]])
                    setLastMove([5, 7])
                    return
                }
            }
        }
    }, [props.castleStatus])

    // Follow the mouse around
    function updatePosition() {
        if (selected) {
            setCoordinates((prevCoords) => {
                return [props.mouseX - offset[0], props.mouseY + offset[1]]
            })
        }
    }

    // Parent object tracks mouse movement, updating props  
    useEffect(() => {
        updatePosition()
    }, [props.mouseX, props.mouseY])

    // Check to see if this spot was overwritten (piece taken)
    useEffect(() => {
        if (lastMove) {
            if (lastMove[1] >= 0 && lastMove[1] <= 7 && lastMove[0] >= 0 && lastMove[0] <= 7) {
                let nextSpot = props.gameStateArray[lastMove[1]][lastMove[0]];

                if (nextSpot !== `${props.pieceColor}${thisPieceType}` && nextSpot !== ' ') {
                    setRenderMe(false)
                    return
                }
            }
        }
    }, [props.gameStateArray])

    const styles = {
        top: coordinates[1], 
        left: coordinates[0], 
        transform: selected && "scale(1.3)",
        zIndex: selected ? "10" : "9"
    }

    return (
        <>
        {renderMe && 
            <div
                onMouseDown={clickDown}
                onMouseUp={clickRelease}
                style={styles}
                className="piece">
                <img style={{width: props.tileSize}} src={img} alt="Chess Piece"></img>
            </div>}
        </>
    )
}

export default Piece