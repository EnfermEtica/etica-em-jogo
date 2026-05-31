import React, { useState } from 'react';
import { C } from '../utils';
import { TEAM_COLORS, TEAM_NAMES } from '../data';

export default function SetupScreen({ onStart }) {
  const [numTeams, setNumTeams] = useState(3);
  const [names, setNames] = useState(TEAM_NAMES.slice(0, 3));

  const changeCount = (n) => {
    setNumTeams(n);
    setNames(prev => {
      const next = [...prev];
      while (next.length < n) next.push(TEAM_NAMES[next.length]);
      return next.slice(0, n);
    });
  };

  const updateName = (i, val) => {
    setNames(prev => { const n = [...prev]; n[i] = val; return n; });
  };

  const ss = {
    wrap: {
      minHeight: '100vh', background: C.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Special Elite', cursive", padding: 20,
    },
    box: {
      background: C.paper, border: `3px solid ${C.border}`,
      borderRadius: 8, padding: '40px 48px', maxWidth: 460, width: '100%',
      boxShadow: `8px 8px 0 ${C.goldLight}, 12px 12px 0 ${C.border}`,
      position: 'relative',
    },
    innerBorder: {
      position: 'absolute', inset: 10,
      border: `1px solid ${C.border}`, borderRadius: 4, pointerEvents: 'none',
    },
    logo: {
      background: C.purple, color: 'white',
      display: 'inline-block', padding: '16px 28px',
      borderRadius: 8, boxShadow: `4px 4px 0 ${C.ink}`, marginBottom: 12,
    },
    label: {
      fontFamily: "'Courier Prime', monospace",
      fontSize: '0.7rem', textTransform: 'uppercase',
      letterSpacing: 2, color: C.inkLight,
      display: 'block', marginBottom: 7,
    },
    startBtn: {
      width: '100%', background: C.purple, color: 'white',
      border: `2px solid ${C.ink}`, padding: '13px 0',
      fontFamily: "'Special Elite', cursive", fontSize: '1rem',
      letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
      borderRadius: 4, boxShadow: `4px 4px 0 ${C.ink}`, marginTop: 6,
    },
  };

  return (
    <div style={ss.wrap}>
      <div style={ss.box}>
        <div style={ss.innerBorder} />
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ color: C.gold, fontSize: '1.4rem', letterSpacing: 10, marginBottom: 7 }}>✦ ✦ ✦</div>
          <div style={ss.logo}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, letterSpacing: 3, lineHeight: 1.15 }}>
              Ética em<br />Jogo
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.85rem', color: C.goldLight, marginTop: 3 }}>
              Ética &amp; Deontologia de Enfermagem
            </div>
          </div>
          <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.8rem', color: C.inkLight, lineHeight: 1.6, marginTop: 10 }}>
            Um jogo de reflexão ética para equipas de enfermagem.<br />
            Sem respostas certas — apenas boas perguntas.
          </p>
        </div>

        <label style={ss.label}>Número de equipas</label>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
          {[2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => changeCount(n)} style={{
              width: 44, height: 44,
              border: `2px solid ${numTeams === n ? C.purple : C.border}`,
              background: numTeams === n ? C.purple : C.paper,
              color: numTeams === n ? 'white' : C.ink,
              borderRadius: 4, fontFamily: "'Special Elite', cursive",
              fontSize: '1.1rem', cursor: 'pointer',
              boxShadow: numTeams === n ? `2px 2px 0 ${C.ink}` : 'none',
              transition: 'all 0.15s',
            }}>{n}</button>
          ))}
        </div>

        <label style={ss.label}>Nome das equipas</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {names.map((n, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: TEAM_COLORS[i], flexShrink: 0 }} />
              <input
                value={n}
                onChange={e => updateName(i, e.target.value)}
                style={{
                  flex: 1, background: 'transparent',
                  border: 'none', borderBottom: `2px solid ${C.border}`,
                  fontFamily: "'Courier Prime', monospace", fontSize: '0.9rem',
                  color: C.ink, padding: '3px 5px', outline: 'none',
                }}
              />
            </div>
          ))}
        </div>

        <button onClick={() => onStart(names.slice(0, numTeams))} style={ss.startBtn}>
          ▶ Iniciar Jogo
        </button>
      </div>
    </div>
  );
}
