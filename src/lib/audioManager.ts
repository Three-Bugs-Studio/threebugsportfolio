// Web Audio API Retro Sound Synthesizer & Ambient Manager
class AudioManager {
  private ctx: AudioContext | null = null;
  private humOscillator: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  private isHumPlaying = false;
  private isSfxEnabled = true;

  constructor() {
    // Read initial preference from localStorage or default to enabled
    if (typeof window !== "undefined") {
      this.isSfxEnabled = localStorage.getItem("three_bugs_sfx_enabled") !== "false";
      const savedHum = localStorage.getItem("three_bugs_hum_enabled") === "true";
      
      // We start hum if user previously enabled it, but wait for first interaction
      if (savedHum) {
        const startOnInteract = () => {
          this.toggleHum(true);
          window.removeEventListener("click", startOnInteract);
          window.removeEventListener("keydown", startOnInteract);
        };
        window.addEventListener("click", startOnInteract, { once: true });
        window.addEventListener("keydown", startOnInteract, { once: true });
      }
    }
  }

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private updateScrollHum = () => {
    if (!this.ctx || !this.humGain || !this.isHumPlaying) return;
    try {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0;
      
      // Smoothly fade from a very subtle quiet base level to a full rich hum
      const minGain = 0.001;
      const maxGain = 0.024;
      const targetGain = minGain + (maxGain - minGain) * scrollFraction;
      
      this.humGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    } catch (e) {}
  };

  // Deep, soothing low-frequency studio/transformer hum (55Hz + 110Hz modulated)
  public toggleHum(forceState?: boolean) {
    this.initContext();
    const targetState = forceState !== undefined ? forceState : !this.isHumPlaying;

    if (targetState === this.isHumPlaying) return targetState;

    if (targetState) {
      try {
        if (!this.ctx) return false;

        // Gain node to smoothly fade hum in/out
        this.humGain = this.ctx.createGain();
        this.humGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.humGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.1); // start quiet

        // Core 55Hz hum (A1 note)
        this.humOscillator = this.ctx.createOscillator();
        this.humOscillator.type = "sine";
        this.humOscillator.frequency.setValueAtTime(55, this.ctx.currentTime);

        // Gentle sub harmonic at 110Hz
        const harmonic = this.ctx.createOscillator();
        harmonic.type = "triangle";
        harmonic.frequency.setValueAtTime(110, this.ctx.currentTime);
        
        const harmonicGain = this.ctx.createGain();
        harmonicGain.gain.setValueAtTime(0.004, this.ctx.currentTime);

        // Lowpass filter to keep it deep and warm
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(120, this.ctx.currentTime);

        // Connect everything
        this.humOscillator.connect(filter);
        harmonic.connect(harmonicGain);
        harmonicGain.connect(filter);
        filter.connect(this.humGain);
        this.humGain.connect(this.ctx.destination);

        // Start oscillators
        this.humOscillator.start();
        harmonic.start();

        // Save reference to stop later (we stop harmonic with oscillator since they play together)
        const originalStop = this.humOscillator.stop.bind(this.humOscillator);
        this.humOscillator.stop = () => {
          originalStop();
          try { harmonic.stop(); } catch (e) {}
        };

        this.isHumPlaying = true;
        localStorage.setItem("three_bugs_hum_enabled", "true");

        // Set initial volume based on current scroll position and listen to scroll events
        this.updateScrollHum();
        window.addEventListener("scroll", this.updateScrollHum, { passive: true });
      } catch (e) {
        console.error("Failed to start hum synthesizer:", e);
      }
    } else {
      window.removeEventListener("scroll", this.updateScrollHum);
      if (this.humGain && this.ctx) {
        this.humGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
        const osc = this.humOscillator;
        setTimeout(() => {
          try {
            if (osc) osc.stop();
          } catch (e) {}
        }, 800);
      }
      this.humOscillator = null;
      this.humGain = null;
      this.isHumPlaying = false;
      localStorage.setItem("three_bugs_hum_enabled", "false");
    }

