import { type Quest } from '../types/quest';

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'deep-orbit-09',
    title: 'Сигнал із глибинного космосу',
    genre: 'Космос',
    difficulty: 'Середній',
    durationMinutes: 35,
    description:
      'Станція зв’язку на орбіті втратила контакт із Землею. Віднови живлення шлюзу до розгерметизації відсіку.',
    riddlePrompt: 'Уведіть код доступу до реактора (сума цифр 19, 84 та 7):',
    solutionCode: '110',
    hint: '19 + 84 + 7 = 110',
    completed: false,
  },
  {
    id: 'old-pendulum',
    title: 'Таємниця старого маятника',
    genre: 'Детектив',
    difficulty: 'Легкий',
    durationMinutes: 25,
    description:
      'У старій майстерні зупинився головний маятник. Знайди шифр, який запускає хід часу.',
    riddlePrompt: 'Скільки хвилин у двох повних годинах? (введи число):',
    solutionCode: '120',
    hint: '2 × 60',
    completed: false,
  },
  {
    id: 'ghost-server',
    title: 'Привид у серверній',
    genre: 'Кіберпанк',
    difficulty: 'Складний',
    durationMinutes: 45,
    description:
      'Система безпеки корпорації заблокувала вихід із серверної. Зламай ключ доступу за підказкою журналу.',
    riddlePrompt: 'Яке слово зашифроване задом наперед: «ток»?',
    solutionCode: 'кот',
    hint: 'Прочитай «ток» справа наліво',
    completed: false,
  },
];