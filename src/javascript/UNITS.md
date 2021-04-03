## Writeup of Units and the things that impact them

All towns have 1 unit by default, and this unit does not adventure... it is considered the defender of the town.


### Miscellaneous Unit Info

The town unit can have certain "adventures", which will count as the town being attacked

While the town unit is damaged, no production happens in the town (kind of like it's considered town damage)

Unit production doesn't actually produce units. Instead, it produces an "enhancement" that applies to all
units

Still not sure how we want to handle fantastic units

Unit Level
- Recruit
- Regular / +1 attack power, +1 resist
- Veteran / +1 attack power, +1 defense, +2 resist
- Elite / +2 attack power, +10% to hit, +1 defense, +3 resist, +1 health
- Ultra-Elite[1] / +2 attack power, +20% to hit, +2 defense, +4 resist, +1 health
- Champion[2] / +3 attack power, +30% to hit, +2 defense, +4 resist, +2 health

[1] To achieve this level, either the Warlord Retort or the Crusade spell must be in play.

[2] To achieve this level, both the Warlord Retort and the Crusade spell must be in play simultaneously.


### Units Researched Effects on Units


### Building Effects on Units

Notes probably include the actual MoM bonus for the thing

Alchemist's Guild => Magic Weapons
    +10% to hit
    counts as magical, so no +def for immunity to non-magical weapons
Alchemist's Guild + Mithril => Mithril Weapons
    +10% to hit
    +1 to attack strength (melee, ranged, and thrown)
    +1 defense (for armour)
    counts as magical
Alchemist's Guild + Adamantium => Adamantium Weapons
    +10% to hit
    +2 to attack strength
    +2 to defense
    counts as magical

Animist's Guild
    Faster healing in town
    This will only actually effect the one unit stationed in town

Armorer's Guild
    Needed for War College
    Allows building Berserkers, Elven Lords, Minotaurs and Golem
    With Stables, allows Stag Beetle, the Dragon Turtle, and the War Mammoths
    With Cathedral, allows Paladins

Armory
    Halberdiers

Barracks
    With Smithy - Swordsmen
    With Sawmill - Bowmen, Longbowmen (which is race dependant)
    With Stables - Cavalry, Wolf Riders, Horsebowmen, Centaurs, Doom Drake (race dependant)
    With Animist's Guild - Rangers, Manticores (race)

Builder's Hall
    Engineers

Fantastic Stable

Fighter's Guild
    Pikemen

Maritime Guild
    Warship

Mechinician's Guild
    Catapult

Miner's Guild
    Steam Cannon

Parthenon
    Priests

Shipwrights' Guild
    Triremes

Ship Yard
    Galley or Air Ship (race)

Shrine
    Shaman

War College

Wizards' Guild
    Magicians or Warlocks (race)



Buildings - first thoughts
- Barracks - +1 max units, required for all other unit buildings?
- Armory - +1 level
- Armorer's Guild  - +1 level
- Fighter's Guild - +1 max units
- War College - +1 max units, +1 level

Or maybe each building (except barracks) gives +1 units, +1 level

Level starts at 1
Each level gives
  + 1 attack (all) / 2 levels
  + 1 resist / level
  + 1 defense / 3 levels
  + 10% to hit / 3 levels
  + 1 health / 3 levels


Units         figures | attack | ranged | magic | defense | health | resist | notes
- Spearmen    8       | 1      | -      | -     | 2       | 1      | 4      | base unit
- Swordsmen   6       | 3      | -      | -     | 2       | 1      | 4      | +2 def vs ranged, thrown, breath due to Large Shield ability
- Halberdiers 6       | 4      | -      | -     | 3       | 1      | 4      | Some variants have Negate First Strike
- Pikemen     8       | 5      | -      | -     | 3       | 1      | 5      | Negate First Strike, Armor Piercing
- Cavalry     4       | 4      | -      | -     | 2       | 3      | 3      | First Strike, Move 2
- Bowmen      6       | 1      | 1x8    | -     | 1       | 4      | 4      |
- Shamans     4       | 2      | -      | 2x4   | 3       | 1      | 6      | Increase ooc per turn healing of units, Purify Land
- Priests     4       | 3      | -      | 4x4   | 4       | 1      | 7      | In combat healing, ooc per turn healing, Purify Land
- Magicians   4       | 1      | -      | 5x4   | 3       | 1      | 8      | Missile Immunity, Fireball AOE 1/battle
- Engineers   6       | 1      | -      | -     | 1       | 1      | 4      | Roads, Wall Crusher (50% change, allow walking units to move through walls)

Constructed Units
- Trireme     -       | -      | -      | -     | -       | -      | -      |
- Galley      -       | -      | -      | -     | -       | -      | -      |
- Warship     -       | -      | -      | -     | -       | -      | -      | Unlimited ranged attacks, Long range (less ranged hit penalty)
- Catapult    -       | -      | -      | -     | -       | -      | -      | Long Range, Wall Crusher

Ranged XxY == X strength, can be used up to Y times

- Spearmen    | base unit, so no benefit for researching it
- Swordsmen   | +2 def vs ranged, breath, thrown
- Halberdiers | maybe negate first strike
- Pikemen     | negate first strike, armor piercing
- Cavalry     | first strike, +move
- Bowmen      | ranged
- Shamans     | ranged, ooc healing
- Priests     | ranged, healing, ooc healing
- Magicians   | missile immunity (maybe +def or -dam from missiles?), aoe attack
- Engineers   | roads? not sure what to do with those, wall crusher

Constructed Units
- Trireme     | need to figure out something for ships
- Galley      |
- Warship     |
- Catapult    | wall crusher
