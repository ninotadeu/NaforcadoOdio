import { useEffect, useState } from 'react'

const airdropsIniciais = [
  {
    nome: 'Grass',
    rede: 'Solana',
    status: 'Farmando',
    previsao: 'Sem data confirmada',
    link: 'https://app.getgrass.io'
  },
  {
    nome: 'Parcl',
    rede: 'Solana',
    status: 'Aguardando tarefas',
    previsao: 'Airdrop inicial já rolou (fase 2 em análise)',
    link: 'https://parcl.co'
  },
  {
    nome: 'Sonic',
    rede: 'Sui',
    status: 'Fazendo missões',
    previsao: 'Futuro token em preparação',
    link: 'https://sonic.game'
  },
  {
    nome: 'Maverick (Zealy)',
    rede: 'Sui',
    status: 'Missões sociais',
    previsao: 'Campanha XP ativa, sem data de token',
    link: 'https://zealy.io/c/maverickprotocol/questboard'
  },
  {
    nome: 'Typus Finance',
    rede: 'Sui',
    status: 'Jogo + farming',
    previsao: 'Airdrop provável, sem confirmação',
    link: 'https://typus.finance'
  },
  {
    nome: 'Kamino',
    rede: 'Solana',
    status: 'Farming gratuito',
    previsao: 'Rumores de airdrop em 2025',
    link: 'https://app.kamino.finance'
  }
]

export default function Painel() {
  const [tarefas, setTarefas] = useState(() => {
    const saved = localStorage.getItem('tarefasConcluidas')
    return saved ? JSON.parse(saved) : []
  })

  const [notas, setNotas] = useState(() => {
    const saved = localStorage.getItem('notas')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('tarefasConcluidas', JSON.stringify(tarefas))
  }, [tarefas])

  useEffect(() => {
    localStorage.setItem('notas', JSON.stringify(notas))
  }, [notas])

  const toggleTarefa = (nome) => {
    setTarefas((prev) =>
      prev.includes(nome) ? prev.filter(n => n !== nome) : [...prev, nome]
    )
  }

  const handleNotaChange = (nome, texto) => {
    setNotas(prev => ({ ...prev, [nome]: texto }))
  }

  return (
    <div style={{ padding: '1rem', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>Painel de Airdrops</h1>
      {airdropsIniciais.map((airdrop, idx) => (
        <div key={idx} style={{ background: '#fff', padding: '1rem', borderRadius: 10, marginBottom: '1rem', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{airdrop.nome}</h2>
            <span style={{ fontSize: 12, background: '#eee', padding: '2px 8px', borderRadius: 12 }}>{airdrop.rede}</span>
          </div>
          <p><strong>Status:</strong> {airdrop.status}</p>
          <p><strong>Previsão:</strong> {airdrop.previsao}</p>
          <label>
            <input type="checkbox" checked={tarefas.includes(airdrop.nome)} onChange={() => toggleTarefa(airdrop.nome)} />
            {' '}Tarefa concluída
          </label>
          <div style={{ marginTop: '0.5rem' }}>
            <textarea
              placeholder="Anotações pessoais..."
              style={{ width: '100%', minHeight: 60 }}
              value={notas[airdrop.nome] || ''}
              onChange={(e) => handleNotaChange(airdrop.nome, e.target.value)}
            />
          </div>
          <a href={airdrop.link} target="_blank" rel="noreferrer">
            <button style={{ marginTop: '0.5rem', width: '100%' }}>Acessar site</button>
          </a>
        </div>
      ))}
    </div>
  )
}