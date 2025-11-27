export const TTS = {
  speak: (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('TTS não suportado');
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  },
  stop: () => speechSynthesis.cancel()
};
