export class Logger {

  constructor(private prefix?: string) { }

  log(...messages: any[]) { console.log(`${this.prefix}: ${messages}`); }

  info(...messages: any[]) { console.info(`${this.prefix}: ${messages}`); }

  warn(...messages: any[]) { console.warn(`${this.prefix}: ${messages}`); }

  error(...messages: any[]) { console.error(`${this.prefix}: ${messages}`); }
}