import React from 'react';
import { BOARD } from '../data';

const POS = [
  [38,  400],  // 0  INÍCIO
  [106, 395],  // 1
  [176, 395],  // 2
  [252, 385],  // 3  SABIAS
  [326, 395],  // 4
  [398, 393],  // 5  ESTIVE A PENSAR  🪜→7
  [468, 395],  // 6
  [496, 265],  // 7
  [426, 265],  // 8
  [354, 258],  // 9  SABIAS
  [258, 265],  // 10 O QUE ACHAS     🪜→13
  [188, 265],  // 11 NINGUÉM VIU     🎿→2
  [186, 135],  // 12
  [256, 135],  // 13
  [332, 128],  // 14 SABIAS
  [408, 133],  // 15 NÃO ME INTERESSA 🎿→8
  [476, 135],  // 16
  [544, 132],  // 17 FIM
];

export default function Board({ positions, teams }) {
  const teamsAtPos = {};
  teams.forEach((t, i) => {
    const p = positions[i];
    if (!teamsAtPos[p]) teamsAtPos[p] = [];
    teamsAtPos[p].push({ ...t, idx: i });
  });

  const renderPieces = (posIdx) => {
    const here = teamsAtPos[posIdx] || [];
    if (here.length === 0) return null;
    const [cx, cy] = POS[posIdx];
    const pieceR = 7;
    const spacing = 16;
    const totalW = (here.length - 1) * spacing;
    return here.map((tm, ti) => {
      const px = cx - totalW / 2 + ti * spacing;
      const py = cy + 40;
      return (
        <g key={ti}>
          <circle cx={px} cy={py} r={pieceR + 1.5} fill="white" opacity="0.9"/>
          <circle cx={px} cy={py} r={pieceR} fill={tm.color} stroke="white" strokeWidth="1.5"/>
          <line x1={px} y1={py - pieceR - 1} x2={px} y2={py - pieceR - 7}
            stroke={tm.color} strokeWidth="2" strokeLinecap="round"/>
        </g>
      );
    });
  };

  return (
    <svg viewBox="0 0 680 480" width="100%" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Ética em Jogo — Tabuleiro</title>

      {/* Fundo */}
      <rect width="680" height="480" fill="#e8e0d0"/>
      <ellipse cx="560" cy="80"  rx="28" ry="18" fill="#d4c4a8" opacity="0.5"/>
      <ellipse cx="80"  cy="380" rx="20" ry="14" fill="#d4c4a8" opacity="0.4"/>
      <ellipse cx="440" cy="300" rx="16" ry="11" fill="#c8b898" opacity="0.3"/>
      <ellipse cx="620" cy="360" rx="18" ry="12" fill="#d4c4a8" opacity="0.35"/>

      {/* Branding canto superior esquerdo */}
      <text x="18" y="28" fill="#5c3d2e" fontSize={8} fontFamily="'Courier New',monospace" letterSpacing="2">PERCURSO INTERATIVO</text>
      <text x="14" y="58" fill="#2c1810" fontSize={26} fontFamily="Georgia,serif" fontStyle="italic" fontWeight="700">ÉTICA EM JOGO</text>
      <line x1="14" y1="64" x2="190" y2="64" stroke="#2c1810" strokeWidth="1" opacity="0.35"/>
      <text x="14" y="80" fill="#5c3d2e" fontSize={11} fontFamily="Georgia,serif" fontStyle="italic">Jogo para refletir</text>

      {/* Ligações percurso */}
      {[[55,400,95,400],[135,400,170,400],[210,400,240,400],[295,400,325,400],[365,400,395,400],[435,400,465,400]].map(([x1,y1,x2,y2],i)=>(
        <line key={`bl${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8a888" strokeWidth="2" strokeDasharray="4,3" opacity="0.6"/>
      ))}
      <line x1="496" y1="367" x2="496" y2="295" stroke="#b8a888" strokeWidth="2" strokeDasharray="4,3" opacity="0.6"/>
      {[[465,265,435,265],[395,265,375,265],[320,265,290,265],[250,265,218,265]].map(([x1,y1,x2,y2],i)=>(
        <line key={`ml${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8a888" strokeWidth="2" strokeDasharray="4,3" opacity="0.6"/>
      ))}
      <line x1="188" y1="237" x2="186" y2="168" stroke="#b8a888" strokeWidth="2" strokeDasharray="4,3" opacity="0.6"/>
      {[[215,135,228,135],[284,135,300,135],[364,135,380,135],[436,135,450,135],[505,135,530,135]].map(([x1,y1,x2,y2],i)=>(
        <line key={`tl${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8a888" strokeWidth="2" strokeDasharray="4,3" opacity="0.6"/>
      ))}

      {/* ── ESCADA 5→7: [398,393]→[496,265] ── */}
      <line x1="394" y1="368" x2="490" y2="248" stroke="#8B6914" strokeWidth="4" strokeLinecap="round" opacity="0.75"/>
      <line x1="404" y1="368" x2="500" y2="248" stroke="#8B6914" strokeWidth="4" strokeLinecap="round" opacity="0.75"/>
      {[[395,352,406,352],[402,334,412,334],[412,316,422,316],[428,300,437,300],[443,282,452,282]].map(([x1,y1,x2,y2],i)=>(
        <line key={`r57${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8B6914" strokeWidth="3" opacity="0.75"/>
      ))}
      <text x="460" y="318" fill="#5a3e00" fontSize={16} fontFamily="sans-serif" textAnchor="middle">🪜</text>

      {/* ── ESCADA 10→13: [258,265]→[256,135] quase vertical ── */}
      <line x1="252" y1="238" x2="250" y2="162" stroke="#8B6914" strokeWidth="4" strokeLinecap="round" opacity="0.75"/>
      <line x1="262" y1="238" x2="260" y2="162" stroke="#8B6914" strokeWidth="4" strokeLinecap="round" opacity="0.75"/>
      {[[252,222,262,222],[251,205,261,205],[250,188,260,188],[250,172,260,172]].map(([x1,y1,x2,y2],i)=>(
        <line key={`r1013${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8B6914" strokeWidth="3" opacity="0.75"/>
      ))}
      <text x="240" y="200" fill="#5a3e00" fontSize={16} fontFamily="sans-serif" textAnchor="middle">🪜</text>

      {/* ── ESCORREGADOR 11→2: [188,265]→[176,395] quase vertical ── */}
      <path d="M188 240 Q184 310 178 372" stroke="#e74c3c" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M196 238 Q192 308 186 370" stroke="#e74c3c" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4"/>
      <text x="218" y="315" fill="#922b21" fontSize={16} fontFamily="sans-serif" textAnchor="middle">🎿</text>

      {/* ── ESCORREGADOR 15→8: [408,133]→[426,265] quase vertical ── */}
      <path d="M410 158 Q415 200 422 242" stroke="#e74c3c" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M418 156 Q423 198 430 240" stroke="#e74c3c" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4"/>
      <text x="448" y="208" fill="#922b21" fontSize={16} fontFamily="sans-serif" textAnchor="middle">🎿</text>

      {/* ═══════════════ CASAS FILA BAIXO ═══════════════ */}

      {/* INÍCIO */}
      <rect x="12" y="378" width="52" height="44" rx="10" fill="#2b6cb0"/>
      <rect x="14" y="380" width="48" height="40" rx="8" fill="#3182ce" opacity="0.5"/>
      <text x="38" y="396" fill="white" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">INÍCIO</text>
      <circle cx="38" cy="375" r="4" fill="#888"/>
      {renderPieces(0)}

      {/* Casa 1 */}
      <rect x="78" y="358" width="56" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="106" cy="363" r="4" fill="#888"/>
      <circle cx="106" cy="393" r="28" fill="#f97316" stroke="#ea580c" strokeWidth="2.5"/>
      <circle cx="106" cy="393" r="22" fill="none" stroke="#fed7aa" strokeWidth="1.5" opacity="0.5"/>
      <text x="106" y="400" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">1</text>
      <rect x="82" y="421" width="48" height="12" rx="2" fill="#d4c4a8"/>
      <text x="106" y="430" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(1)}

      {/* Casa 2 */}
      <rect x="148" y="358" width="56" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="176" cy="363" r="4" fill="#888"/>
      <circle cx="176" cy="393" r="28" fill="#f97316" stroke="#ea580c" strokeWidth="2.5"/>
      <circle cx="176" cy="393" r="22" fill="none" stroke="#fed7aa" strokeWidth="1.5" opacity="0.5"/>
      <text x="176" y="400" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">2</text>
      <rect x="152" y="421" width="48" height="12" rx="2" fill="#d4c4a8"/>
      <text x="176" y="430" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(2)}

      {/* Casa 3 — SABIAS (roxa) */}
      <rect x="218" y="356" width="68" height="52" rx="6" fill="#7c3aed" stroke="#5b21b6" strokeWidth="1.5"/>
      <rect x="220" y="358" width="64" height="18" rx="3" fill="#6d28d9" opacity="0.5"/>
      <text x="252" y="370" fill="white" fontSize={8} fontFamily="'Courier New',monospace" fontWeight="700" textAnchor="middle">TIRA UMA CARTA</text>
      <text x="252" y="385" fill="white" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">SABIAS QUE</text>
      {renderPieces(3)}

      {/* Casa 4 */}
      <rect x="298" y="358" width="56" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="326" cy="363" r="4" fill="#888"/>
      <circle cx="326" cy="393" r="28" fill="#16a34a" stroke="#15803d" strokeWidth="2.5"/>
      <circle cx="326" cy="393" r="22" fill="none" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.5"/>
      <text x="326" y="400" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">4</text>
      <rect x="302" y="421" width="48" height="12" rx="2" fill="#d4c4a8"/>
      <text x="326" y="430" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(4)}

      {/* Casa 5 — ESTIVE A PENSAR */}
      <rect x="368" y="358" width="60" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="398" cy="363" r="4" fill="#888"/>
      <circle cx="398" cy="391" r="28" fill="#16a34a" stroke="#15803d" strokeWidth="2.5"/>
      <circle cx="398" cy="391" r="22" fill="none" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.5"/>
      <text x="398" y="398" fill="white" fontSize={14} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">5</text>
      <rect x="364" y="421" width="68" height="18" rx="2" fill="#d4c4a8"/>
      <text x="398" y="429" fill="#5c3d2e" fontSize={6.5} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">ESTIVE A</text>
      <text x="398" y="437" fill="#5c3d2e" fontSize={6.5} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">PENSAR...</text>
      {renderPieces(5)}

      {/* Casa 6 */}
      <rect x="440" y="358" width="56" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="468" cy="363" r="4" fill="#888"/>
      <circle cx="468" cy="393" r="28" fill="#16a34a" stroke="#15803d" strokeWidth="2.5"/>
      <circle cx="468" cy="393" r="22" fill="none" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.5"/>
      <text x="468" y="400" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">6</text>
      <rect x="444" y="421" width="48" height="12" rx="2" fill="#d4c4a8"/>
      <text x="468" y="430" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(6)}

      {/* ═══════════════ CASAS FILA MEIO ═══════════════ */}

      {/* Casa 7 */}
      <rect x="468" y="228" width="56" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="496" cy="233" r="4" fill="#888"/>
      <circle cx="496" cy="263" r="28" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5"/>
      <circle cx="496" cy="263" r="22" fill="none" stroke="#fef08a" strokeWidth="1.5" opacity="0.5"/>
      <text x="496" y="270" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">7</text>
      <rect x="472" y="291" width="48" height="12" rx="2" fill="#d4c4a8"/>
      <text x="496" y="300" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(7)}

      {/* Casa 8 */}
      <rect x="398" y="228" width="56" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="426" cy="233" r="4" fill="#888"/>
      <circle cx="426" cy="263" r="28" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5"/>
      <circle cx="426" cy="263" r="22" fill="none" stroke="#fef08a" strokeWidth="1.5" opacity="0.5"/>
      <text x="426" y="270" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">8</text>
      <rect x="402" y="291" width="48" height="12" rx="2" fill="#d4c4a8"/>
      <text x="426" y="300" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(8)}

      {/* Casa 9 — SABIAS (laranja) */}
      <rect x="318" y="230" width="68" height="52" rx="6" fill="#f97316" stroke="#ea580c" strokeWidth="1.5"/>
      <rect x="320" y="232" width="64" height="18" rx="3" fill="#ea580c" opacity="0.4"/>
      <text x="352" y="244" fill="white" fontSize={8} fontFamily="'Courier New',monospace" fontWeight="700" textAnchor="middle">TIRA UMA CARTA</text>
      <text x="352" y="259" fill="white" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">SABIAS QUE</text>
      {renderPieces(9)}

      {/* Casa 10 — O QUE ACHAS? */}
      <rect x="228" y="228" width="60" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="258" cy="233" r="4" fill="#888"/>
      <circle cx="258" cy="263" r="28" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2.5"/>
      <circle cx="258" cy="263" r="22" fill="none" stroke="#bfdbfe" strokeWidth="1.5" opacity="0.5"/>
      <text x="258" y="270" fill="white" fontSize={13} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">10</text>
      <rect x="220" y="291" width="76" height="18" rx="2" fill="#d4c4a8"/>
      <text x="258" y="299" fill="#5c3d2e" fontSize={6.5} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">O QUE ACHAS?</text>
      {renderPieces(10)}

      {/* Casa 11 — NINGUÉM VIU! */}
      <rect x="158" y="228" width="60" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="188" cy="233" r="4" fill="#888"/>
      <circle cx="188" cy="263" r="28" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2.5"/>
      <circle cx="188" cy="263" r="22" fill="none" stroke="#bfdbfe" strokeWidth="1.5" opacity="0.5"/>
      <text x="188" y="270" fill="white" fontSize={13} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">11</text>
      <rect x="150" y="291" width="76" height="18" rx="2" fill="#d4c4a8"/>
      <text x="188" y="299" fill="#5c3d2e" fontSize={6.5} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">NINGUÉM VIU!</text>
      {renderPieces(11)}

      {/* ═══════════════ CASAS FILA CIMA ═══════════════ */}

      {/* Casa 12 */}
      <rect x="158" y="98" width="56" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="186" cy="103" r="4" fill="#888"/>
      <circle cx="186" cy="133" r="28" fill="#f97316" stroke="#ea580c" strokeWidth="2.5"/>
      <circle cx="186" cy="133" r="22" fill="none" stroke="#fed7aa" strokeWidth="1.5" opacity="0.5"/>
      <text x="186" y="140" fill="white" fontSize={13} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">12</text>
      <rect x="162" y="161" width="48" height="12" rx="2" fill="#d4c4a8"/>
      <text x="186" y="170" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(12)}

      {/* Casa 13 */}
      <rect x="228" y="98" width="56" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="256" cy="103" r="4" fill="#888"/>
      <circle cx="256" cy="133" r="28" fill="#f97316" stroke="#ea580c" strokeWidth="2.5"/>
      <circle cx="256" cy="133" r="22" fill="none" stroke="#fed7aa" strokeWidth="1.5" opacity="0.5"/>
      <text x="256" y="140" fill="white" fontSize={13} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">13</text>
      <rect x="232" y="161" width="48" height="12" rx="2" fill="#d4c4a8"/>
      <text x="256" y="170" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(13)}

      {/* Casa 14 — SABIAS (verde-azulado) */}
      <rect x="298" y="100" width="68" height="52" rx="6" fill="#0d9488" stroke="#0f766e" strokeWidth="1.5"/>
      <rect x="300" y="102" width="64" height="18" rx="3" fill="#0f766e" opacity="0.5"/>
      <text x="332" y="114" fill="white" fontSize={8} fontFamily="'Courier New',monospace" fontWeight="700" textAnchor="middle">TIRA UMA CARTA</text>
      <text x="332" y="129" fill="white" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">SABIAS QUE</text>
      {renderPieces(14)}

      {/* Casa 15 — NÃO ME INTERESSA! */}
      <rect x="378" y="98" width="60" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="408" cy="103" r="4" fill="#888"/>
      <circle cx="408" cy="131" r="28" fill="#16a34a" stroke="#15803d" strokeWidth="2.5"/>
      <circle cx="408" cy="131" r="22" fill="none" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.5"/>
      <text x="408" y="138" fill="white" fontSize={13} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">15</text>
      <rect x="370" y="161" width="76" height="18" rx="2" fill="#d4c4a8"/>
      <text x="408" y="169" fill="#5c3d2e" fontSize={6} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">NÃO ME</text>
      <text x="408" y="177" fill="#5c3d2e" fontSize={6} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">INTERESSA!</text>
      {renderPieces(15)}

      {/* Casa 16 */}
      <rect x="448" y="98" width="56" height="66" rx="4" fill="white" opacity="0.85"/>
      <circle cx="476" cy="103" r="4" fill="#888"/>
      <circle cx="476" cy="133" r="28" fill="#16a34a" stroke="#15803d" strokeWidth="2.5"/>
      <circle cx="476" cy="133" r="22" fill="none" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.5"/>
      <text x="476" y="140" fill="white" fontSize={13} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">16</text>
      <rect x="452" y="161" width="48" height="12" rx="2" fill="#d4c4a8"/>
      <text x="476" y="170" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(16)}

      {/* FIM */}
      <rect x="518" y="108" width="52" height="44" rx="10" fill="#2563eb"/>
      <rect x="520" y="110" width="48" height="40" rx="8" fill="#3b82f6" opacity="0.5"/>
      <text x="544" y="128" fill="white" fontSize={11} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">FIM</text>
      <text x="544" y="144" fill="white" fontSize={14} textAnchor="middle" fontFamily="sans-serif">🏆</text>
      <circle cx="544" cy="105" r="4" fill="#888"/>
      {renderPieces(17)}

    </svg>
  );
}
