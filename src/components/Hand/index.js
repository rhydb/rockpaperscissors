import React from 'react'
import style from "./hand.module.css"

export const HandType = {
    Scissors: {
      value: 0b1,
    },
    Paper: {
      value: 0b1 << 1,
    },
    Rock: {
      value: 0b1 << 2,
    },
    Lizard: {
      value: 0b1 << 3,
    },
    Spock: {
      value: 0b1 << 4,
    }
};

HandType.Scissors.beats = HandType.Paper.value ^ HandType.Lizard.value
HandType.Paper.beats = HandType.Rock.value ^ HandType.Spock.value
HandType.Rock.beats = HandType.Lizard.value ^ HandType.Scissors.value
HandType.Lizard.beats = HandType.Spock.value ^ HandType.Paper.value
HandType.Spock.beats = HandType.Scissors.value ^ HandType.Rock.value

export const Hand = ({ type }) => {
  type = type.toLowerCase();

  return (
    <div className={`${style[type]} ${style.outer}`}>
      <div className={`${style.hand}`} style={{
        backgroundImage: `url(images/icon-${type}.svg)`
      }}>
          {/* <img src={`images/icon-${type}.svg`} alt="" /> */}
      </div>
    </div>
  )
}
