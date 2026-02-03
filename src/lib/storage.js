const STORAGE_KEY = 'profit_tracker_data';
const AUTH_KEY = 'profit_tracker_auth';

// Simulate a database delay for realism (optional, but feels nicer)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const storage = {
  getToken: () => {
    return localStorage.getItem(AUTH_KEY);
  },

  login: async (username, password) => {
    await delay(500); // Fake network request
    // distinct simple hardcoded check
    if (username === 'admin' && password === '123456') {
      const token = 'fake-jwt-token-' + Date.now();
      localStorage.setItem(AUTH_KEY, token);
      return { success: true, token };
    }
    return { success: false, message: '用户名或密码错误' };
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    window.location.reload(); 
  },

  getProducts: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveProduct: (product) => {
    const products = storage.getProducts();
    const newProduct = { ...product, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const updated = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteProduct: (id) => {
    const products = storage.getProducts();
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};
