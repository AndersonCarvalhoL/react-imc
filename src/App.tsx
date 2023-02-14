import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import gitHub from './assets/github.png';
import linkedin from './assets/linkedin-logo.png';
import { GridItem } from './assets/components/Griditem';

import { levels, calculateImc, level } from './helpers/imc';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField) { 
      setToShow(calculateImc(heightField, weightField));
    }else {
      alert("Digite todos os campos.")
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
          <a href="https://github.com/AndersonCarvalhoL" target="_blank"><img src={gitHub} alt="" width={60}/></a>
          <a href="https://www.linkedin.com/in/AndersonCarvalhoL/" target="_blank"><img src={linkedin} alt="" width={35}/></a>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>O IMC é a sigla paraÍndice de Massa Corpóral, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input type="number" placeholder="Digite sua altura. Ex 1.5 (em métros)" value={heightField > 0 ? heightField : ''} onChange={e => setHeightField(parseFloat(e.target.value))} disabled={toShow ? true : false}/>

          <input type="number" placeholder="Digite sua peso. Ex 75.3 (em kg)" value={weightField > 0 ? weightField : ''} onChange={e => setWeightField(parseFloat(e.target.value))} disabled={toShow ? true : false}/>

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow && 
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width='25'/>
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App
