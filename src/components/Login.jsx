import { useState } from 'react';
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { storage } from '../lib/storage';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await storage.login(username, password);
            if (res.success) {
                onLogin();
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError('登录失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-card animate-fade-in" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        利润追踪器
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>请登录管理您的产品数据</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label className="label">账号</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                className="input-field"
                                style={{ paddingLeft: '3rem' }}
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="请输入 admin"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label className="label">密码</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                className="input-field"
                                style={{ paddingLeft: '3rem' }}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="请输入 123456"
                            />
                        </div>
                    </div>

                    {error && (
                        <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>登录 <ArrowRight size={18} /></>}
                    </button>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        默认账号: admin &nbsp;|&nbsp; 密码: 123456
                    </div>
                </form>
            </div>
        </div>
    );
}
