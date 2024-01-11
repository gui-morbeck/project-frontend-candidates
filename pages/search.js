import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Register.module.css'
import { setCookie } from 'cookies-next'

import RegisterCard from '../src/components/registerCard/registerCard.js';
import Input from '../src/components/input/input.js';
import Button from '../src/components/button/button';

export default function SearchPage() {

    const [formData,setFormData] = useState({
        skills: ''
    });

    const [successData, setSuccessData] = useState(null);
    const [error, setError] = useState('');

    const handleFormEdit = (event, name) => {

        let value = event.target.value;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleForm = async (event) => {
        event.preventDefault();
        
        try {
            let skillsFormated = formData.skills.toLowerCase();
            skillsFormated = skillsFormated.trim();
            const queryParams = "skills=" + skillsFormated;
            const url = `http://localhost:3001/candidates/search?${queryParams}`;
            console.log(url);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (response.status !== 200) throw new Error(json);
            setSuccessData(json);

            setCookie('Candidato encontrado', json);
        } catch(err) {
            console.log("Error: " + err.message);
            setError(err.message);
        }
    };

    return (
      <div className={styles.background}>
        <RegisterCard title="Busca">
            <form onSubmit={handleForm} className={styles.form}>
                <Input type="text" placeholder="Skills" required value={formData.skills} onChange={(e) => {handleFormEdit(e, 'skills')}}/>
                <hr className={styles.separator} />
                <Button>Buscar</Button>
                {error && <p className={styles.error}>Erro na busca</p>}
                {successData && (
                    <div className={styles.success}>
                        <p>Candidato encontrado com sucesso!</p>
                        <pre>{JSON.stringify(successData, null, 2)}</pre>
                    </div>
                )}
                <div className={styles.centered}>
                    <Link href="/">
                        <Button>Voltar</Button>
                    </Link>
                </div>
            </form>
        </RegisterCard>   
      </div>
    );
}
