export default class CacheService {
    constructor(name) {
        this.name = name;
    }

    /*
    todo
     */

    save(key, value) {
        console.log(`${this.name}: saving ${key}: ${value}`);
    }

    load(key) {
        console.log(`${this.name}: loading ${key}`);
    }
}