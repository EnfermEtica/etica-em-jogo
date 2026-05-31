import React from 'react';
import { BOARD, TELEPORTS } from '../data';

// Posições centrais de cada casa no SVG 700x500
const POS = [
  [42,  440],  // 0  INÍCIO
  [118, 440],  // 1  DILEMA (laranja)
  [194, 440],  // 2  DILEMA (laranja)
  [270, 440],  // 3  SABIAS QUE (carta)
  [346, 440],  // 4  DILEMA (verde)
  [422, 440],  // 5  ESTIVE A PENSAR (verde)
  [498, 440],  // 6  DILEMA (verde)
  [574, 440],  // 7  DILEMA (amarelo)
  [574, 300],  // 8  DILEMA (amarelo)
  [460, 300],  // 9  SABIAS QUE (carta laranja)
  [346, 300],  // 10 O QUE ACHAS? (azul)
  [232, 300],  // 11 NINGUÉM VIU! (azul)
  [194, 155],  // 12 DILEMA (laranja)
  [280, 155],  // 13 DILEMA (laranja)
  [390, 155],  // 14 SABIAS QUE (carta teal)
  [476, 155],  // 15 NÃO ME INTERESSA (verde)
  [562, 155],  // 16 DILEMA (verde)
  [648, 155],  // 17 FIM (azul)
];

// Cores dos círculos por posição (fiel ao original)
const CIRCLE_COLORS = [
  '#2b7fd4', // 0  INÍCIO azul
  '#e8752a', // 1  laranja
  '#e8752a', // 2  laranja
  null,      // 3  SABIAS carta
  '#3aaa60', // 4  verde
  '#3aaa60', // 5  verde (ESTIVE A PENSAR)
  '#3aaa60', // 6  verde
  '#f5c518', // 7  amarelo
  '#f5c518', // 8  amarelo
  null,      // 9  SABIAS carta
  '#2b7fd4', // 10 azul (O QUE ACHAS)
  '#2b7fd4', // 11 azul (NINGUÉM VIU)
  '#e8752a', // 12 laranja
  '#e8752a', // 13 laranja
  null,      // 14 SABIAS carta
  '#3aaa60', // 15 verde
  '#3aaa60', // 16 verde
  '#2b7fd4', // 17 FIM azul
];

// Cores das cartas SABIAS QUE (roxo, laranja, teal — alternando)
const SABIAS_COLORS = ['#7c3aed', '#e8752a', '#2ab5a0'];
let sabiasIdx = 0;
const SABIAS_MAP = {};
[3, 9, 14].forEach((pos, i) => { SABIAS_MAP[pos] = SABIAS_COLORS[i]; });

const R = 36; // raio dos círculos

