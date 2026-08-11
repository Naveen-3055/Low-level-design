interface ConfigSource {
    loadValue(key: string): string | null;
}

class FileConfigSource implements ConfigSource {
    private config: Map<string, string>;

    constructor(config: Map<string, string>) {
        this.config = config;
    }

    loadValue(key: string): string | null {
        return this.config.get(key) ?? null;
    }
}

// class EnvConfigSource implements ConfigSource {
//     loadValue(key: string): string | null {
//         // return process.env[key.replace(/\./g, "_").toUpperCase()] ?? null;
//     }
// }

class DefaultConfigSource implements ConfigSource {
    private defaults: Map<string, string>;

    constructor(defaults: Map<string, string>) {
        this.defaults = defaults;
    }

    loadValue(key: string): string | null {
        return this.defaults.get(key) ?? null;
    }
}

class ConfigLoader {
    private sources: ConfigSource[];

    constructor(sources: ConfigSource[]) {
        this.sources = sources;
    }

    get(key: string): string | null {
        for (const source of this.sources) {
            const value = source.loadValue(key);
            if (value !== null && value !== "") {
                return value;
            }
        }
        return null;
    }
}

const fileConfig = new Map([
    ["db.host", "localhost"],
    ["db.port", "5432"],
]);
const defaults = new Map([
    ["db.host", "127.0.0.1"],
    ["db.port", "3306"],
    ["db.timeout", "30"],
]);

const loader = new ConfigLoader([
    new FileConfigSource(fileConfig),
    // new EnvConfigSource(),
    new DefaultConfigSource(defaults),
]);

console.log(`db.host = ${loader.get("db.host")}`);
console.log(`db.port = ${loader.get("db.port")}`);
console.log(`db.timeout = ${loader.get("db.timeout")}`);

export { ConfigLoader, FileConfigSource, DefaultConfigSource };