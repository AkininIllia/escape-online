import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { CreateQuestPage } from './pages/CreateQuestPage';
import { QuestDetailPage } from './pages/QuestDetailPage';
import { type Quest } from './types/quest';
import { loadQuests, resetQuestsStorage, saveQuests } from './utils/storage';

export default function App() {
  const [quests, setQuests] = useState<Quest[]>(() => loadQuests());

  useEffect(() => {
    saveQuests(quests);
  }, [quests]);

  const handleCompleteQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((item) => (item.id === questId ? { ...item, completed: true } : item))
    );
  };

  const handleCreateQuest = (newQuest: Quest) => {
    setQuests((prev) => [newQuest, ...prev]);
  };

  const handleResetAll = () => {
    setQuests(resetQuestsStorage());
  };

  const navStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: '8px 14px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 14,
    background: isActive ? '#0284c7' : '#1e293b',
    color: isActive ? '#ffffff' : '#cbd5e1',
    border: '1px solid #334155',
  });

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#0b1120', color: '#f8fafc', padding: '28px 18px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 14,
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: '1px solid #1e293b',
            }}
          >
            <div>
              <h1 style={{ margin: 0, fontSize: 26, letterSpacing: 1 }}>
                ESCAPE ONLINE
                <span
                  style={{
                    marginLeft: 10,
                    fontSize: 12,
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: '#0f172a',
                    border: '1px solid #38bdf8',
                    color: '#38bdf8',
                    verticalAlign: 'middle',
                  }}
                >
                  v2.0
                </span>
              </h1>
              <span style={{ fontSize: 13, color: '#94a3b8' }}>Платформа інтерактивних квестів</span>
            </div>

            <nav style={{ display: 'flex', gap: 10 }}>
              <NavLink to="/" end style={navStyle}>
                Каталог
              </NavLink>
              <NavLink to="/create" style={navStyle}>
                Створити квест
              </NavLink>
            </nav>
          </header>

          <Routes>
            <Route
              path="/"
              element={<CatalogPage quests={quests} onResetAll={handleResetAll} />}
            />
            <Route
              path="/quest/:id"
              element={<QuestDetailPage quests={quests} onCompleteQuest={handleCompleteQuest} />}
            />
            <Route
              path="/create"
              element={<CreateQuestPage onCreateQuest={handleCreateQuest} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}