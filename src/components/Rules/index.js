import { useState } from "react";
import React from 'react'
import styles from "./Rules.module.css"

const Rules = () => {
  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => setShowRules(!showRules);

  return (
    <div>
      <button onClick={toggleRules} className="button" style={{
        position: "absolute",
        bottom: 0,
        right: 0,
      }}>Rules</button>
      {
      showRules && <div>
        <span onClick={toggleRules} className={styles.background} />

        <div className={styles.modal}>
            <div className={styles.top}>
              <h1 className={styles.heading}>Rules</h1>
              <img onClick={toggleRules} src="images/icon-close.svg" alt="close" className={styles.close} />
            </div>
            <img src="images/image-rules-bonus.svg" alt="" />
        </div>
        </div>
      }
    </div>
  )
}

export default Rules