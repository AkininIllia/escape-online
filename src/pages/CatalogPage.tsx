import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Difficulty, type Quest } from '../types/quest';

interface CatalogPageProps {
  quests: Quest[];
  onResetAll: () => void;
}

export function CatalogPage({ quests, onResetAll }: CatalogPageProps) {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<'Усі' | Difficulty>('Усі');
  const [onlyUncompleted, setOnlyUncompleted] = useState(false);

  const filteredQuests = useMemo(() => {
    const q = search.trim().toLowerCase();
    return quests.filter((item) => {
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.genre.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      const matchesDifficulty = difficulty === 'Усі' || item.difficulty === difficulty;
      const matchesStatus = !onlyUncompleted || !item.completed;
      return matchesQuery && matchesDifficulty && matchesStatus;
    });
  }, [quests, search, difficulty, onlyUncompleted]);

  const completedCount = quests.filter((item) => item.completed).length;

  return (
    <section>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 22 }}>Квест-кімнати</h2>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 14 }}>
            Пройдено: {completedCount} з {quests.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onResetAll}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #334155',
            background: '#1e293b',
            color: '#e2e8f0',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          Скинути прогрес
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <input
          type="text"
          placeholder="Пошук за назвою або жанром..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #334155',
            background: '#0f172a',
            color: '#f8fafc',
          }}
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as 'Усі' | Difficulty)}
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #334155',
            background: '#0f172a',
            color: '#f8fafc',
          }}
        >
          <option value="Усі">Усі складності</option>
          <option value="Легкий">Легкий</option>
          <option value="Середній">Середній</option>
          <option value="Складний">Складний</option>
        </select>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #334155',
            background: '#0f172a',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={onlyUncompleted}
            onChange={(e) => setOnlyUncompleted(e.target.checked)}
          />
          Лише непройдені
        </label>
      </div>

      {filteredQuests.length === 0 ? (
        <div
          style={{
            padding: 24,
            borderRadius: 10,
            border: '1px solid #334155',
            background: '#1e293b',
            color: '#94a3b8',
          }}
        >
          За заданими фільтрами квестів не знайдено.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {filteredQuests.map((quest) => (
            <div
              key={quest.id}
              style={{
                padding: 18,
                borderRadius: 10,
                border: '1px solid #334155',
                background: '#1e293b',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 14,
              }}
            >
              <div style={{ maxWidth: 600 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                  <strong style={{ fontSize: 17 }}>{quest.title}</strong>
                  <span style={{ fontSize: 12, color: '#38bdf8' }}>{quest.genre}</span>
                  <span style={{ fontSize: 12, color: '#cbd5e1' }}>• {quest.difficulty}</span>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>• {quest.durationMinutes} хв</span>
                  {quest.completed && (
                    <span
                      style={{
                        fontSize: 12,
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: '#14532d',
                        color: '#86efac',
                      }}
                    >
                      Пройдено
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: 14 }}>{quest.description}</p>
              </div>

              <Link
                to={`/quest/${quest.id}`}
                style={{
                  padding: '9px 14px',
                  borderRadius: 8,
                  background: '#0284c7',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Увійти в кімнату
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}