import React from 'react';
import { BOARD, TELEPORTS } from '../data';
import { cellColor } from '../utils';

// Posições (cx, cy) de cada casa no SVG 560×480
// Percurso: fila baixo (esq→dir), sobe, fila meio (dir→esq), sobe, fila cima (esq→dir)
const POS = [
  [40,  440],  // 0  INÍCIO
  [110, 440],  // 1
  [180, 440],  // 2
  [250, 440],  // 3  SABIAS
  [320, 440],  // 4
  [390, 440],  // 5  ESTIVE A PENSAR (🪜→11)
  [460, 440],  // 6
  [460, 280],  // 7
  [390, 280],  // 8
  [320, 280],  // 9  SABIAS
  [250, 280],  // 10 O QUE ACHAS (🪜→14)
  [180, 280],  // 11 NINGUÉM VIU (🎿→3)
  [180, 120],  // 12
  [250, 120],  // 13
  [320, 120],  // 14 SABIAS
  [390, 120],  // 15 NÃO ME INTERESSA (🎿→7)
  [460, 120],  // 16
  [530, 120],  // 17 FIM
];

export default function Board({ positions, teams }) {
  const W = 560, H = 480;

  // Linhas do percurso
  const lines = POS.slice(0, -1).map(([x1, y1], i) => {
    const [x2, y2] = POS[i + 1];
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="#c4a882" strokeWidth="3" strokeDasharray="6,4" opacity="0.55" />;
  });

  // Escadas e escorregadores
  const ladders = (
    <>
      {/* 🪜 Casa 5 → 11 */}
      <line x1={POS[5][0]} y1={POS[5][1]} x2={POS[11][0]} y2={POS[11][1]}
        stroke="#2e86c1" strokeWidth="4.5" strokeLinecap="round" opacity="0.8" />
      <text x={(POS[5][0]+POS[11][0])/2-14} y={(POS[5][1]+POS[11][1])/2}
        fontSize="13" fontFamily="sans-serif">🪜</text>

      {/* 🪜 Casa 10 → 14 */}
      <line x1={POS[10][0]} y1={POS[10][1]} x2={POS[14][0]} y2={POS[14][1]}
        stroke="#2e86c1" strokeWidth="4.5" strokeLinecap="round" opacity="0.8" />
      <text x={(POS[10][0]+POS[14][0])/2+4} y={(POS[10][1]+POS[14][1])/2}
        fontSize="13" fontFamily="sans-serif">🪜</text>

      {/* 🎿 Casa 11 → 3 */}
      <line x1={POS[11][0]} y1={POS[11][1]} x2={POS[3][0]} y2={POS[3][1]}
        stroke="#e74c3c" strokeWidth="4.5" strokeLinecap="round"
        strokeDasharray="8,4" opacity="0.8" />
      <text x={(POS[11][0]+POS[3][0])/2+6} y={(POS[11][1]+POS[3][1])/2}
        fontSize="13" fontFamily="sans-serif">🎿</text>

      {/* 🎿 Casa 15 → 7 */}
      <line x1={POS[15][0]} y1={POS[15][1]} x2={POS[7][0]} y2={POS[7][1]}
        stroke="#e74c3c" strokeWidth="4.5" strokeLinecap="round"
        strokeDasharray="8,4" opacity="0.8" />
      <text x={(POS[15][0]+POS[7][0])/2+4} y={(POS[15][1]+POS[7][1])/2}
        fontSize="13" fontFamily="sans-serif">🎿</text>
    </>
  );

  // Células
  const cells = BOARD.map((cell, i) => {
    const [cx, cy] = POS[i];
    const col = cellColor(cell.t);
    const teamsHere = teams.filter((_, ti) => positions[ti] === i);

    if (cell.t === 'inicio') {
      return (
        <g key={i}>
          <rect x={cx - 32} y={cy - 22} width={64} height={44} rx={8}
            fill="#2b6cb0" stroke="#1a5276" strokeWidth="2" />
          <text x={cx} y={cy - 5} fill="white" fontSize={9} fontWeight="bold"
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="'Courier Prime',monospace">INÍCIO</text>
          {teamsHere.map((tm, ti) => (
            <circle key={ti} cx={cx + (ti - (teamsHere.length - 1) / 2) * 12}
              cy={cy + 30} r={6} fill={tm.color} stroke="white" strokeWidth="1.5" />
          ))}
        </g>
      );
    }

    if (cell.t === 'fim') {
      return (
        <g key={i}>
          <rect x={cx - 26} y={cy - 22} width={52} height={44} rx={8}
            fill="#b8860b" stroke="#8b6914" strokeWidth="2" />
          <text x={cx} y={cy - 7} fill="white" fontSize={9} fontWeight="bold"
            textAnchor="middle" fontFamily="'Courier Prime',monospace">FIM</text>
          <text x={cx} y={cy + 10} fontSize={14} textAnchor="middle"
            fontFamily="sans-serif">🏆</text>
          {teamsHere.map((tm, ti) => (
            <circle key={ti} cx={cx + (ti - (teamsHere.length - 1) / 2) * 12}
              cy={cy + 30} r={6} fill={tm.color} stroke="white" strokeWidth="1.5" />
          ))}
        </g>
      );
    }

    if (cell.t === 'sabias') {
      return (
        <g key={i}>
          <rect x={cx - 36} y={cy - 26} width={72} height={52} rx={6}
            fill={col} stroke="#b7700d" strokeWidth="2" />
          <text x={cx} y={cy - 11} fill="#2c1810" fontSize={7} fontWeight="bold"
            textAnchor="middle" fontFamily="'Courier Prime',monospace">SABIAS QUE</text>
          <text x={cx} y={cy + 2} fill="#2c1810" fontSize={7}
            textAnchor="middle" fontFamily="'Courier Prime',monospace">TIRA UMA</text>
          <text x={cx} y={cy + 14} fill="#2c1810" fontSize={7}
            textAnchor="middle" fontFamily="'Courier Prime',monospace">CARTA</text>
          {teamsHere.map((tm, ti) => (
            <circle key={ti} cx={cx + (ti - (teamsHere.length - 1) / 2) * 12}
              cy={cy + 34} r={6} fill={tm.color} stroke="white" strokeWidth="1.5" />
          ))}
        </g>
      );
    }

    // Círculo (dilema / reflete)
    const subParts = (cell.sub || '').split('\n');
    const stroke = cell.t === 'dilema' ? '#c05621'
      : cell.t === 'reflete' ? '#1e6b45' : '#999';

    return (
      <g key={i}>
        <circle cx={cx} cy={cy} r={34} fill={col} stroke={stroke} strokeWidth="2.5" />
        <text x={cx} y={cy - 10} fill="white" fontSize={14} fontWeight="bold"
          textAnchor="middle" dominantBaseline="middle"
          fontFamily="'Courier Prime',monospace">{cell.n}</text>
        {subParts.map((p, pi) => (
          <text key={pi} x={cx} y={cy + 6 + pi * 9} fill="white" fontSize={6.5}
            textAnchor="middle" fontFamily="'Courier Prime',monospace">{p}</text>
        ))}
        {teamsHere.map((tm, ti) => (
          <circle key={ti} cx={cx + (ti - (teamsHere.length - 1) / 2) * 12}
            cy={cy + 44} r={6} fill={tm.color} stroke="white" strokeWidth="1.5" />
        ))}
      </g>
    );
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', maxWidth: 560, maxHeight: 480 }}>
      <rect width={W} height={H} fill="transparent" />
      {lines}
      {ladders}
      {cells}
      {/* Branding */}
      <text x={20} y={18} fill="#7a5c4e" fontSize={8}
        fontFamily="'Courier Prime',monospace">PERCURSO INTERATIVO</text>
      <text x={20} y={46} fill="#3d2b6b" fontSize={16}
        fontFamily="'Special Elite',cursive">ÉTICA EM</text>
      <text x={20} y={66} fill="#3d2b6b" fontSize={16}
        fontFamily="'Special Elite',cursive">JOGO</text>
      <text x={20} y={82} fill="#7a5c4e" fontSize={8} fontStyle="italic"
        fontFamily="'Courier Prime',monospace">Jogo para refletir</text>
    </svg>
  );
}
