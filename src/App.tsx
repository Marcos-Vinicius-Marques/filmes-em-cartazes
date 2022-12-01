import styles from './styles.module.css'
import { useState } from 'react'
import { Movie } from './types/Movies'

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  const loadMovies = async () => {
    try {  
      setLoading(true)
      let response = await fetch('https://api.b7web.com.br/cinema/')
      let json = await response.json()
      setLoading(false)
      setMovies(json)
    } catch(erro) {
        setLoading(false)
        alert("Erro! Tente mais tarde")
        console.log(erro)
    }
  }



  return (
    <div>
      <header className={styles.header}>
        <h1>Filmes em lançamento</h1>
      </header>
      <main className={styles.main}>
        <button onClick={loadMovies} className={styles.button}>Carregar Filmes</button>
        <div>
          {!loading &&
            <div className={styles.total}>Total de filmes {movies.length}</div> 
          }
          {loading &&
            <div className={styles.total}>Carregando...</div> 
          }
        </div>
        <div className={styles.container}>
          {movies.map((item, index) => (
            <div key={index} className={styles.areaMovie}>
              <div className={styles.avatarReponsive}>
                <img src={item.avatar} alt="Capa do filme" className={styles.avatar} />
              </div>
              <p className={styles.p}>{item.titulo}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )

}

export default App