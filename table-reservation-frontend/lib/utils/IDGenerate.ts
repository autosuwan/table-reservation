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