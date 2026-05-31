import React, { useState, useEffect, useCallback, useRef } from 'react';
import { C, shuffle, fmt } from '../utils';
import { PAIRS, SABIAS, BOARD, TELEPORTS, DICE_EMOJI, TEAM_COLORS } from '../data';
import Board from './Board';
import CardVisual from './CardVisual';

function SectionTitle({ children }) {
  return (
    <div style={{
      fontFamily: "'Courier Prime', monospace",
      fontSize: '0.62rem', textTransform: 'uppercase',
      letterSpacing: 2, color: C.inkLight,
      borderBottom: `1px solid ${C.border}`, paddingBottom: 3,
    }}>{children}</div>
  );
}

export default function GameScreen({ teams, onRestart }) {
  const [positions, setPositions]       = useState(teams.map(() => 0));
  const [turn, setTurn]                 = useState(0);
  const [rolled, setRolled]             = useState(false);
  const [diceVal, setDiceVal]           = useState(null);
  const [rolling, setRolling]           = useState(false);
  const [activeCard, setActiveCard]     = useState(null);
  const [showReflete, setShowReflete]   = useState(false);
  const [modal, setModal]               = useState(null);
  const [log, setLog]                   = useState([`Jogo iniciado! Começa ${teams[0].name}.`]);
  const [winner, setWinner]             = useState(null);
  const [timerSec, setTimerSec]         = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerDefault, setTimerDefault] = useState(180);

  const pairDeck  = useRef(shuffle(PAIRS.map((_, i) => i)));
  const sabiasDeck = useRef(shuffle(SABIAS.map((_, i) => i)));
  const timerRef  = useRef(null);

  const addLog = useCallback((txt, imp = false) => {
    setLog(prev => [{ txt, imp, id: Date.now() + Math.random() }, ...prev].slice(0, 25));
  }, []);

  // Timer
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSec(s => {
          if (s <= 1) {
            clearInterval(timerRef.current);
            setTimerRunning(false);
            setModal({ title: '⏱️ Tempo Esgotado!', body: 'O tempo de discussão terminou.\nA equipa pode concluir e passar a vez.' });
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const resetTimer = useCallback((s) => {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setTimerSec(s !== undefined ? s : timerDefault);
  }, [timerDefault]);

  const setTimer = (s) => { setTimerDefault(s); resetTimer(s); };
  const startTimer = () => { if (!timerRunning) setTimerRunning(true); };

  const drawPair = () => {
    if (pairDeck.current.length === 0) pairDeck.current = shuffle(PAIRS.map((_, i) => i));
    return pairDeck.current.pop();
  };
  const drawSabias = () => {
    if (sabiasDeck.current.length === 0) sabiasDeck.current = shuffle(SABIAS.map((_, i) => i));
    return sabiasDeck.current.pop();
  };

  const processLanding = useCallback((pos, tIdx) => {
    const cell = BOARD[pos];
    if (!cell) return;
    setActiveCard(null);
    setShowReflete(false);

    if (pos === 17) { setWinner(tIdx); return; }

    if (cell.t === 'dilema') {
      const pi = drawPair();
      setActiveCard({ type: 'dilema', pairIdx: pi });
      setShowReflete(false);
      addLog(`⚖️ Carta DILEMA activada`, true);
      resetTimer(timerDefault);
      setTimerRunning(true);
    } else if (cell.t === 'reflete') {
      const pi = drawPair();
      setActiveCard({ type: 'dilema', pairIdx: pi });
      setShowReflete(true);
      addLog(`💭 Carta REFLETE activada`, true);
      resetTimer(timerDefault);
    } else if (cell.t === 'sabias') {
      const si = drawSabias();
      setActiveCard({ type: 'sabias', sabiasIdx: si });
      addLog(`📋 Carta SABIAS QUE lida — equipa avança!`);
      // Avança automaticamente uma casa após 1.2s
      setTimeout(() => {
        setPositions(prev => {
          const next = [...prev];
          const np = Math.min(prev[tIdx] + 1, 17);
          next[tIdx] = np;
          addLog(`${teams[tIdx].name} avança para casa ${np === 17 ? 'FIM' : BOARD[np].n}`);
          if (np === 17) setWinner(tIdx);
          return next;
        });
      }, 1200);
    }
  }, [addLog, resetTimer, timerDefault, teams]);

  const handleRoll = () => {
    if (rolled || rolling) return;
    setRolling(true);
    let ticks = 0;
    const iv = setInterval(() => {
      setDiceVal(Math.floor(Math.random() * 6) + 1);
      ticks++;
      if (ticks >= 10) {
        clearInterval(iv);
        setRolling(false);
        const result = Math.floor(Math.random() * 6) + 1;
        setDiceVal(result);
        setRolled(true);

        setPositions(prev => {
          const next = [...prev];
          const oldPos = prev[turn];
          let newPos = Math.min(oldPos + result, 17);
          next[turn] = newPos;

          const oldLabel = oldPos === 0 ? 'INÍCIO' : BOARD[oldPos]?.n;
          const newLabel = newPos === 17 ? 'FIM' : BOARD[newPos]?.n;
          addLog(`${teams[turn].name}: ${oldLabel} → ${newLabel} (dado: ${result})`);

          if (TELEPORTS[newPos] !== undefined) {
            const dest = TELEPORTS[newPos];
            const isSobe = dest > newPos;
            setTimeout(() => {
              setPositions(p2 => {
                const n2 = [...p2];
                n2[turn] = dest;
                addLog(`${isSobe ? '🪜' : '🎿'} ${teams[turn].name} ${isSobe ? 'subiu' : 'desceu'}! → Casa ${BOARD[dest]?.n || dest}`, true);
                setModal({
                  title: isSobe ? '🪜 Sobe!' : '🎿 Desce!',
                  body: `${teams[turn].name} ${isSobe ? 'subiu a escada' : 'desceu o escorregador'}!\n\nCasa ${newPos} → Casa ${dest}`,
                });
                processLanding(dest, turn);
                return n2;
              });
            }, 700);
            return next;
          }

          processLanding(newPos, turn);
          return next;
        });
      }
    }, 60);
  };

  const handleNextTurn = () => {
    const nextTurn = (turn + 1) % teams.length;
    setTurn(nextTurn);
    setRolled(false);
    setDiceVal(null);
    setActiveCard(null);
    setShowReflete(false);
    resetTimer(timerDefault);
    addLog(`─── Turno de ${teams[nextTurn].name} ───`);
  };

  // ── VITÓRIA ───────────────────────────────────────────────────────────────
  if (winner !== null) {
    const t = teams[winner];
    return (
      <div style={{
        minHeight: '100vh', background: C.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, fontFamily: "'Special Elite', cursive",
      }}>
        <div style={{
          background: C.paper, border: `3px solid ${C.gold}`,
          borderRadius: 10, padding: '44px 52px',
          maxWidth: 440, textAlign: 'center',
          boxShadow: `8px 8px 0 ${C.gold}`,
        }}>
          <div style={{ fontSize: '3.8rem', marginBottom: 12 }}>🏆</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', color: C.purple, marginBottom: 6 }}>Parabéns!</div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '1.1rem', color: C.gold, marginBottom: 14 }}>{t.name}</div>
          <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.82rem', color: C.inkLight, lineHeight: 1.7, marginBottom: 26 }}>
            Chegaram ao fim do tabuleiro!<br />
            O verdadeiro prémio são as reflexões<br />e as discussões que ficam na memória.
          </p>
          <button onClick={onRestart} style={{
            background: C.purple, color: 'white',
            border: `2px solid ${C.ink}`, padding: '12px 36px',
            fontFamily: "'Special Elite', cursive", fontSize: '0.95rem',
            letterSpacing: 2, cursor: 'pointer', borderRadius: 4,
            boxShadow: `3px 3px 0 ${C.ink}`,
          }}>↺ Jogar de Novo</button>
        </div>
      </div>
    );
  }

  // ── LAYOUT PRINCIPAL ──────────────────────────────────────────────────────
  const currentPair  = activeCard?.type !== 'sabias' && activeCard?.pairIdx !== undefined
    ? PAIRS[activeCard.pairIdx] : null;
  const currentSabias = activeCard?.type === 'sabias' ? SABIAS[activeCard.sabiasIdx] : null;

  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', fontFamily: "'Special Elite', cursive", overflow: 'hidden' }}>

      {/* ── PAINEL ESQUERDO ── */}
      <div style={{
        width: 208, flexShrink: 0, background: C.paper,
        borderRight: `1.5px solid ${C.border}`,
        display: 'flex', flexDirection: 'column',
        padding: 12, gap: 10, overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ background: C.purple, color: 'white', textAlign: 'center', padding: '9px 10px', borderRadius: 6 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontWeight: 700, letterSpacing: 2 }}>ÉTICA EM JOGO</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.66rem', color: C.goldLight }}>Ética &amp; Deontologia</div>
        </div>

        {/* Equipas */}
        <SectionTitle>Equipas</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {teams.map((t, i) => (
            <div key={i} style={{
              background: i === turn ? '#ede3ff' : C.bg,
              border: `1.5px solid ${i === turn ? C.purple : C.border}`,
              borderRadius: 6, padding: '7px 9px',
              boxShadow: i === turn ? `2px 2px 0 ${C.purple}` : 'none',
              transition: 'all 0.2s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color }} />
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', flex: 1 }}>{t.name}</div>
                {i === turn && (
                  <span style={{ background: C.purple, color: 'white', fontSize: '0.55rem', padding: '1px 5px', borderRadius: 8, letterSpacing: 1 }}>VEZ</span>
                )}
              </div>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.64rem', color: C.inkLight }}>
                Casa {positions[i] === 0 ? 'INÍCIO' : positions[i] === 17 ? 'FIM' : BOARD[positions[i]]?.n}
                {positions[i] === 17 ? ' 🏆' : ''}
              </div>
            </div>
          ))}
        </div>

        {/* Dado */}
        <SectionTitle>Dado</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
          <div style={{
            width: 58, height: 58, background: 'white',
            border: `2.5px solid ${C.ink}`, borderRadius: 9,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', boxShadow: `3px 3px 0 ${C.ink}`,
          }}>
            {diceVal ? DICE_EMOJI[diceVal - 1] : '🎲'}
          </div>

          <button onClick={handleRoll} disabled={rolled || rolling} style={{
            width: '100%', background: rolled || rolling ? '#aaa' : C.orange,
            color: 'white', border: `2px solid ${C.ink}`, padding: '8px 0',
            fontFamily: "'Special Elite', cursive", fontSize: '0.8rem',
            letterSpacing: 1, textTransform: 'uppercase',
            cursor: rolled || rolling ? 'not-allowed' : 'pointer',
            borderRadius: 4, boxShadow: `2px 2px 0 ${C.ink}`,
          }}>Lançar Dado</button>

          {rolled && (
            <button onClick={handleNextTurn} style={{
              width: '100%', background: C.green, color: 'white',
              border: `2px solid ${C.ink}`, padding: '8px 0',
              fontFamily: "'Special Elite', cursive", fontSize: '0.78rem',
              letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
              borderRadius: 4, boxShadow: `2px 2px 0 ${C.ink}`,
            }}>Próxima Equipa →</button>
          )}

          <div style={{
            fontFamily: "'Courier Prime', monospace", fontSize: '0.68rem',
            color: C.purple, textAlign: 'center', minHeight: 28, lineHeight: 1.4,
          }}>
            {diceVal ? `${teams[turn].name} tirou ${diceVal}` : 'A aguardar lançamento...'}
          </div>
        </div>

        {/* Legenda */}
        <SectionTitle>Legenda</SectionTitle>
        {[
          { c: '#e8752a', b: '#c05621', l: 'DILEMA' },
          { c: '#f5b93a', b: '#b7700d', l: 'SABIAS QUE' },
          { c: '#3aaa60', b: '#1e6b45', l: 'REFLETE' },
          { c: '#2e86c1', b: '#1a5276', l: '🪜 Sobe (5, 10)' },
          { c: '#e74c3c', b: '#922b21', l: '🎿 Desce (11, 15)' },
        ].map((x, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
            <div style={{ width: 13, height: 13, background: x.c, border: `1px solid ${x.b}`, borderRadius: 3, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.64rem', color: C.inkLight }}>{x.l}</span>
          </div>
        ))}

        {/* Histórico */}
        <SectionTitle>Histórico</SectionTitle>
        <div style={{ maxHeight: 110, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {log.slice(0, 12).map((l, i) => (
            <div key={typeof l === 'object' ? l.id : i} style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: '0.62rem',
              color: (typeof l === 'object' && l.imp) ? C.orange : C.inkLight,
              borderLeft: `2px solid ${(typeof l === 'object' && l.imp) ? C.orange : C.border}`,
              paddingLeft: 5, lineHeight: 1.35,
            }}>
              {typeof l === 'object' ? l.txt : l}
            </div>
          ))}
        </div>
      </div>

      {/* ── TABULEIRO ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 14, overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%', maxWidth: 560, maxHeight: 480 }}>
          <Board positions={positions} teams={teams} />
        </div>
      </div>

      {/* ── PAINEL DIREITO ── */}
      <div style={{
        width: 248, flexShrink: 0, background: C.paper,
        borderLeft: `1.5px solid ${C.border}`,
        display: 'flex', flexDirection: 'column',
        padding: 12, gap: 10, overflowY: 'auto',
      }}>
        {/* Carta activa */}
        <SectionTitle>Carta Activa</SectionTitle>
        {!activeCard ? (
          <div style={{
            fontFamily: "'Courier Prime', monospace", fontSize: '0.74rem',
            color: C.inkLight, textAlign: 'center',
            padding: '22px 8px', border: `1.5px dashed ${C.border}`,
            borderRadius: 8, lineHeight: 1.6,
          }}>
            Lança o dado para avançar.<br />A carta aparece aqui.
          </div>
        ) : (
          <CardVisual
            type={activeCard.type}
            pair={currentPair}
            sabiasCard={currentSabias}
            showReflete={showReflete}
            onFlip={activeCard.type !== 'sabias' ? () => setShowReflete(r => !r) : null}
          />
        )}

        {/* Temporizador */}
        <SectionTitle>Temporizador</SectionTitle>
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 9px' }}>
          <div style={{
            textAlign: 'center', fontFamily: "'Courier Prime', monospace",
            fontSize: '1.9rem', fontWeight: 'bold', letterSpacing: 4,
            color: timerSec <= 30 && timerSec > 0 ? C.orange : C.ink,
            animation: timerSec <= 30 && timerSec > 0 ? 'blink 1s infinite' : 'none',
            marginBottom: 7,
          }}>
            <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
            {fmt(timerSec)}
          </div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
            {[[120, '2 min'], [180, '3 min'], [300, '5 min']].map(([s, l]) => (
              <button key={s} onClick={() => setTimer(s)} style={{
                flex: 1, background: timerDefault === s ? C.purple : C.paper,
                color: timerDefault === s ? 'white' : C.ink,
                border: `1px solid ${timerDefault === s ? C.purple : C.border}`,
                borderRadius: 4, fontFamily: "'Courier Prime', monospace",
                fontSize: '0.65rem', cursor: 'pointer', padding: '4px 0',
              }}>{l}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            <button onClick={startTimer} disabled={timerRunning} style={{
              flex: 1, background: timerRunning ? '#aaa' : C.green, color: 'white',
              border: `1px solid ${C.ink}`, borderRadius: 4,
              fontFamily: "'Courier Prime', monospace", fontSize: '0.65rem',
              cursor: timerRunning ? 'not-allowed' : 'pointer', padding: '4px 0',
            }}>▶ Iniciar</button>
            <button onClick={() => resetTimer(timerDefault)} style={{
              flex: 1, background: C.paper, border: `1px solid ${C.border}`,
              borderRadius: 4, fontFamily: "'Courier Prime', monospace",
              fontSize: '0.65rem', cursor: 'pointer', padding: '4px 0', color: C.ink,
            }}>↺ Reset</button>
          </div>
        </div>

        {/* Turno actual */}
        <div style={{
          fontFamily: "'Courier Prime', monospace", fontSize: '0.72rem',
          color: C.inkLight, padding: '7px 9px', background: C.bg,
          borderRadius: 6, border: `1px solid ${C.border}`, lineHeight: 1.5,
        }}>
          <strong style={{ color: C.purple }}>{teams[turn].name}</strong><br />
          {rolled ? 'Aguardar próximo turno' : 'Lançar o dado'}
        </div>

        {/* Instrução rápida */}
        <div style={{
          fontFamily: "'Courier Prime', monospace", fontSize: '0.62rem',
          color: C.inkLight, padding: '7px 9px', background: C.bg,
          borderRadius: 6, border: `1px solid ${C.border}`, lineHeight: 1.55,
        }}>
          <strong style={{ color: C.ink, display: 'block', marginBottom: 4 }}>Regras rápidas</strong>
          ⚖️ DILEMA — todos discutem<br />
          📋 SABIAS QUE — lê e avança<br />
          💭 REFLETE — abre o verso<br />
          🪜 Casas 5, 10 — sobe<br />
          🎿 Casas 11, 15 — desce
        </div>
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <div onClick={() => setModal(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(44,24,16,0.55)',
          zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: C.paper, border: `3px solid ${C.ink}`,
            borderRadius: 10, padding: 26, maxWidth: 400, width: '100%',
            boxShadow: `6px 6px 0 ${C.ink}`,
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: C.purple, textAlign: 'center', marginBottom: 10 }}>
              {modal.title}
            </div>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.82rem', color: C.ink, textAlign: 'center', lineHeight: 1.7, marginBottom: 18, whiteSpace: 'pre-line' }}>
              {modal.body}
            </div>
            <button onClick={() => setModal(null)} style={{
              width: '100%', background: C.purple, color: 'white',
              border: `2px solid ${C.ink}`, padding: '9px 0',
              fontFamily: "'Special Elite', cursive", fontSize: '0.88rem',
              letterSpacing: 1, cursor: 'pointer', borderRadius: 4,
              boxShadow: `3px 3px 0 ${C.ink}`,
            }}>Continuar</button>
          </div>
        </div>
      )}
    </div>
  );
}
