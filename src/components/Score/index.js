import style from "./score.module.css"

const Score = ({ score }) => {
  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.header}>
          <img src="images/logo-bonus.svg" alt="" />
        </div>
      
        <div className={style.score}>
          <p>Score</p>
          <div className={style.scoreNumber}>
            {score}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Score