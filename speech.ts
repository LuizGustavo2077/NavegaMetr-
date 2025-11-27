// Wrapper simples do Web Speech API (fallbacks)
export const Speech = {
  startRecognition: (onResult: (text:string)=>void, onEnd?: ()=>void) => {
    const anyWin = window as any;
    const SpeechRecognition = anyWin.SpeechRecognition || anyWin.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Reconhecimento de voz não suportado neste navegador.');
      return { stop: () => {} };
    }
    const rec = new SpeechRecognition();
    rec.lang = 'pt-BR';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (ev: any) => {
      const txt = ev.results[0][0].transcript;
      onResult(txt);
    };
    rec.onerror = (e: any) => console.error('speech error', e);
    rec.onend = () => { if (onEnd) onEnd(); };
    rec.start();
    return { stop: () => rec.stop() };
  }
};
