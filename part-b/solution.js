// Problem 1 - Deep Equal

function deepEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (
        typeof objA !== "object" ||
        objA === null ||
        typeof objB !== "object" ||
        objB === null
    ) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (const key of keysA) {
        if (!Object.hasOwn(objB, key)) {
            return false;
        }

        if (!deepEqual(objA[key], objB[key])) {
            return false;
        }
    }

    return true;
}


// Problem 2 - Object Diff

function diffObjects(oldObj, newObj) {
    const added = {};
    const removed = {};
    const changed = {};

    for (const key of Object.keys(newObj)) {
        if (!Object.hasOwn(oldObj, key)) {
            added[key] = newObj[key];
        } else if (oldObj[key] !== newObj[key]) {
            changed[key] = {
                from: oldObj[key],
                to: newObj[key]
            };
        }
    }

    for (const key of Object.keys(oldObj)) {
        if (!Object.hasOwn(newObj, key)) {
            removed[key] = oldObj[key];
        }
    }

    return {
        added,
        removed,
        changed
    };
}


// Problem 3 - Deep Freeze

function deepFreeze(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    for (const value of Object.values(obj)) {
        deepFreeze(value);
    }

    return Object.freeze(obj);
}


// Problem 4 - Private Counter Factory

function createCounter() {
    let count = 0;

    return {
        increment() {
            count++;
        },

        decrement() {
            count--;
        },

        get value() {
            return count;
        }
    };
}


// Problem 5 - Schema Validator

function validateSchema(obj, schema) {
    const errors = [];

    for (const [key, expectedType] of Object.entries(schema)) {
        if (!Object.hasOwn(obj, key)) {
            errors.push(`${key}: missing property`);
            continue;
        }

        const actualType = typeof obj[key];

        if (actualType !== expectedType) {
            errors.push(
                `${key}: expected ${expectedType}, got ${actualType}`
            );
        }
    }

    return errors;
}
