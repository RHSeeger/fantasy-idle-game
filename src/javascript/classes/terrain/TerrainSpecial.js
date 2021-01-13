/**
 * Terrain Specials - special things that can exist on a terrain instance
 *
 * Some Terrain Specials are created when the game starts.
 * For example, a player's city may be created with the "Wild Life" Terrain Special attached to it.
 *
 * Other Specials are created when an Encounter is cleared.
 *     For example, When a "Life Node" Encounter is cleared, it leaves behind a "Life Node" Terrain Special
 * Not all Encounters leave behind Terrain Specials.
 *     For example, when a "Lair" Encounter is cleared, the player gets loot, but then it disappears
 *
 * Node (Encounter) -> Node (Terrain Special)
 *     Provides mana once cleared, more if in the player's city's area
 *     When cleared, generally provide mana, spell, or spellbook
 * Wizard Tower (Encounter) -> Wizard Tower (Terrain Special)
 *     Allows transition to other worlds (once cleared)?
 *     When cleared, generally provide mana, spell, or spellbook
 * Adventure (Encounter) -> <nothing>
 *     A location that only exists to be cleared. Lair, Ruins, etc
 *     Once cleared, ceases to exist
 *     When cleared, generally provides gold, spell, or ... possibly item if those get implemented
 * Mineral (Terrain Special)
 *     A source of some resource or the like. Wild Life (food), Gold Ore (gold), etc
 *     Never needs to be cleared
 *
 * An Encounter is the wrapper around a Terrain Special, and provides for some details, like what type of loot can drop
 * from that adventure (for example, 10-100 gold).
 * An Event is a specific instance of the encounter, which contains the actual details for it (like the power level, actual
 * amount of loot, etc)
 *
 * The Terrain Special of Life Node is the type of special, not a specific instance of it.
 * As such, if there's a Terrain Special of a Life Node attached to a user's city, then that's all the information there is.
 * There's no level, power, loot, or detais attached to a given Terrain Special.
 * That information can be attached to the Encounter but, once the Encounter is cleared, that information is gone.
 *
 * For example:
 *   If there is a "Wild Life" Terrain Special near the user's city, then the city generates 2 extra food. There's
 *   no instance of "a" "Wild Life" to store how much food it generates. Similarly, all Nodes generate the same amount
 *   of mana, etc.
 *
 */
export default class TerrainSpecial {
    constructor({displayName = '', description = ''} = {}) {
        this.displayName = displayName;
        this.description = description;
    }
}