    // Trigger custom event so console/UI can sync
    window.dispatchEvent(new CustomEvent("three_bugs_audio_update"));
    return this.isHumPlaying;
  }

  // Crisp synthesized mechanical switch typing/clicking sound
  public playClick() {
    if (!this.isSfxEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Noise buffer for the 'click' transients
      const bufferSize = this.ctx.sampleRate * 0.015; // 15ms duration
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      // Filter to shape click tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2800 + Math.random() * 400, now); // randomized pitch for keyboard variance
      filter.Q.setValueAtTime(12, now);

      // Volume envelope (extremely snappy attack & decay)
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.04, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

      noiseNode.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      noiseNode.start(now);
    } catch (e) {
      // Audio context might be restricted initially
    }
  }

  // Play deep tactile press-down click
  public playPress() {
    if (!this.isSfxEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Snappy metallic bell tone for deep UI press down
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140 + Math.random() * 20, now);

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // Play a gorgeous, high-end cinematic filter sweep for transitions
  public playSweep() {
    if (!this.isSfxEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 0.8;

      // Cinematic low-frequency sine-to-triangle oscillator sweep
      const osc = this.ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + duration);

      // Lowpass filter sweeping in sync to create that smooth deep glide
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(100, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + duration);
      filter.Q.setValueAtTime(3, now);

      // Gain Envelope
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.15); // fade in
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration); // fade out smoothly

      // Connection
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {}
  }

  // Play a specific, unique low-fidelity 'sector activation' sound
  // Designed with a quick dual-frequency low-fi beep and bit-crush-like frequency step
  public playSectorActivation() {
    if (!this.isSfxEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 0.5;

      // Create a nice lo-fi retro computer tone: starting with a lower drone and jumping up
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();

      osc1.type = "square"; // raw square wave for lo-fi character
      osc2.type = "triangle"; // softer triangle wave

      // Base frequencies with digital pitch stepping
      osc1.frequency.setValueAtTime(220, now); // A3
      osc1.frequency.setValueAtTime(440, now + 0.12); // octave jump
      osc1.frequency.setValueAtTime(880, now + 0.24); // secondary octave jump

      osc2.frequency.setValueAtTime(110, now);
      osc2.frequency.exponentialRampToValueAtTime(165, now + duration);

      // Lowpass and Bandpass filters to make it sound vintage and low-fidelity (warm, slightly muffled, bandwidth limited)
      const lpFilter = this.ctx.createBiquadFilter();
      lpFilter.type = "lowpass";
      lpFilter.frequency.setValueAtTime(1100, now);

      const bpFilter = this.ctx.createBiquadFilter();
      bpFilter.type = "bandpass";
      bpFilter.frequency.setValueAtTime(750, now);
      bpFilter.Q.setValueAtTime(3.5, now);

      // Gain Node for envelopes
      const gain1 = this.ctx.createGain();
      gain1.gain.setValueAtTime(0.015, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0.025, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Connect everything
      osc1.connect(bpFilter);
      bpFilter.connect(gain1);
      gain1.connect(this.ctx.destination);

      osc2.connect(lpFilter);
      lpFilter.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + duration);

      osc2.start(now);
      osc2.stop(now + duration);
    } catch (e) {}
  }

  public toggleSfx(forceState?: boolean) {
    this.isSfxEnabled = forceState !== undefined ? forceState : !this.isSfxEnabled;
    localStorage.setItem("three_bugs_sfx_enabled", this.isSfxEnabled ? "true" : "false");
    window.dispatchEvent(new CustomEvent("three_bugs_audio_update"));
    return this.isSfxEnabled;
  }

  public getStatus() {
    return {
      hum: this.isHumPlaying,
      sfx: this.isSfxEnabled
    };
  }
}

export const audioManager = new AudioManager();
