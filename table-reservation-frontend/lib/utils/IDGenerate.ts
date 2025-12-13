/**
 * Generate queue ID in format: A1, A2, ..., A9, B1, B2, ..., Z9
 * The ID will cycle back to A1 after Z9 or when manually reset by the restaurant
 * 
 * @param currentQueueLength - The current number of queues in the system
 * @returns Queue ID in format like "A1", "B5", etc.
 */
export function generateQueueID(currentQueueLength: number): string {
    // Calculate letter (A-Z) and number (1-9)
    // Each letter has 9 numbers (1-9), so we divide by 9
    const letterIndex = Math.floor(currentQueueLength / 9) % 26; // Cycle through A-Z
    const numberPart = (currentQueueLength % 9) + 1; // 1-9

    // Convert index to letter (A=0, B=1, ..., Z=25)
    const letter = String.fromCharCode(65 + letterIndex); // 65 is ASCII for 'A'

    return `${letter}${numberPart}`;
}

/**
 * Parse queue ID back to its numeric position
 * Useful for sorting or validation
 * 
 * @param queueID - Queue ID like "A1", "B5"
 * @returns Numeric position (0-based)
 */
export function parseQueueID(queueID: string): number {
    if (!queueID || queueID.length < 2) {
        throw new Error("Invalid queue ID format");
    }

    const letter = queueID.charAt(0).toUpperCase();
    const number = parseInt(queueID.substring(1), 10);

    if (letter < 'A' || letter > 'Z' || isNaN(number) || number < 1 || number > 9) {
        throw new Error("Invalid queue ID format");
    }

    const letterIndex = letter.charCodeAt(0) - 65; // A=0, B=1, etc.
    const position = letterIndex * 9 + (number - 1);

    return position;
}

/**
 * Get the next queue ID based on the current ID
 * 
 * @param currentID - Current queue ID like "A1"
 * @returns Next queue ID like "A2"
 */
export function getNextQueueID(currentID: string): string {
    const currentPosition = parseQueueID(currentID);
    return generateQueueID(currentPosition + 1);
}

/**
 * Validate if a queue ID is in the correct format
 * 
 * @param queueID - Queue ID to validate
 * @returns true if valid, false otherwise
 */
export function isValidQueueID(queueID: string): boolean {
    if (!queueID || queueID.length < 2) {
        return false;
    }

    const letter = queueID.charAt(0).toUpperCase();
    const number = parseInt(queueID.substring(1), 10);

    return letter >= 'A' && letter <= 'Z' && number >= 1 && number <= 9;
}
