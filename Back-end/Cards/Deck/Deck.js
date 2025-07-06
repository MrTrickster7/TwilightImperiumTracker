

// export class Deck {
//     constructor(Cards_Obj) {
//         this.Cards_Obj = Cards_Obj;
//         this.Cards = Object.keys(this.Cards_Obj);
//         this.Discard_Pile = [];
//         this.Shuffle();
//     }

//     Shuffle() {
//         for (let i = this.Cards.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [this.Cards[i], this.Cards[j]] = [this.Cards[j], this.Cards[i]]; // Swap elements
//         }
//     }

//     Draw_Card() {
//         const Key = this.Cards.shift();
//         this.Discard_Pile.push(Key);
//         return Key;
//         // return this.Cards_Obj[Key];
//     }

//     Draw_Card_Non_Remove() { 
//         let key = this.Cards.slice(1);
//         return key;
//         // return this.Cards_Obj[this.Cards.slice(1)];
//     }

//     Pick_One_Of_Any() {
//         let All_Cards = this.Cards + this.Discard_Pile;
//         for (let i = All_Cards.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [All_Cards[i], All_Cards[j]] = [All_Cards[j], All_Cards[i]]; // Swap elements
//         }
//         let Key = All_Cards.slice(1);
//         return Key;
//         // return this.Cards_Obj[All_Cards.slice(1)];
//     }
// }

// Hade Grok comment this for me
export class Deck {
    constructor(Cards_Obj) {
        this.Cards_Obj = Cards_Obj; // Store the card object
        this.Cards = Object.keys(this.Cards_Obj); // Array of card keys
        this.Discard_Pile = []; // Array for discarded card keys
        this.Shuffle(); // Shuffle cards on initialization
    }

    // Shuffle the Cards array using Fisher-Yates algorithm
    Shuffle() {
        for (let i = this.Cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.Cards[i], this.Cards[j]] = [this.Cards[j], this.Cards[i]]; // Swap elements
        }
    }

    // Draw and remove the top card from Cards, add to Discard_Pile
    Draw_Card() {
        if (this.Cards.length === 0) return null; // Handle empty deck
        const Key = this.Cards.shift(); // Remove first card
        this.Discard_Pile.push(Key); // Add to discard pile
        return Key; // Return the card key
        // Optionally: return this.Cards_Obj[Key]; // Return card object
    }

    // Return a copy of the top card without removing it
    Draw_Card_Non_Remove() {
        if (this.Cards.length === 0) return null; // Handle empty deck
        return this.Cards[0]; // Return first card key without removing
        // Optionally: return this.Cards_Obj[this.Cards[0]]; // Return card object
    }

    // Pick a random card key from all cards (Cards + Discard_Pile) without modifying arrays
    Pick_One_Of_Any() {
        const All_Cards = [...this.Cards, ...this.Discard_Pile]; // Combine arrays
        if (All_Cards.length === 0) return null; // Handle empty pool
        const randomIndex = Math.floor(Math.random() * All_Cards.length); // Random index
        return All_Cards[randomIndex]; // Return random card key
        // Optionally: return this.Cards_Obj[All_Cards[randomIndex]]; // Return card object
    }
}