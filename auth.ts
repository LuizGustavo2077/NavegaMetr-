export type User = { email: string; password: string };

const KEY = 'navegametro_users';
const SESSION = 'navegametro_session';

function readUsers(): User[] {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export const Auth = {
  register: async (email: string, password: string) => {
    const users = readUsers();
    if (users.find(u => u.email === email)) throw new Error('Email já cadastrado');
    users.push({ email, password });
    localStorage.setItem(KEY, JSON.stringify(users));
    localStorage.setItem(SESSION, JSON.stringify({ email }));
    return { email };
  },
  login: async (email: string, password: string) => {
    const users = readUsers();
    const u = users.find(x => x.email === email && x.password === password);
    if (!u) throw new Error('Credenciais inválidas');
    localStorage.setItem(SESSION, JSON.stringify({ email }));
    return { email };
  },
  logout: async () => {
    localStorage.removeItem(SESSION);
  },
  current: () => {
    const raw = localStorage.getItem(SESSION);
    return raw ? JSON.parse(raw) : null;
  }
};
