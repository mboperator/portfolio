export class VideoMonitor {
  video: HTMLVideoElement;
  listener?: (currentTime: number) => void
  monitor?: NodeJS.Timeout

  constructor(node: HTMLVideoElement) {
    this.video = node;
  }

  startMonitoring() {
    this.monitor = setInterval(() => {
      console.info(this.video.currentTime);
      if (this.listener) {
        this.listener(this.video.currentTime);
      }
    }, 100)
  }

  stopMonitoring() {
    clearInterval(this.monitor);
  }

  start() {
    this.video.addEventListener('play', () => this.startMonitoring());
    this.video.addEventListener('pause', () => this.stopMonitoring());
    this.video.addEventListener('stop', () => this.stopMonitoring());
  }

  stop() {
    this.video.removeEventListener('play', () => this.startMonitoring());
    this.video.removeEventListener('pause', () => this.stopMonitoring());
    this.video.removeEventListener('ended', () => this.stopMonitoring());
  }

  on(listener: (currentTime: number) => void) {
    this.listener = listener;
  }

}
