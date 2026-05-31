import React from 'react';
import { C } from '../utils';

export default function CardVisual({ type, pair, sabiasCard, showReflete, onFlip }) {
  const gradients = {
    dilema:  'linear-gradient(135deg, #c05621, #e07b39)',
    reflete: 'linear-gradient(135deg, #7a5c2e, #c4914a)',
    sabias:  'linear-gradient(135deg, #b7700d, #e6920a)',
  };

  const grad = showReflete ? gradients.reflete
    : type === 'sabias' ? gradients.sabias : gradients.dilema;

  const label = showReflete ? '💭  REFLETE'
    : type === 'sabias' ? '📋  SABIAS QUE...' : '⚖️  DILEMA';

  const bodyStyle = {
    background: 'rgba(255,255,255,0.93)',
    borderRadius: 6,
    padding: 14,
    fontFamily: "'Courier Prime', monospace",
    fontSize: '0.82rem',
    color: C.ink,
    lineHeight: 1.65,
  };

  let body;
  if (type === 'sabias' && sabiasCard) {
    body = (
      <div style={bodyStyle}>
        <p style={{ whiteSpace: 'pre-line', marginBottom: sabiasCard.fonte ? 8 : 0 }}>
          {sabiasCard.texto}
        </p>
        {sabiasCard.fonte && (
          <p style={{ fontStyle: 'italic', fontSize: '0.72rem', color: C.inkLight }}>
            — {sabiasCard.fonte}
          </p>
        )}
      </div>
    );
  } else if (showReflete && pair) {
    body = (
      <div style={bodyStyle}>
        <p style={{ fontWeight: 'bold', color: C.purple, marginBottom: 8, fontSize: '0.8rem' }}>
          Reflete sobre o dilema:
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {pair.r.perguntas.map((q, i) => (
            <li key={i} style={{ fontSize: '0.78rem', lineHeight: 1.4 }}>
              <span style={{ color: C.purple, fontWeight: 'bold' }}>• </span>{q}
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (pair) {
    body = (
      <div style={bodyStyle}>
        <p style={{ whiteSpace: 'pre-line', marginBottom: 10 }}>{pair.d.texto}</p>
        <p style={{ fontWeight: 'bold', color: C.purple, fontSize: '0.85rem' }}>
          {pair.d.pergunta}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: grad,
      borderRadius: 10,
      padding: 14,
      border: `2px solid ${C.ink}`,
      boxShadow: `4px 4px 0 ${C.ink}`,
      animation: 'cardIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      <style>{`@keyframes cardIn{from{transform:scale(0.85);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      <div style={{
        fontFamily: "'Courier Prime', monospace",
        fontSize: '0.62rem',
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.82)',
        marginBottom: 9,
      }}>
        {label}
      </div>
      {body}
      {type !== 'sabias' && onFlip && (
        <button onClick={onFlip} style={{
          marginTop: 10, width: '100%',
          background: 'rgba(255,255,255,0.18)',
          border: '1px solid rgba(255,255,255,0.45)',
          borderRadius: 4, color: 'white',
          fontFamily: "'Courier Prime', monospace",
          fontSize: '0.72rem', letterSpacing: 1,
          cursor: 'pointer', padding: '6px 0',
          textTransform: 'uppercase',
        }}>
          {showReflete ? '← Ver dilema' : '🔄 Ver verso (Reflete)'}
        </button>
      )}
    </div>
  );
}
