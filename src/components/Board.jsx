import React from 'react';
import { BOARD } from '../data';

// Posições (cx,cy) — viewBox 720×500
// Percurso: fila baixo esq→dir, sobe, fila meio dir→esq, sobe, fila cima esq→dir
const POS = [
  [42,  430],  // 0  INÍCIO
  [118, 425],  // 1
  [194, 425],  // 2
  [270, 415],  // 3  SABIAS
  [346, 425],  // 4
  [422, 423],  // 5  ESTIVE A PENSAR  🪜→7
  [498, 425],  // 6
  [574, 285],  // 7
  [498, 285],  // 8
  [422, 278],  // 9  SABIAS
  [346, 285],  // 10 O QUE ACHAS     🪜→13
  [270, 285],  // 11 NINGUÉM VIU     🎿→2
  [194, 285],  // 12
  [194, 145],  // 13
  [270, 138],  // 14 SABIAS
  [346, 145],  // 15 NÃO ME INTERESSA 🎿→8
  [422, 145],  // 16
  [498, 145],  // 17
  [574, 145],  // 18 FIM — índice 17 no BOARD
];

// O BOARD tem índices 0-17, POS[17] = FIM
// Usar POS[i] para BOARD[i]

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
    const [cx, cy] = POS[posIdx] || [0, 0];
    const pieceR = 8;
    const spacing = 18;
    const totalW = (here.length - 1) * spacing;
    return here.map((tm, ti) => {
      const px = cx - totalW / 2 + ti * spacing;
      const py = cy + 44;
      return (
        <g key={ti}>
          <circle cx={px} cy={py} r={pieceR + 2} fill="white" opacity="0.9"/>
          <circle cx={px} cy={py} r={pieceR} fill={tm.color} stroke="white" strokeWidth="2"/>
          <line x1={px} y1={py - pieceR - 1} x2={px} y2={py - pieceR - 8}
            stroke={tm.color} strokeWidth="2.5" strokeLinecap="round"/>
        </g>
      );
    });
  };

  // Coordenadas abreviadas
  const P = POS;

  return (
    <svg viewBox="0 0 720 500" width="100%" height="100%"
      style={{ display: 'block' }} role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Ética em Jogo — Tabuleiro</title>

      {/* Fundo bege com manchas */}
      <rect width="720" height="500" fill="#e8e0d0"/>
      <ellipse cx="600" cy="80"  rx="32" ry="20" fill="#d4c4a8" opacity="0.5"/>
      <ellipse cx="80"  cy="390" rx="22" ry="15" fill="#d4c4a8" opacity="0.4"/>
      <ellipse cx="460" cy="310" rx="18" ry="12" fill="#c8b898" opacity="0.3"/>
      <ellipse cx="660" cy="370" rx="20" ry="13" fill="#d4c4a8" opacity="0.35"/>
      <ellipse cx="120" cy="200" rx="14" ry="9"  fill="#c8b898" opacity="0.25"/>

      {/* ── BRANDING ── */}
      <text x="18" y="30" fill="#5c3d2e" fontSize={9} fontFamily="'Courier New',monospace" letterSpacing="2">PERCURSO INTERATIVO</text>
      <text x="14" y="64" fill="#2c1810" fontSize={28} fontFamily="Georgia,serif" fontStyle="italic" fontWeight="700">ÉTICA EM JOGO</text>
      <line x1="14" y1="70" x2="200" y2="70" stroke="#2c1810" strokeWidth="1" opacity="0.35"/>
      <text x="14" y="87" fill="#5c3d2e" fontSize={12} fontFamily="Georgia,serif" fontStyle="italic">Jogo para refletir</text>

      {/* ── LIGAÇÕES PERCURSO ── */}
      {/* Fila baixo */}
      {[[65,425,100,425],[158,425,194,425],[232,425,252,425],[308,425,328,425],[384,425,404,425],[460,425,480,425]].map(([x1,y1,x2,y2],i)=>(
        <line key={`bl${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8a888" strokeWidth="2.5" strokeDasharray="5,4" opacity="0.6"/>
      ))}
      {/* Subida 6→7 */}
      <line x1="574" y1="397" x2="574" y2="317" stroke="#b8a888" strokeWidth="2.5" strokeDasharray="5,4" opacity="0.6"/>
      {/* Fila meio dir→esq */}
      {[[546,285,526,285],[470,285,450,285],[394,285,370,285],[318,285,294,285],[246,285,222,285]].map(([x1,y1,x2,y2],i)=>(
        <line key={`ml${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8a888" strokeWidth="2.5" strokeDasharray="5,4" opacity="0.6"/>
      ))}
      {/* Subida 12→13 */}
      <line x1="194" y1="256" x2="194" y2="178" stroke="#b8a888" strokeWidth="2.5" strokeDasharray="5,4" opacity="0.6"/>
      {/* Fila cima */}
      {[[222,145,252,145],[308,145,328,145],[384,145,404,145],[460,145,480,145],[526,145,556,145]].map(([x1,y1,x2,y2],i)=>(
        <line key={`tl${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8a888" strokeWidth="2.5" strokeDasharray="5,4" opacity="0.6"/>
      ))}

      {/* ── ESCADA 5→7: [422,423]→[574,285] ── */}
      <line x1="416" y1="395" x2="566" y2="262" stroke="#8B6914" strokeWidth="4.5" strokeLinecap="round" opacity="0.75"/>
      <line x1="428" y1="395" x2="578" y2="262" stroke="#8B6914" strokeWidth="4.5" strokeLinecap="round" opacity="0.75"/>
      {[[419,378,431,378],[427,360,438,360],[438,342,449,342],[452,324,463,324],[464,307,475,307],[477,290,488,290]].map(([x1,y1,x2,y2],i)=>(
        <line key={`e57${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8B6914" strokeWidth="3" opacity="0.75"/>
      ))}
      <text x="488" y="345" fill="#5a3e00" fontSize={18} fontFamily="sans-serif" textAnchor="middle">🪜</text>

      {/* ── ESCADA 10→13: [346,285]→[194,145] diagonal ── */}
      <line x1="340" y1="258" x2="192" y2="172" stroke="#8B6914" strokeWidth="4.5" strokeLinecap="round" opacity="0.75"/>
      <line x1="352" y1="258" x2="204" y2="172" stroke="#8B6914" strokeWidth="4.5" strokeLinecap="round" opacity="0.75"/>
      {[[337,242,349,242],[326,224,338,224],[314,207,326,207],[303,191,315,191],[292,175,304,175]].map(([x1,y1,x2,y2],i)=>(
        <line key={`e1013${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8B6914" strokeWidth="3" opacity="0.75"/>
      ))}
      <text x="295" y="222" fill="#5a3e00" fontSize={18} fontFamily="sans-serif" textAnchor="middle">🪜</text>

      {/* ── ESCORREGADOR 11→2: [270,285]→[194,425] ── */}
      <path d="M270 258 Q258 340 198 402" stroke="#e74c3c" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M280 256 Q268 338 208 400" stroke="#e74c3c" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4"/>
      <text x="296" y="340" fill="#922b21" fontSize={18} fontFamily="sans-serif" textAnchor="middle">🎿</text>

      {/* ── ESCORREGADOR 15→8: [346,145]→[498,285] ── */}
      <path d="M352 170 Q400 210 490 260" stroke="#e74c3c" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M360 168 Q408 208 498 258" stroke="#e74c3c" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4"/>
      <text x="440" y="222" fill="#922b21" fontSize={18} fontFamily="sans-serif" textAnchor="middle">🎿</text>

      {/* ══════════ CASAS FILA BAIXO ══════════ */}

      {/* INÍCIO */}
      <rect x="14" y="406" width="56" height="48" rx="10" fill="#2b6cb0"/>
      <rect x="16" y="408" width="52" height="44" rx="8" fill="#3182ce" opacity="0.5"/>
      <text x="42" y="426" fill="white" fontSize={9} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">INÍCIO</text>
      <circle cx="42" cy="403" r="4.5" fill="#888"/>
      {renderPieces(0)}

      {/* Casa 1 */}
      <rect x="84" y="392" width="68" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="118" cy="398" r="4.5" fill="#888"/>
      <circle cx="118" cy="430" r="32" fill="#f97316" stroke="#ea580c" strokeWidth="3"/>
      <circle cx="118" cy="430" r="25" fill="none" stroke="#fed7aa" strokeWidth="2" opacity="0.5"/>
      <text x="118" y="437" fill="white" fontSize={18} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">1</text>
      <rect x="88" y="461" width="60" height="14" rx="3" fill="#d4c4a8"/>
      <text x="118" y="472" fill="#5c3d2e" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(1)}

      {/* Casa 2 */}
      <rect x="160" y="392" width="68" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="194" cy="398" r="4.5" fill="#888"/>
      <circle cx="194" cy="430" r="32" fill="#f97316" stroke="#ea580c" strokeWidth="3"/>
      <circle cx="194" cy="430" r="25" fill="none" stroke="#fed7aa" strokeWidth="2" opacity="0.5"/>
      <text x="194" y="437" fill="white" fontSize={18} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">2</text>
      <rect x="164" y="461" width="60" height="14" rx="3" fill="#d4c4a8"/>
      <text x="194" y="472" fill="#5c3d2e" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(2)}

      {/* Casa 3 — SABIAS (roxa) */}
      <rect x="234" y="390" width="72" height="56" rx="7" fill="#7c3aed" stroke="#5b21b6" strokeWidth="2"/>
      <rect x="236" y="392" width="68" height="20" rx="4" fill="#6d28d9" opacity="0.5"/>
      <text x="270" y="404" fill="white" fontSize={8.5} fontFamily="'Courier New',monospace" fontWeight="700" textAnchor="middle">TIRA UMA CARTA</text>
      <text x="270" y="421" fill="white" fontSize={9} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">SABIAS QUE</text>
      {renderPieces(3)}

      {/* Casa 4 */}
      <rect x="312" y="392" width="68" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="346" cy="398" r="4.5" fill="#888"/>
      <circle cx="346" cy="430" r="32" fill="#16a34a" stroke="#15803d" strokeWidth="3"/>
      <circle cx="346" cy="430" r="25" fill="none" stroke="#bbf7d0" strokeWidth="2" opacity="0.5"/>
      <text x="346" y="437" fill="white" fontSize={18} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">4</text>
      <rect x="316" y="461" width="60" height="14" rx="3" fill="#d4c4a8"/>
      <text x="346" y="472" fill="#5c3d2e" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(4)}

      {/* Casa 5 — ESTIVE A PENSAR */}
      <rect x="386" y="392" width="72" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="422" cy="398" r="4.5" fill="#888"/>
      <circle cx="422" cy="428" r="32" fill="#16a34a" stroke="#15803d" strokeWidth="3"/>
      <circle cx="422" cy="428" r="25" fill="none" stroke="#bbf7d0" strokeWidth="2" opacity="0.5"/>
      <text x="422" y="435" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">5</text>
      <rect x="382" y="461" width="80" height="20" rx="3" fill="#d4c4a8"/>
      <text x="422" y="470" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">ESTIVE A</text>
      <text x="422" y="479" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">PENSAR...</text>
      {renderPieces(5)}

      {/* Casa 6 */}
      <rect x="462" y="392" width="68" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="496" cy="398" r="4.5" fill="#888"/>
      <circle cx="496" cy="430" r="32" fill="#16a34a" stroke="#15803d" strokeWidth="3"/>
      <circle cx="496" cy="430" r="25" fill="none" stroke="#bbf7d0" strokeWidth="2" opacity="0.5"/>
      <text x="496" y="437" fill="white" fontSize={18} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">6</text>
      <rect x="466" y="461" width="60" height="14" rx="3" fill="#d4c4a8"/>
      <text x="496" y="472" fill="#5c3d2e" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(6)}

      {/* ══════════ CASAS FILA MEIO ══════════ */}

      {/* Casa 7 */}
      <rect x="538" y="252" width="68" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="572" cy="258" r="4.5" fill="#888"/>
      <circle cx="572" cy="290" r="32" fill="#eab308" stroke="#ca8a04" strokeWidth="3"/>
      <circle cx="572" cy="290" r="25" fill="none" stroke="#fef08a" strokeWidth="2" opacity="0.5"/>
      <text x="572" y="297" fill="white" fontSize={18} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">7</text>
      <rect x="542" y="321" width="60" height="14" rx="3" fill="#d4c4a8"/>
      <text x="572" y="332" fill="#5c3d2e" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(7)}

      {/* Casa 8 */}
      <rect x="462" y="252" width="68" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="496" cy="258" r="4.5" fill="#888"/>
      <circle cx="496" cy="290" r="32" fill="#eab308" stroke="#ca8a04" strokeWidth="3"/>
      <circle cx="496" cy="290" r="25" fill="none" stroke="#fef08a" strokeWidth="2" opacity="0.5"/>
      <text x="496" y="297" fill="white" fontSize={18} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">8</text>
      <rect x="466" y="321" width="60" height="14" rx="3" fill="#d4c4a8"/>
      <text x="496" y="332" fill="#5c3d2e" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(8)}

      {/* Casa 9 — SABIAS (laranja) */}
      <rect x="384" y="250" width="72" height="56" rx="7" fill="#f97316" stroke="#ea580c" strokeWidth="2"/>
      <rect x="386" y="252" width="68" height="20" rx="4" fill="#ea580c" opacity="0.4"/>
      <text x="420" y="265" fill="white" fontSize={8.5} fontFamily="'Courier New',monospace" fontWeight="700" textAnchor="middle">TIRA UMA CARTA</text>
      <text x="420" y="282" fill="white" fontSize={9} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">SABIAS QUE</text>
      {renderPieces(9)}

      {/* Casa 10 — O QUE ACHAS? */}
      <rect x="310" y="252" width="72" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="346" cy="258" r="4.5" fill="#888"/>
      <circle cx="346" cy="290" r="32" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3"/>
      <circle cx="346" cy="290" r="25" fill="none" stroke="#bfdbfe" strokeWidth="2" opacity="0.5"/>
      <text x="346" y="297" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">10</text>
      <rect x="302" y="321" width="88" height="20" rx="3" fill="#d4c4a8"/>
      <text x="346" y="331" fill="#5c3d2e" fontSize={7.5} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">O QUE ACHAS?</text>
      {renderPieces(10)}

      {/* Casa 11 — NINGUÉM VIU! */}
      <rect x="234" y="252" width="72" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="270" cy="258" r="4.5" fill="#888"/>
      <circle cx="270" cy="290" r="32" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3"/>
      <circle cx="270" cy="290" r="25" fill="none" stroke="#bfdbfe" strokeWidth="2" opacity="0.5"/>
      <text x="270" y="297" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">11</text>
      <rect x="228" y="321" width="84" height="20" rx="3" fill="#d4c4a8"/>
      <text x="270" y="331" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">NINGUÉM VIU!</text>
      {renderPieces(11)}

      {/* Casa 12 */}
      <rect x="158" y="252" width="68" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="192" cy="258" r="4.5" fill="#888"/>
      <circle cx="192" cy="290" r="32" fill="#f97316" stroke="#ea580c" strokeWidth="3"/>
      <circle cx="192" cy="290" r="25" fill="none" stroke="#fed7aa" strokeWidth="2" opacity="0.5"/>
      <text x="192" y="297" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">12</text>
      <rect x="162" y="321" width="60" height="14" rx="3" fill="#d4c4a8"/>
      <text x="192" y="332" fill="#5c3d2e" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(12)}

      {/* ══════════ CASAS FILA CIMA ══════════ */}

      {/* Casa 13 */}
      <rect x="158" y="112" width="68" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="192" cy="118" r="4.5" fill="#888"/>
      <circle cx="192" cy="150" r="32" fill="#f97316" stroke="#ea580c" strokeWidth="3"/>
      <circle cx="192" cy="150" r="25" fill="none" stroke="#fed7aa" strokeWidth="2" opacity="0.5"/>
      <text x="192" y="157" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">13</text>
      <rect x="162" y="181" width="60" height="14" rx="3" fill="#d4c4a8"/>
      <text x="192" y="192" fill="#5c3d2e" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(13)}

      {/* Casa 14 — SABIAS (verde-azulado) */}
      <rect x="234" y="110" width="72" height="56" rx="7" fill="#0d9488" stroke="#0f766e" strokeWidth="2"/>
      <rect x="236" y="112" width="68" height="20" rx="4" fill="#0f766e" opacity="0.5"/>
      <text x="270" y="125" fill="white" fontSize={8.5} fontFamily="'Courier New',monospace" fontWeight="700" textAnchor="middle">TIRA UMA CARTA</text>
      <text x="270" y="142" fill="white" fontSize={9} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">SABIAS QUE</text>
      {renderPieces(14)}

      {/* Casa 15 — NÃO ME INTERESSA! */}
      <rect x="310" y="112" width="72" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="346" cy="118" r="4.5" fill="#888"/>
      <circle cx="346" cy="150" r="32" fill="#16a34a" stroke="#15803d" strokeWidth="3"/>
      <circle cx="346" cy="150" r="25" fill="none" stroke="#bbf7d0" strokeWidth="2" opacity="0.5"/>
      <text x="346" y="157" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">15</text>
      <rect x="302" y="181" width="88" height="20" rx="3" fill="#d4c4a8"/>
      <text x="346" y="190" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">NÃO ME</text>
      <text x="346" y="199" fill="#5c3d2e" fontSize={7} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">INTERESSA!</text>
      {renderPieces(15)}

      {/* Casa 16 */}
      <rect x="386" y="112" width="68" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="420" cy="118" r="4.5" fill="#888"/>
      <circle cx="420" cy="150" r="32" fill="#16a34a" stroke="#15803d" strokeWidth="3"/>
      <circle cx="420" cy="150" r="25" fill="none" stroke="#bbf7d0" strokeWidth="2" opacity="0.5"/>
      <text x="420" y="157" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">16</text>
      <rect x="390" y="181" width="60" height="14" rx="3" fill="#d4c4a8"/>
      <text x="420" y="192" fill="#5c3d2e" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(16)}

      {/* Casa 17 */}
      <rect x="462" y="112" width="68" height="72" rx="5" fill="white" opacity="0.88"/>
      <circle cx="496" cy="118" r="4.5" fill="#888"/>
      <circle cx="496" cy="150" r="32" fill="#16a34a" stroke="#15803d" strokeWidth="3"/>
      <circle cx="496" cy="150" r="25" fill="none" stroke="#bbf7d0" strokeWidth="2" opacity="0.5"/>
      <text x="496" y="157" fill="white" fontSize={16} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">17</text>
      <rect x="466" y="181" width="60" height="14" rx="3" fill="#d4c4a8"/>
      <text x="496" y="192" fill="#5c3d2e" fontSize={8} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">DILEMA</text>
      {renderPieces(16)}

      {/* FIM */}
      <rect x="540" y="120" width="64" height="50" rx="12" fill="#2563eb"/>
      <rect x="542" y="122" width="60" height="46" rx="10" fill="#3b82f6" opacity="0.5"/>
      <text x="572" y="142" fill="white" fontSize={13} fontWeight="700" textAnchor="middle" fontFamily="'Courier New',monospace">FIM</text>
      <text x="572" y="160" fill="white" fontSize={16} textAnchor="middle" fontFamily="sans-serif">🏆</text>
      <circle cx="572" cy="117" r="4.5" fill="#888"/>
      {renderPieces(17)}

    </svg>
  );
}
