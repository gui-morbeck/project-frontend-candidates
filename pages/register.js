import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Register.module.css'
import { setCookie } from 'cookies-next'

import RegisterCard from '../src/components/registerCard/registerCard.js';
import Input from '../src/components/input/input.js';
import Button from '../src/components/button/button';

export default function RegisterPage() {

    const [formData,setFormData] = useState({
        name: '',
        cpf: '',
        skills: []
    });

    const [successData, setSuccessData] = useState(null);
    const [error, setError] = useState('');

    const handleFormEdit = (event, name) => {

        let value = event.target.value;

        if (name === 'cpf') {
            value = parseInt(value.replace(/\D/g, ''), 10);
        }

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleForm = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/candidates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const json = await response.json();
            if (response.status !== 201) throw new Error(json);
            setSuccessData(json);
            setCookie('Candidato cadastrado', json);
        } catch(err) {
            setError(err.message);
        }
    };

    const [skills, setSkills] = useState([""]);

    const addSkillInput = () => {
        setSkills([...skills, ""]);
        setFormData({
            ...formData,
            skills: [...skills, ""]
        });
    };

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
        setFormData({
            ...formData,
            skills: updatedSkills
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Dados do formulário:", { skills });
    };

    return (
      <div className={styles.background}>
        <RegisterCard title="Cadastro">
            <form onSubmit={handleForm} className={styles.form}>
                <Input type="text" placeholder="Nome" required value={formData.name} onChange={(e) => {handleFormEdit(e, 'name')}}/>
                <Input type="text" placeholder="CPF" required value={formData.cpf} onChange={(e) => {handleFormEdit(e, 'cpf')}}/>
                {skills.map((skill, index) => (
                    <Input
                        key={index}
                        type="text"
                        placeholder="Skill"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        required
                    />
                ))
                }<div className={styles.centered}>
                    <Button type="button" onClick={addSkillInput}>
                        + Skill
                    </Button>
                </div>
                <hr className={styles.separator} />
                <Button>Cadastrar</Button>
                {error && <p className={styles.error}>Erro no cadastro</p>}
                {successData && (
                    <div className={styles.success}>
                        <p>Candidato cadastrado com sucesso!</p>
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
};
  