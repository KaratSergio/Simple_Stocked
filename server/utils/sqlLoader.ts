import fs from "fs";
import path from "path";

// Cache for production / non - local environments
const cache: Record<string, string> = {};

/**
 *  Loads a SQL file.
 * - In local: always reads from disk (hot reload)
 * - In other environments: reads once and takes from cache
 * 
 * @param basePath - base folder with SQL
 * @param name - SQL file name
 */
export function loadQuery(basePath: string, name: string) {
    const filePath = path.join(basePath, name);

    // Hot reload в local
    if ((process.env.NODE_ENV as string) === "local") {
        console.log(`[SQL Loader] Hot reload: ${name}`);
        return fs.readFileSync(filePath, "utf8");
    }

    // Caching for other environments
    if (!cache[filePath]) {
        console.log(`[SQL Loader] Cache load: ${name}`);
        cache[filePath] = fs.readFileSync(filePath, "utf8");
    }

    return cache[filePath];
}
