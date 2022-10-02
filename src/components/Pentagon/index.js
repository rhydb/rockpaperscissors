import { useState } from 'react'
import style from "./pentagon.module.css"
import { Hand, HandType } from "../Hand"

const offsets = [
    // left, top
    ["50%", 0],
    ["100%", "40%"],
    ["80%", "100%"],
    ["20%", "100%"],
    ["5%", "40%"]
]

const Pentagon = ({ incScore }) => {
  const [selected, setSelected] = useState("");
  const [hovering, setHovering] = useState("");
  const [winState, setWinState] = useState("");
  const [houseHand, setHouseHand] = useState("");

  const playAgain = () => {
    setSelected("");
    setHovering("");
    setWinState("");
    setHouseHand("");
  }

  const onMouseEnter = (hand) => {
    setHovering(hand);
  }

  const onMouseLeave = () => {
    setHovering("");
  }

  const onClick = (e, hand) => {
    if (selected !== "") return;

    // generate a house hand
    const choices = Object.keys(HandType)
    const choice = choices[(Math.floor(Math.random() * 1000)) % choices.length];
    setHouseHand(choice);
    setSelected(hand);

    const handHand = HandType[hand];
    const houseHand = HandType[choice];

    let winState = "";
    if (handHand.value === houseHand.value) {
      winState = "draw";
    } else if ((handHand.beats & houseHand.value) !== 0) {
      winState = "win";
    } else {
      winState = "lose"
    }

    setTimeout(() => {
      setWinState(winState);
      if (winState === "win") {
        incScore(1);
      } else if (winState === "lose") {
        incScore(-1);
      }
    }, 2000)
  }

  return (
    <div style={{
      width: "100%",
      maxWidth: "fit-content",
      display: "flex",
      justifyContent: "center"
    }}>
      <div className={style.pentagon}>
          <img style={{
            transition: "opactiy 0.2s ease",
            opacity: selected === "" ? 1.0 : 0,
          }} src="images/bg-pentagon.svg" alt="" />
          { selected === ""  && <p className={style.hovering}>{hovering}</p> }
          <div className={style.hands}>
              {
                  Object.keys(HandType).map((hand, index) => {
                      return (
                          <span
                          className={style.handContainer}
                          style={{
                              left: winState !== "" ? "-50%" : selected === hand ? 0 : offsets[index][0],
                              top: selected === hand ? "50%" : offsets[index][1],
                              opacity: selected === "" || selected === hand ? 1.0 : 0,
                              pointerEvents: selected === "" || selected === hand ? "initial" : "none"
                          }} key={hand}>
                              <p className={style.pickText} style={{
                                transition: "opactiy 0.2s ease",
                                pointerEvents: "none",
                                opacity: selected === hand ? 1.0 : 0
                              }}>You Picked</p>
                              <span
                                onClick={e => onClick(e, hand)}
                                onMouseEnter={() => onMouseEnter(hand)}
                                onMouseLeave={onMouseLeave}
                                style={{borderRadius: "50%"}}
                              >
                                <Hand type={hand} />
                              </span>
                          </span>
                      )
                  })   
              }
              {
                winState !== "" && (
                  <div className={style.winState}>
                    <h1>You {winState}</h1>
                    <button onClick={playAgain} className='button primary'>Play Again</button>
                  </div>
                )
              }
              {
                  selected !== "" && (
                    <span className={style.houseHand} style={{
                      left: winState !== "" && "150%",
                      transition: "left 0.2s ease"
                    }}>
                      <p className={style.pickText}>House Picked</p>
                      <span className={style.revealHandContainer}>
                        <span className={style.revealHand}>
                          <Hand type={houseHand} />
                        </span>
                      </span>
                    </span>
                  )
              }
          </div>
      </div>
    </div>
  )
}

export default Pentagon