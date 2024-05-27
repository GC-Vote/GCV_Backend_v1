class CustomLogger {
    log(...args) {
        console.log(...args);
    }

    info(...args) {
        console.info(...args);
    }

    error(...args) {
        console.error(...args);
    }

    group(...args) {
        console.group(...args);
    }

    groupEnd(...args) {
        console.groupEnd();
    }
}

export const Logger = new CustomLogger();