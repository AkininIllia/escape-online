import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { type Quest } from '../types/quest';

interface QuestDetailPageProps {
  quests: Quest[];
  onCompleteQuest: (questId: string) => void;
}

export function QuestDetailPage({ quests, onCompleteQuest }: QuestDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const quest = quests.find((item) => item.id === id);

  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  if (!quest) {
    return (
      <div style={{ padding: 20, borderRadius: 10, border: '1px solid #334155', background: '#1e293b' }}>
        <p style={{ marginTop: 0 }}>Квест не знайдено.</p>
        <Link to="/" style={{ color: '#38bdf8' }}>
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = answerInput.trim().toLowerCase();
    if (!cleaned) {
      setFeedback('Введи відповідь перед перевіркою.');
      return;
    }

    if (cleaned === quest.solutionCode.trim().toLowerCase()) {
      onCompleteQuest(quest.id);
      setFeedback('Код прийнято! Квест успішно пройдено.');
    } else {
      setFeedback('Невірний код. Спробуй ще раз або відкрий підказку.');
    }
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
      <div style={{ marginBottom: 14 }}>
        <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: 14 }}>
          ← Назад до всіх квестів
        </Link>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
        <h2 style={{ margin: 0, fontSize: 24 }}>{quest.title}</h2>
        {quest.completed && (
          <span
            style={{
              fontSize: 12,
              padding: '3px 10px',
              borderRadius: 999,
              background: '#14532d',
              color: '#86efac',
            }}
          >
            Пройдено
          </span>
        )}
      </div>

      <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>
        Жанр: {quest.genre} • Складність: {quest.difficulty} • Час: {quest.durationMinutes} хв
      </div>

      <p style={{ lineHeight: 1.6, color: '#e2e8f0', marginTop: 0 }}>{quest.description}</p>

      <div
        style={{
          marginTop: 20,
          padding: 16,
          borderRadius: 10,
          background: '#0f172a',
          border: '1px solid #334155',
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 10 }}>{quest.riddlePrompt}</div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Введи код або відповідь..."
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            style={{
              flex: 1,
              minWidth: 200,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #334155',
              background: '#1e293b',
              color: '#f8fafc',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              background: '#0284c7',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Перевірити код
          </button>
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #334155',
              background: '#1e293b',
              color: '#cbd5e1',
              cursor: 'pointer',
            }}
          >
            {showHint ? 'Сховати підказку' : 'Підказка'}
          </button>
        </form>

        {showHint && (
          <div style={{ marginTop: 12, color: '#fbbf24', fontSize: 13 }}>
            Підказка: {quest.hint}
          </div>
        )}

        {feedback && (
          <div style={{ marginTop: 12, fontSize: 14, color: '#38bdf8' }}>
            {feedback}
          </div>
        )}
      </div>
    </section>
  );
}