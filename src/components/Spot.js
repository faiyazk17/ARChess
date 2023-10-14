import React, { useState, useEffect } from "react"

function Spot(props) {
    const [showHighlight, setShowHighlight] = useState(false)
    const [highlightStyles, setHighlightStyles] = useState()

    // Highlight the entire square if this is the piece origin
    let highlight = null
    if (props.possibleMoves.length > 0) {
        let current = props.possibleMoves[0];
        if (current[0] === props.col && current[1] === props.row) {
            highlight = "orange";
        }
    }
    
    // Highlight this spot if it is a possible move
    useEffect(() => {
        if (props.possibleMoves.length === 0) {
            setShowHighlight(false);
        } else {
            for (let i = 0, l = props.possibleMoves.length; i < l; i++) {
                if (props.possibleMoves[i][0] === props.col && props.possibleMoves[i][1] === props.row) {

                    let current = props.possibleMoves[0]
                    if (i > 0 && !props.causesJump(current[0], current[1], props.col, props.row)) {
                        // Something can be eaten here
                        if (props.gameStateArray[props.row][props.col] !== ' ') {
                            setShowHighlight('eatable')
                        } else { setShowHighlight(true) }
                    }
                    break
                }
            }
        }
    }, [props.possibleMoves])

    // Update the styles once per show/hide update
    useEffect(() => {
        if (showHighlight) {
            if (showHighlight === 'eatable') {
                setHighlightStyles({
                    border: "10px solid rgb(0, 0, 0, 0.31)",
                    width: props.tileSize*0.625,
                    height: props.tileSize*0.625,
                    margin: props.tileSize*0.0625,
                })
            } else {
                setHighlightStyles({
                    backgroundColor: "#0000004f", 
                    width: props.tileSize*.4, 
                    height: props.tileSize*.4,
                    margin: props.tileSize*.3
                }  )
            }
        }
    }, [showHighlight]);

    let styles = {
        width: props.tileSize,
        height: props.tileSize,
        backgroundColor: highlight || props.spotColor,
        userSelect: "none",
        zIndex: 1,
        position: "fixed",
        top: props.startY,
        left: props.startX,
    }

    return (
        <div style={styles}>
            <div style={{
                borderRadius: "50%",
                display: showHighlight ? "block" : "none",
                ...highlightStyles
            }}>
            </div>
        </div>
    )
}

export default Spot