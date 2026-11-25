import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Difficulty, type Quest } from '../types/quest';

interface CreateQuestPageProps {
  onCreateQuest: (quest: Quest) => void;
}

export function CreateQuestPage({ onCreateQuest }: CreateQuestPageProps) {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Пригоди');
  const [difficulty, setDifficulty] = useState<Difficulty>('Середній');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [description, setDescription] = useState('');
  const [riddlePrompt, setRiddlePrompt] = useState('');
  const [solutionCode, setSolutionCode] = useState('');
  const [hint, setHint] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !riddlePrompt.trim() || !solutionCode.trim()) {
      setError('Заповни назву, опис, загадку та код рішення.');
      return;
    }

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-zа-яіїєґ0-9]+/gi, '-')
      .replace(/^-|-$/g, '');

    const newQuest: Quest = {
      id: `${slug || 'quest'}-${Date.now()}`,
      title: title.trim(),
      genre: genre.trim() || 'Пригоди',
      difficulty,
      durationMinutes: Number(durationMinutes) || 30,
      description: description.trim(),
      riddlePrompt: riddlePrompt.trim(),
      solutionCode: solutionCode.trim(),
      hint: hint.trim() || 'Уважно прочитай умову загадки.',
      completed: false,
    };

    onCreateQuest(newQuest);
    navigate('/');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #334155',
    background: '#0f172a',
    color: '#f8fafc',
    boxSizing: 'border-box' as const,
  };

  return (
    <section
      style={{
        padding: 22,
        borderRadius: 12,
        border: '1px solid #334155',
        background: '#1e293b',
      }}
    >
      <h2 style={{ margin: '0 0 16px', fontSize: 22 }}>Створити власний квест</h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Назва квесту</label>
          <input
            type="text"
            placeholder="Наприклад: Шифр підводного човна"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Жанр</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Складність</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              style={inputStyle}
            >
              <option value="Легкий">Легкий</option>
              <option value="Середній">Середній</option>
              <option value="Складний">Складний</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Тривалість (хв)</label>
            <input
              type="number"
              min={5}
              max={180}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Сюжет / опис кімнати</label>
          <textarea
            rows={3}
            placeholder="Опиши ситуацію та мету гравця..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Завдання / загадка</label>
          <input
            type="text"
            placeholder="Наприклад: Яке число йде після 10 у послідовності 2, 4, 6, 8, 10?"
            value={riddlePrompt}
            onChange={(e) => setRiddlePrompt(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Правильний код / відповідь</label>
            <input
              type="text"
              placeholder="Наприклад: 12"
              value={solutionCode}
              onChange={(e) => setSolutionCode(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Підказка</label>
            <input
              type="text"
              placeholder="Наприклад: Додай 2"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {error && <div style={{ color: '#f87171', fontSize: 14 }}>{error}</div>}

        <button
          type="submit"
          style={{
            padding: '11px 18px',
            borderRadius: 8,
            border: 'none',
            background: '#16a34a',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            justifySelf: 'start',
          }}
        >
          Додати квест
        </button>
      </form>
    </section>
  );
}