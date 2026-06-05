import React, { useState, useEffect, useCallback, useRef } from 'react';
import { C, shuffle, fmt } from '../utils';
import { PAIRS, SABIAS, BOARD, TELEPORTS, TELEPORT_MESSAGES, DICE_EMOJI, TEAM_COLORS } from '../data';
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
  const [modal, setModal]               = useState(null); // { title, body, onClose? }
  const [log, setLog]                   = useState([`Jogo iniciado! Começa ${teams[0].name}.`]);
  const [winner, setWinner]             = useState(null);

  // Temporizador de discussão (DILEMAs)
  const [timerSec, setTimerSec]         = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerDefault, setTimerDefault] = useState(180);
  const timerRef = useRef(null);

  // Temporizador SABIAS QUE (2 min, auto-avança)
  const [sabiasCountdown, setSabiasCountdown] = useState(120);
  const [sabiasActive, setSabiasActive]       = useState(false);
  const sabiasRef  = useRef(null);
  const sabiasPosRef = useRef(null); // posição actual quando SABIAS QUE foi activada
  const sabiasTurnRef = useRef(null);

  const pairDeck   = useRef(shuffle(PAIRS.map((_, i) => i)));
  const sabiasDeck = useRef(shuffle(SABIAS.map((_, i) => i)));

  const addLog = useCallback((txt, imp = false) => {
    setLog(prev => [{ txt, imp, id: Date.now() + Math.random() }, ...prev].slice(0, 25));
  }, []);

  // ── Temporizador discussão ────────────────────────────────────
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

  // ── Temporizador SABIAS QUE ───────────────────────────────────
  useEffect(() => {
    if (sabiasActive) {
      sabiasRef.current = setInterval(() => {
        setSabiasCountdown(s => {
          if (s <= 1) {
            clearInterval(sabiasRef.current);
            setSabiasActive(false);
            // Auto-avançar quando timer chega a 0
            if (sabiasPosRef.current !== null && sabiasTurnRef.current !== null) {
              executeSabiasAdvance(sabiasPosRef.current, sabiasTurnRef.current);
              sabiasPosRef.current = null;
              sabiasTurnRef.current = null;
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(sabiasRef.current);
  }, [sabiasActive]);

  const stopSabiasTimer = () => {
    clearInterval(sabiasRef.current);
    setSabiasActive(false);
    setSabiasCountdown(120);
    sabiasPosRef.current = null;
    sabiasTurnRef.current = null;
  };

  // ── Baralhos ──────────────────────────────────────────────────
  const drawPair = () => {
    if (pairDeck.current.length === 0) pairDeck.current = shuffle(PAIRS.map((_, i) => i));
    return pairDeck.current.pop();
  };
  const drawSabias = () => {
    if (sabiasDeck.current.length === 0) sabiasDeck.current = shuffle(SABIAS.map((_, i) => i));
    return sabiasDeck.current.pop();
  };

  // ── Fechar modal ──────────────────────────────────────────────
  const closeModal = () => {
    const cb = modal?.onClose;
    setModal(null);
    if (cb) cb();
  };

  // ── Executar teleporte (após modal) ───────────────────────────
  const executeTeleport = useCallback((fromPos, tIdx) => {
    const dest = TELEPORTS[fromPos];
    if (dest === undefined) return;
    setPositions(prev => {
      const next = [...prev];
      next[tIdx] = dest;
      return next;
    });
    const isSobe = TELEPORT_MESSAGES[fromPos]?.sobe;
    addLog(`${isSobe ? '🪜' : '🎿'} ${teams[tIdx].name} ${isSobe ? 'subiu' : 'desceu'}! → Casa ${BOARD[dest]?.n}`, true);
    processLanding(dest, tIdx);
  }, [teams, addLog]);

  // ── Avançar após SABIAS QUE ───────────────────────────────────
  const executeSabiasAdvance = useCallback((fromPos, tIdx) => {
    const newPos = Math.min(fromPos + 1, 17);
    setPositions(prev => {
      const next = [...prev];
      next[tIdx] = newPos;
      return next;
    });
    addLog(`${teams[tIdx].name} avança para casa ${newPos === 17 ? 'FIM' : BOARD[newPos]?.n}`);

    if (newPos === 17) { setWinner(tIdx); return; }

    // Verificar se nova posição é teleporte
    if (TELEPORTS[newPos] !== undefined) {
      const msg = TELEPORT_MESSAGES[newPos];
      setModal({
        title: msg.header,
        body: msg.body,
        onClose: () => executeTeleport(newPos, tIdx),
      });
    } else {
      processLanding(newPos, tIdx);
    }
  }, [teams, addLog, executeTeleport]);

  // ── Processar aterragem numa casa ─────────────────────────────
  const processLanding = useCallback((pos, tIdx) => {
    const cell = BOARD[pos];
    if (!cell) return;
    setActiveCard(null);
    setShowReflete(false);
    stopSabiasTimer();

    if (pos === 17) { setWinner(tIdx); return; }

    if (cell.t === 'dilema') {
      const pi = drawPair();
      setActiveCard({ type: 'dilema', pairIdx: pi });
      setShowReflete(false);
      addLog('⚖️ Carta DILEMA activada', true);
      resetTimer(timerDefault);
      setTimerRunning(true);
    } else if (cell.t === 'reflete') {
      const pi = drawPair();
      setActiveCard({ type: 'dilema', pairIdx: pi });
      setShowReflete(true);
      addLog('💭 Carta REFLETE activada', true);
      resetTimer(timerDefault);
    } else if (cell.t === 'sabias') {
      const si = drawSabias();
      setActiveCard({ type: 'sabias', sabiasIdx: si, sabiaPos: pos, sabiasTurn: tIdx });
      addLog('📋 Carta SABIAS QUE — leitura de 2 minutos');
      // Guardar posição e turno para o auto-avançar
      sabiasPosRef.current = pos;
      sabiasTurnRef.current = tIdx;
      setSabiasCountdown(120);
      setSabiasActive(true);
    }
  }, [addLog, resetTimer, timerDefault]);

  // ── Lançar dado ───────────────────────────────────────────────
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
          const oldPos = prev[turn];
          const newPos = Math.min(oldPos + result, 17);
          const next = [...prev];
          next[turn] = newPos;

          const oldLabel = oldPos === 0 ? 'INÍCIO' : BOARD[oldPos]?.n;
          const newLabel = newPos === 17 ? 'FIM' : BOARD[newPos]?.n;
          addLog(`${teams[turn].name}: ${oldLabel} → ${newLabel} (dado: ${result})`);

          // Usar setTimeout para evitar setState dentro de setState
          setTimeout(() => {
            if (newPos === 17) { setWinner(turn); return; }
            if (TELEPORTS[newPos] !== undefined) {
              const msg = TELEPORT_MESSAGES[newPos];
              setModal({
                title: msg.header,
                body: msg.body,
                onClose: () => executeTeleport(newPos, turn),
              });
            } else {
              processLanding(newPos, turn);
            }
          }, 100);

          return next;
        });
      }
    }, 60);
  };

  // ── Avançar manualmente SABIAS QUE ────────────────────────────
  const handleSabiasAdvanceNow = () => {
    if (sabiasPosRef.current === null) return;
    const pos = sabiasPosRef.current;
    const tIdx = sabiasTurnRef.current;
    stopSabiasTimer();
    executeSabiasAdvance(pos, tIdx);
  };

  // ── Reiniciar jogo (mantém equipas) ──────────────────────────
  const handleReiniciar = () => {
    setModal({
      title: '↺ Reiniciar Jogo',
      body: 'As peças voltam ao INÍCIO e o jogo recomeça.\nOs nomes das equipas mantêm-se.\n\nTens a certeza?',
      onClose: () => {
        setPositions(teams.map(() => 0));
        setTurn(0);
        setRolled(false);
        setDiceVal(null);
        setActiveCard(null);
        setShowReflete(false);
        setWinner(null);
        setLog([`Jogo reiniciado! Começa ${teams[0].name}.`]);
        resetTimer(timerDefault);
        stopSabiasTimer();
        pairDeck.current = shuffle(PAIRS.map((_, i) => i));
        sabiasDeck.current = shuffle(SABIAS.map((_, i) => i));
      },
    });
  };

  // ── Novo jogo (volta ao setup) ────────────────────────────────
  const handleNovoJogo = () => {
    setModal({
      title: '⚙️ Novo Jogo',
      body: 'Vais voltar ao ecrã de configuração.\nO jogo actual será terminado.\n\nTens a certeza?',
      onClose: () => {
        clearInterval(timerRef.current);
        stopSabiasTimer();
        onRestart();
      },
    });
  };

  // ── Instruções ────────────────────────────────────────────────
  const INSTRUCOES = `1. Todos partem do INÍCIO; começa a equipa que tirar o dado mais alto.

2. Cada equipa joga uma vez (alternadamente), lançando o dado e avançando as casas correspondentes.

3. Casa DILEMA — a equipa lê a carta em voz alta. Todos os participantes podem dar a sua opinião. O verso da carta (REFLETE) pode ajudar. Não há respostas certas.

4. Casa TIRA UMA CARTA (SABIAS QUE) — lê a carta. A equipa tem 2 minutos e avança automaticamente 1 casa.

5. Casa ESTIVE A PENSAR (5) ou O QUE ACHAS? (10) — a equipa sobe de casa.

6. Casa NINGUÉM VIU! (11) ou NÃO ME INTERESSA! (15) — a equipa desce de casa.

7. Ganha a equipa que chegar ao FIM ou estiver mais perto.`;

  const handleInstrucoes = () => {
    setModal({
      title: '📋 Instruções',
      body: INSTRUCOES,
    });
  };

  // ── Próximo turno ─────────────────────────────────────────────
  const handleNextTurn = () => {
    const nextTurn = (turn + 1) % teams.length;
    setTurn(nextTurn);
    setRolled(false);
    setDiceVal(null);
    setActiveCard(null);
    setShowReflete(false);
    resetTimer(timerDefault);
    stopSabiasTimer();
    addLog(`─── Turno de ${teams[nextTurn].name} ───`);
  };

  // ── VITÓRIA ───────────────────────────────────────────────────
  if (winner !== null) {
    const t = teams[winner];
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Special Elite', cursive" }}>
        <div style={{ background: C.paper, border: `3px solid ${C.gold}`, borderRadius: 10, padding: '44px 52px', maxWidth: 440, textAlign: 'center', boxShadow: `8px 8px 0 ${C.gold}` }}>
          <div style={{ fontSize: '3.8rem', marginBottom: 12 }}>🏆</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', color: C.purple, marginBottom: 6 }}>Parabéns!</div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '1.1rem', color: C.gold, marginBottom: 14 }}>{t.name}</div>
          <p style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.82rem', color: C.inkLight, lineHeight: 1.7, marginBottom: 26 }}>
            Chegaram ao fim do tabuleiro!<br />O verdadeiro prémio são as reflexões<br />e as discussões que ficam na memória.
          </p>
          <button onClick={onRestart} style={{ background: C.purple, color: 'white', border: `2px solid ${C.ink}`, padding: '12px 36px', fontFamily: "'Special Elite', cursive", fontSize: '0.95rem', letterSpacing: 2, cursor: 'pointer', borderRadius: 4, boxShadow: `3px 3px 0 ${C.ink}` }}>↺ Jogar de Novo</button>
        </div>
      </div>
    );
  }

  const currentPair   = activeCard?.type !== 'sabias' && activeCard?.pairIdx !== undefined ? PAIRS[activeCard.pairIdx] : null;
  const currentSabias = activeCard?.type === 'sabias' ? SABIAS[activeCard.sabiasIdx] : null;

  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', fontFamily: "'Special Elite', cursive", overflow: 'hidden' }}>

      {/* ── PAINEL ESQUERDO ── */}
      <div style={{ width: 176, flexShrink: 0, background: C.paper, borderRight: `1.5px solid ${C.border}`, display: 'flex', flexDirection: 'column', padding: 10, gap: 8, overflowY: 'auto' }}>
        <div style={{ background: C.purple, color: 'white', textAlign: 'center', padding: '9px 10px', borderRadius: 6 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontWeight: 700, letterSpacing: 2 }}>ÉTICA EM JOGO</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.66rem', color: C.goldLight }}>Ética &amp; Deontologia</div>
        </div>

        <SectionTitle>Equipas</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {teams.map((t, i) => (
            <div key={i} style={{ background: i === turn ? '#ede3ff' : C.bg, border: `1.5px solid ${i === turn ? C.purple : C.border}`, borderRadius: 6, padding: '7px 9px', boxShadow: i === turn ? `2px 2px 0 ${C.purple}` : 'none', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color }} />
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', flex: 1 }}>{t.name}</div>
                {i === turn && <span style={{ background: C.purple, color: 'white', fontSize: '0.55rem', padding: '1px 5px', borderRadius: 8, letterSpacing: 1 }}>VEZ</span>}
              </div>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.64rem', color: C.inkLight }}>
                Casa {positions[i] === 0 ? 'INÍCIO' : positions[i] === 17 ? 'FIM' : BOARD[positions[i]]?.n}{positions[i] === 17 ? ' 🏆' : ''}
              </div>
            </div>
          ))}
        </div>

        <SectionTitle>Dado</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 58, height: 58, background: 'white', border: `2.5px solid ${C.ink}`, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', boxShadow: `3px 3px 0 ${C.ink}` }}>
            {diceVal ? DICE_EMOJI[diceVal - 1] : '🎲'}
          </div>
          <button onClick={handleRoll} disabled={rolled || rolling} style={{ width: '100%', background: rolled || rolling ? '#aaa' : C.orange, color: 'white', border: `2px solid ${C.ink}`, padding: '8px 0', fontFamily: "'Special Elite', cursive", fontSize: '0.8rem', letterSpacing: 1, textTransform: 'uppercase', cursor: rolled || rolling ? 'not-allowed' : 'pointer', borderRadius: 4, boxShadow: `2px 2px 0 ${C.ink}` }}>Lançar Dado</button>
          {rolled && (
            <button onClick={handleNextTurn} style={{ width: '100%', background: C.green, color: 'white', border: `2px solid ${C.ink}`, padding: '8px 0', fontFamily: "'Special Elite', cursive", fontSize: '0.78rem', letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, boxShadow: `2px 2px 0 ${C.ink}` }}>Próxima Equipa →</button>
          )}
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.68rem', color: C.purple, textAlign: 'center', minHeight: 28, lineHeight: 1.4 }}>
            {diceVal ? `${teams[turn].name} tirou ${diceVal}` : 'A aguardar lançamento...'}
          </div>
        </div>

        <SectionTitle>Legenda</SectionTitle>
        {[
          { c: '#f97316', b: '#ea580c', l: 'DILEMA (laranja)' },
          { c: '#eab308', b: '#ca8a04', l: 'DILEMA (amarelo)' },
          { c: '#16a34a', b: '#15803d', l: 'DILEMA / REFLETE' },
          { c: '#f5b93a', b: '#b7700d', l: 'TIRA UMA CARTA' },
          { c: '#2e86c1', b: '#1a5276', l: '🪜 Sobe (5→7, 10→13)' },
          { c: '#e74c3c', b: '#922b21', l: '🎿 Desce (11→2, 15→8)' },
        ].map((x, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
            <div style={{ width: 13, height: 13, background: x.c, border: `1px solid ${x.b}`, borderRadius: 3, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.6rem', color: C.inkLight }}>{x.l}</span>
          </div>
        ))}

        <SectionTitle>Histórico</SectionTitle>
        <div style={{ maxHeight: 100, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {log.slice(0, 12).map((l, i) => (
            <div key={typeof l === 'object' ? l.id : i} style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.62rem', color: (typeof l === 'object' && l.imp) ? C.orange : C.inkLight, borderLeft: `2px solid ${(typeof l === 'object' && l.imp) ? C.orange : C.border}`, paddingLeft: 5, lineHeight: 1.35 }}>
              {typeof l === 'object' ? l.txt : l}
            </div>
          ))}
        </div>

        {/* ── BOTÕES DE NAVEGAÇÃO ── */}
        <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 5, borderTop: `1px solid ${C.border}` }}>
          <button onClick={handleInstrucoes} style={{
            width: '100%', background: C.paper, color: C.purple,
            border: `1.5px solid ${C.purple}`, padding: '7px 0',
            fontFamily: "'Courier Prime', monospace", fontSize: '0.72rem',
            letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
            borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          }}>
            📋 Instruções
          </button>
          <button onClick={handleReiniciar} style={{
            width: '100%', background: C.paper, color: C.orange,
            border: `1.5px solid ${C.orange}`, padding: '7px 0',
            fontFamily: "'Courier Prime', monospace", fontSize: '0.72rem',
            letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
            borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          }}>
            ↺ Reiniciar
          </button>
          <button onClick={handleNovoJogo} style={{
            width: '100%', background: C.paper, color: C.inkLight,
            border: `1.5px solid ${C.border}`, padding: '7px 0',
            fontFamily: "'Courier Prime', monospace", fontSize: '0.72rem',
            letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
            borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          }}>
            ⚙️ Novo Jogo
          </button>
        </div>
      </div>

      {/* ── TABULEIRO ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8, overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <Board positions={positions} teams={teams} />
        </div>
      </div>

      {/* ── PAINEL DIREITO ── */}
      <div style={{ width: 220, flexShrink: 0, background: C.paper, borderLeft: `1.5px solid ${C.border}`, display: 'flex', flexDirection: 'column', padding: 10, gap: 8, overflowY: 'auto' }}>
        <SectionTitle>Carta Activa</SectionTitle>
        {!activeCard ? (
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.74rem', color: C.inkLight, textAlign: 'center', padding: '22px 8px', border: `1.5px dashed ${C.border}`, borderRadius: 8, lineHeight: 1.6 }}>
            Lança o dado para avançar.<br />A carta aparece aqui.
          </div>
        ) : (
          <>
            <CardVisual
              type={activeCard.type}
              pair={currentPair}
              sabiasCard={currentSabias}
              showReflete={showReflete}
              onFlip={activeCard.type !== 'sabias' ? () => setShowReflete(r => !r) : null}
            />
            {/* Timer e botão avançar para SABIAS QUE */}
            {activeCard.type === 'sabias' && (
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: 2, color: C.inkLight, marginBottom: 6 }}>Tempo de leitura</div>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '1.6rem', fontWeight: 'bold', letterSpacing: 4, color: sabiasCountdown <= 30 ? C.orange : C.ink, animation: sabiasCountdown <= 30 && sabiasActive ? 'blink 1s infinite' : 'none' }}>
                  <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
                  {fmt(sabiasCountdown)}
                </div>
                <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.65rem', color: C.inkLight, margin: '4px 0 8px' }}>
                  {sabiasActive ? 'A equipa avança automaticamente no fim' : 'Tempo esgotado!'}
                </div>
                <button onClick={handleSabiasAdvanceNow} style={{ width: '100%', background: C.green, color: 'white', border: `1.5px solid ${C.ink}`, borderRadius: 4, fontFamily: "'Special Elite', cursive", fontSize: '0.78rem', letterSpacing: 1, cursor: 'pointer', padding: '7px 0', boxShadow: `2px 2px 0 ${C.ink}` }}>
                  Avançar agora →
                </button>
              </div>
            )}
          </>
        )}

        {/* Temporizador discussão (só para DILEMAs) */}
        {activeCard?.type !== 'sabias' && (
          <>
            <SectionTitle>Temporizador de Discussão</SectionTitle>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 9px' }}>
              <div style={{ textAlign: 'center', fontFamily: "'Courier Prime', monospace", fontSize: '1.9rem', fontWeight: 'bold', letterSpacing: 4, color: timerSec <= 30 && timerSec > 0 ? C.orange : C.ink, animation: timerSec <= 30 && timerSec > 0 ? 'blink 1s infinite' : 'none', marginBottom: 7 }}>
                {fmt(timerSec)}
              </div>
              <div style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
                {[[120, '2 min'], [180, '3 min'], [300, '5 min']].map(([s, l]) => (
                  <button key={s} onClick={() => setTimer(s)} style={{ flex: 1, background: timerDefault === s ? C.purple : C.paper, color: timerDefault === s ? 'white' : C.ink, border: `1px solid ${timerDefault === s ? C.purple : C.border}`, borderRadius: 4, fontFamily: "'Courier Prime', monospace", fontSize: '0.65rem', cursor: 'pointer', padding: '4px 0' }}>{l}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                <button onClick={startTimer} disabled={timerRunning} style={{ flex: 1, background: timerRunning ? '#aaa' : C.green, color: 'white', border: `1px solid ${C.ink}`, borderRadius: 4, fontFamily: "'Courier Prime', monospace", fontSize: '0.65rem', cursor: timerRunning ? 'not-allowed' : 'pointer', padding: '4px 0' }}>▶ Iniciar</button>
                <button onClick={() => resetTimer(timerDefault)} style={{ flex: 1, background: C.paper, border: `1px solid ${C.border}`, borderRadius: 4, fontFamily: "'Courier Prime', monospace", fontSize: '0.65rem', cursor: 'pointer', padding: '4px 0', color: C.ink }}>↺ Reset</button>
              </div>
            </div>
          </>
        )}

        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.72rem', color: C.inkLight, padding: '7px 9px', background: C.bg, borderRadius: 6, border: `1px solid ${C.border}`, lineHeight: 1.5 }}>
          <strong style={{ color: C.purple }}>{teams[turn].name}</strong><br />
          {rolled ? 'Aguardar próximo turno' : 'Lançar o dado'}
        </div>

        <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.6rem', color: C.inkLight, padding: '7px 9px', background: C.bg, borderRadius: 6, border: `1px solid ${C.border}`, lineHeight: 1.55 }}>
          <strong style={{ color: C.ink, display: 'block', marginBottom: 3 }}>Regras rápidas</strong>
          ⚖️ DILEMA — todos discutem<br />
          📋 TIRA CARTA — lê e avança<br />
          💭 REFLETE — verso do dilema<br />
          🪜 5→7 e 10→13 — sobe<br />
          🎿 11→2 e 15→8 — desce
        </div>
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(44,24,16,0.55)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: C.paper, border: `3px solid ${C.ink}`, borderRadius: 10, padding: 26, maxWidth: 420, width: '100%', boxShadow: `6px 6px 0 ${C.ink}` }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: C.purple, textAlign: 'center', marginBottom: 10 }}>{modal.title}</div>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.82rem', color: C.ink, textAlign: 'center', lineHeight: 1.7, marginBottom: 18, whiteSpace: 'pre-line' }}>{modal.body}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {modal.onClose && (
                <button onClick={() => setModal(null)} style={{ flex: 1, background: C.paper, color: C.inkLight, border: `2px solid ${C.border}`, padding: '9px 0', fontFamily: "'Special Elite', cursive", fontSize: '0.85rem', letterSpacing: 1, cursor: 'pointer', borderRadius: 4 }}>
                  Cancelar
                </button>
              )}
              <button onClick={closeModal} style={{ flex: 2, background: C.purple, color: 'white', border: `2px solid ${C.ink}`, padding: '9px 0', fontFamily: "'Special Elite', cursive", fontSize: '0.88rem', letterSpacing: 1, cursor: 'pointer', borderRadius: 4, boxShadow: `3px 3px 0 ${C.ink}` }}>
                {modal.onClose ? 'Confirmar' : 'Continuar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
