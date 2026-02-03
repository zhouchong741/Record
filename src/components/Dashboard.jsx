import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import { Plus, Trash2, LogOut, TrendingUp, Package } from 'lucide-react';

export default function Dashboard({ onLogout }) {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', buyPrice: '', sellPrice: '' });

    useEffect(() => {
        setProducts(storage.getProducts());
    }, []);

    const profit = (Number(form.sellPrice) || 0) - (Number(form.buyPrice) || 0);
    const margin = (Number(form.buyPrice) > 0) ? ((profit / Number(form.buyPrice)) * 100).toFixed(1) : 0;

    const handleSave = (e) => {
        e.preventDefault();
        if (!form.name || !form.buyPrice || !form.sellPrice) return;

        const newProduct = {
            name: form.name,
            buyPrice: Number(form.buyPrice),
            sellPrice: Number(form.sellPrice),
            profit: profit,
        };

        // Save to local storage
        const updated = storage.saveProduct(newProduct);
        setProducts(updated);

        // Clear form
        setForm({ name: '', buyPrice: '', sellPrice: '' });
    };

    const handleDelete = (id) => {
        if (confirm('确定删除此记录吗？')) {
            const updated = storage.deleteProduct(id);
            setProducts(updated);
        }
    };

    const totalProfit = products.reduce((acc, p) => acc + (p.sellPrice - p.buyPrice), 0);

    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Header */}
            <header className="glass-card" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, marginBottom: '2rem', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp color="var(--accent-color)" /> 利润追踪器
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>总利润:
                            <span style={{ color: totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 'bold', marginLeft: '0.5rem' }}>
                                ¥{totalProfit.toFixed(2)}
                            </span>
                        </span>
                        <button onClick={onLogout} className="btn btn-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                            <LogOut size={14} /> 退出
                        </button>
                    </div>
                </div>
            </header>

            <main className="container">
                {/* Input Form */}
                <section className="glass-card animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        录入数据
                    </h3>
                    <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
                        <div>
                            <label className="label">产品名称</label>
                            <div style={{ position: 'relative' }}>
                                <Package size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input
                                    className="input-field"
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="例如: iPhone 15"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="label">买入价格 (¥)</label>
                            <input
                                className="input-field"
                                type="number"
                                value={form.buyPrice}
                                onChange={e => setForm({ ...form, buyPrice: e.target.value })}
                                placeholder="0.00"
                                step="0.01"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">卖出价格 (¥)</label>
                            <input
                                className="input-field"
                                type="number"
                                value={form.sellPrice}
                                onChange={e => setForm({ ...form, sellPrice: e.target.value })}
                                placeholder="0.00"
                                step="0.01"
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label className="label">预估利润</label>
                            <div style={{
                                padding: '0.875rem 1rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                color: profit >= 0 ? 'var(--success-color)' : 'var(--danger-color)',
                                fontWeight: 'bold',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <span>¥ {profit.toFixed(2)}</span>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{margin}%</span>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ height: '46px', justifyContent: 'center' }}>
                            <Plus size={18} /> 保存
                        </button>
                    </form>
                </section>

                {/* List */}
                <section className="glass-card animate-fade-in" style={{ padding: '2rem', animationDelay: '0.1s' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>历史记录 ({products.length})</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>名称</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>买入</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>卖出</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>利润</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>利润率</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-secondary)', textAlign: 'right' }}>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => {
                                    const pProfit = p.sellPrice - p.buyPrice;
                                    const pMargin = p.buyPrice > 0 ? ((pProfit / p.buyPrice) * 100).toFixed(1) : 0;
                                    return (
                                        <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}>
                                            <td style={{ padding: '1rem', fontWeight: '500' }}>{p.name}</td>
                                            <td style={{ padding: '1rem' }}>¥{p.buyPrice.toFixed(2)}</td>
                                            <td style={{ padding: '1rem' }}>¥{p.sellPrice.toFixed(2)}</td>
                                            <td style={{ padding: '1rem', color: pProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 'bold' }}>
                                                ¥{pProfit.toFixed(2)}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    padding: '2px 8px',
                                                    borderRadius: '12px',
                                                    background: pProfit >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                    color: pProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)',
                                                    fontSize: '0.8rem'
                                                }}>
                                                    {pMargin}%
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    style={{ padding: '0.5rem', color: 'var(--text-secondary)', background: 'transparent', transition: 'color 0.2s' }}
                                                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--danger-color)'}
                                                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                            暂无数据，请在上方添加。
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}