export default function Board({ positions, teams }) {
  const W = 700, H = 520;

  // Linha de percurso suave
  const pathD = POS.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Fundo bege com textura */}
        <filter id="paper" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend"/>
          <feComposite in="blend" in2="SourceGraphic" operator="in"/>
        </filter>
        {/* Sombra suave para post-its */}
        <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#00000030"/>
        </filter>
        {/* Sombra para círculos */}
        <filter id="cirshadow" x="-15%" y="-15%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#00000040"/>
        </filter>
        {/* Brilho interno círculos */}
        <radialGradient id="glare" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>

      {/* ── FUNDO ── */}
      <rect width={W} height={H} fill="#d6cfc4"/>
      {/* Manchas de café */}
      {[[120,380,18],[400,200,12],[580,420,15],[200,100,10],[500,80,8],[650,350,14],[80,200,9]].map(([x,y,r],i)=>(
        <ellipse key={i} cx={x} cy={y} rx={r*1.4} ry={r} fill="#b8a898" opacity="0.35" transform={`rotate(${i*25},${x},${y})`}/>
      ))}

      {/* ── BRANDING (canto superior esquerdo) ── */}
      <text x={28} y={120} fill="#5a5048" fontSize={8} fontFamily="'Courier Prime',monospace" letterSpacing={3}>PERCURSO INTERATIVO</text>
      <text x={26} y={148} fill="#2c1810" fontSize={22} fontFamily="Georgia,serif" fontWeight="bold" fontStyle="italic">Ética em</text>
      <text x={26} y={173} fill="#2c1810" fontSize={22} fontFamily="Georgia,serif" fontWeight="bold" fontStyle="italic">Jogo</text>
      <line x1={26} x2={130} y1={180} y2={180} stroke="#2c1810" strokeWidth="1"/>
      <text x={26} y={198} fill="#5a5048" fontSize={11} fontFamily="Georgia,serif" fontStyle="italic">Jogo para refletir</text>

      {/* ── ESCADAS e ESCORREGADORES ── */}
      {/* 🪜 Casa 5 → 11 */}
      <line x1={POS[5][0]} y1={POS[5][1]-R} x2={POS[11][0]} y2={POS[11][1]+R}
        stroke="#b8a898" strokeWidth="5" strokeLinecap="round" opacity="0.9"/>
      <line x1={POS[5][0]+12} y1={POS[5][1]-R} x2={POS[11][0]+12} y2={POS[11][1]+R}
        stroke="#b8a898" strokeWidth="5" strokeLinecap="round" opacity="0.9"/>
      {[0.2,0.4,0.6,0.8].map((t,i)=>{
        const x1=POS[5][0]+(POS[11][0]-POS[5][0])*t;
        const y1=(POS[5][1]-R)+(POS[11][1]+R-(POS[5][1]-R))*t;
        return <line key={i} x1={x1} y1={y1} x2={x1+12} y2={y1} stroke="#b8a898" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>;
      })}

      {/* 🪜 Casa 10 → 14 */}
      <line x1={POS[10][0]} y1={POS[10][1]-R} x2={POS[14][0]-20} y2={POS[14][1]+R}
        stroke="#b8a898" strokeWidth="5" strokeLinecap="round" opacity="0.9"/>
      <line x1={POS[10][0]+12} y1={POS[10][1]-R} x2={POS[14][0]-8} y2={POS[14][1]+R}
        stroke="#b8a898" strokeWidth="5" strokeLinecap="round" opacity="0.9"/>
      {[0.25,0.5,0.75].map((t,i)=>{
        const x1=POS[10][0]+(POS[14][0]-20-POS[10][0])*t;
        const y1=(POS[10][1]-R)+(POS[14][1]+R-(POS[10][1]-R))*t;
        return <line key={i} x1={x1} y1={y1} x2={x1+12} y2={y1} stroke="#b8a898" strokeWidth="4" strokeLinecap="round" opacity="0.9"/>;
      })}

      {/* 🎿 Casa 11 → 3 (escorregador) */}
      <path d={`M${POS[11][0]},${POS[11][1]+R} Q${POS[11][0]-60},${(POS[11][1]+POS[3][1])/2} ${POS[3][0]+20},${POS[3][1]-20}`}
        fill="none" stroke="#c8c0b8" strokeWidth="12" strokeLinecap="round" opacity="0.85"/>
      <path d={`M${POS[11][0]},${POS[11][1]+R} Q${POS[11][0]-60},${(POS[11][1]+POS[3][1])/2} ${POS[3][0]+20},${POS[3][1]-20}`}
        fill="none" stroke="#e8e0d8" strokeWidth="8" strokeLinecap="round" opacity="0.7"/>

      {/* 🎿 Casa 15 → 7 (escorregador) */}
      <path d={`M${POS[15][0]},${POS[15][1]+R} Q${POS[15][0]+40},${(POS[15][1]+POS[7][1])/2} ${POS[7][0]-20},${POS[7][1]-20}`}
        fill="none" stroke="#c8c0b8" strokeWidth="12" strokeLinecap="round" opacity="0.85"/>
      <path d={`M${POS[15][0]},${POS[15][1]+R} Q${POS[15][0]+40},${(POS[15][1]+POS[7][1])/2} ${POS[7][0]-20},${POS[7][1]-20}`}
        fill="none" stroke="#e8e0d8" strokeWidth="8" strokeLinecap="round" opacity="0.7"/>

      {/* ── CASAS ── */}
      {BOARD.map((cell, i) => {
        const [cx, cy] = POS[i];
        const col = CIRCLE_COLORS[i];
        const teamsHere = teams.filter((_, ti) => positions[ti] === i);
        const isSabias = cell.t === 'sabias';
        const subParts = (cell.sub || '').split('\n');

        if (isSabias) {
          // Carta post-it rectangular
          const cardCol = SABIAS_MAP[i] || '#e8752a';
          const cardW = 88, cardH = 58;
          return (
            <g key={i} filter="url(#shadow)">
              {/* Post-it branco */}
              <rect x={cx-cardW/2-6} y={cy-cardH/2-6} width={cardW+12} height={cardH+12}
                rx={4} fill="white" opacity="0.92"/>
              {/* Pionés */}
              <circle cx={cx} cy={cy-cardH/2-2} r={5} fill="#9a9090"/>
              <circle cx={cx} cy={cy-cardH/2-2} r={3} fill="#c8c0b8"/>
              {/* Carta colorida */}
              <rect x={cx-cardW/2} y={cy-cardH/2} width={cardW} height={cardH}
                rx={6} fill={cardCol}/>
              <text x={cx} y={cy-10} fill="white" fontSize={7.5} fontWeight="bold"
                textAnchor="middle" fontFamily="'Courier Prime',monospace" letterSpacing={1.5}>SABIAS QUE</text>
              <text x={cx} y={cy+4} fill="white" fontSize={9} fontWeight="bold"
                textAnchor="middle" fontFamily="'Courier Prime',monospace">TIRA UMA</text>
              <text x={cx} y={cy+17} fill="white" fontSize={9} fontWeight="bold"
                textAnchor="middle" fontFamily="'Courier Prime',monospace">CARTA</text>
              {/* Peças */}
              {teamsHere.map((tm, ti) => (
                <g key={ti}>
                  <circle cx={cx-cardW/2-14+ti*14} cy={cy+cardH/2+16}
                    r={8} fill={tm.color} stroke="white" strokeWidth={2}
                    filter="url(#cirshadow)"/>
                  <text x={cx-cardW/2-14+ti*14} y={cy+cardH/2+20}
                    fontSize={7} fill="white" textAnchor="middle"
                    fontFamily="'Courier Prime',monospace" fontWeight="bold">
                    {tm.name.charAt(0)}
                  </text>
                </g>
              ))}
            </g>
          );
        }

        if (cell.t === 'inicio') {
          return (
            <g key={i} filter="url(#shadow)">
              <rect x={cx-36} y={cy-24} width={72} height={48} rx={24}
                fill={col} filter="url(#cirshadow)"/>
              <rect x={cx-36} y={cy-24} width={72} height={48} rx={24} fill="url(#glare)"/>
              <text x={cx} y={cy+5} fill="white" fontSize={12} fontWeight="bold"
                textAnchor="middle" fontFamily="'Courier Prime',monospace" letterSpacing={1}>INÍCIO</text>
            </g>
          );
        }

        if (cell.t === 'fim') {
          return (
            <g key={i} filter="url(#shadow)">
              {/* Post-it */}
              <rect x={cx-R-6} y={cy-R-8} width={(R+6)*2} height={(R+8)*2}
                rx={4} fill="white" opacity="0.92"/>
              <circle cx={cx} cy={cy-R-4} r={5} fill="#9a9090"/>
              <circle cx={cx} cy={cy-R-4} r={3} fill="#c8c0b8"/>
              <circle cx={cx} cy={cy} r={R} fill={col} filter="url(#cirshadow)"/>
              <circle cx={cx} cy={cy} r={R} fill="url(#glare)"/>
              <text x={cx} y={cy+6} fill="white" fontSize={14} fontWeight="bold"
                textAnchor="middle" fontFamily="'Courier Prime',monospace" letterSpacing={2}>FIM</text>
              {teamsHere.map((tm, ti) => (
                <g key={ti}>
                  <circle cx={cx-R+8+ti*18} cy={cy+R+16} r={9} fill={tm.color}
                    stroke="white" strokeWidth={2.5} filter="url(#cirshadow)"/>
                  <text x={cx-R+8+ti*18} y={cy+R+20} fontSize={7} fill="white"
                    textAnchor="middle" fontFamily="'Courier Prime',monospace" fontWeight="bold">
                    {tm.name.charAt(0)}
                  </text>
                </g>
              ))}
            </g>
          );
        }

        // Círculo normal (dilema / reflete)
        const darker = col === '#e8752a' ? '#c05e1a'
          : col === '#3aaa60' ? '#228848'
          : col === '#f5c518' ? '#d4a800'
          : '#1a5fab';

        return (
          <g key={i} filter="url(#shadow)">
            {/* Post-it branco atrás */}
            <rect x={cx-R-8} y={cy-R-10} width={(R+8)*2} height={(R+10)*2+18}
              rx={4} fill="white" opacity="0.9"/>
            {/* Pionés */}
            <circle cx={cx} cy={cy-R-6} r={5} fill="#9a9090"/>
            <circle cx={cx} cy={cy-R-6} r={3} fill="#c8c0b8"/>
            {/* Círculo colorido com borda mais escura */}
            <circle cx={cx} cy={cy} r={R} fill={darker} filter="url(#cirshadow)"/>
            <circle cx={cx} cy={cy} r={R-3} fill={col}/>
            <circle cx={cx} cy={cy} r={R-3} fill="url(#glare)"/>
            {/* Número */}
            <text x={cx} y={cy-6} fill="white" fontSize={18} fontWeight="bold"
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="'Courier Prime',monospace">{cell.n}</text>
            {/* Sub-label em fita adesiva */}
            <rect x={cx-32} y={cy+R+2} width={64} height={14} rx={2}
              fill="#e8e0d0" opacity="0.85"/>
            {subParts.map((p, pi) => (
              <text key={pi} x={cx} y={cy+R+10+pi*10} fill="#3a3028" fontSize={6.5}
                textAnchor="middle" fontFamily="'Courier Prime',monospace"
                fontWeight="bold" letterSpacing={0.5}>{p}</text>
            ))}
            {/* Peças das equipas — FORA do círculo, bem visíveis */}
            {teamsHere.map((tm, ti) => {
              const offset = (ti - (teamsHere.length - 1) / 2) * 20;
              return (
                <g key={ti}>
                  {/* Linha a ligar peça à casa */}
                  <line x1={cx} y1={cy+R} x2={cx+offset} y2={cy+R+30}
                    stroke={tm.color} strokeWidth={2} opacity={0.7}/>
                  {/* Círculo da peça */}
                  <circle cx={cx+offset} cy={cy+R+40} r={10}
                    fill={tm.color} stroke="white" strokeWidth={2.5}
                    filter="url(#cirshadow)"/>
                  {/* Inicial da equipa */}
                  <text x={cx+offset} y={cy+R+44} fontSize={8} fill="white"
                    textAnchor="middle" fontFamily="'Courier Prime',monospace"
                    fontWeight="bold">{tm.name.charAt(0)}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
