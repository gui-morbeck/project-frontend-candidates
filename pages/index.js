import Link from 'next/link';
import styles from '../styles/Register.module.css'

import Card from '../src/components/registerCard/registerCard.js';
import Button from '../src/components/button/button';

export default function Home() {
  return (
    <div className={styles.background}>
      <Card title="Home">
          <form className={`${styles.form} ${styles.centered}`}>
              <Link href="/register">
                <Button>Cadastrar candidato</Button>
              </Link>
              <Link href="/search">
                <Button>Buscar candidato</Button>
              </Link>
          </form>
      </Card>   
    </div>
  );
};