# Things To Do / Top Level Design



## Combat / Units

1. The number of combat units a player has is based on which combat unit buildings they have.
For example, lets say a player has a base of 1 combat unit. Then they add a Barracks building,
which increases their unit count to 2.

2. The player doesn't actually construct/train combat units. Instead, they always have the maximum
amount allowed (by buildings, etc).

3. The player doesn't control their combat units. Instead, each unit (maybe beyond the first, which is
considered to be guarding the city) automatically "explores" the land and can encounter things (like
foreign cities, lairs, etc).

4. Some encounters, depending on level, can require the player have a certain level of units. Or maybe
units of a certain power level?

5. Combat units gain can gain more power based on buildings the player has. For example, having a War College
might add 1 power level to units. Other things, like spells, might also add power levels (which can be
temporary because power level is common to all units, they don't "level up")

6. Constructing Unit projects (such as Swordsman, Spearmen, etc) will grant <things> to all units. For example,
constructing the Rangers unit might up the chance that each unit encounters something each turn (to represent
the fact that they can travel further)

7. Having some races (as primary or secondary) can impact units. For example, having trolls might grant all
units slightly faster healing.

8. When a unit encounters something, it can take damage (up to it's max health if it loses?), and it will not
explore anymore until it heals to full.

9. There should be an easy/quick way to see the status (damage taken, etc) of each unit. Maybe have a box
that shows the unit, a bar for it's remaining health, etc.



## UI

1. Add a progression bar for the current project being worked on.

2. Add a "log" window that lets the user know when things happen.

3. Each project should have a short "tooltip" description that says what it is, and the a longer "full"
description that actually describes what effect it has on the game.

4. There should be a way to see what projects have been completed. For Building projects, this is
the Buildings area on the main window. The player should be able to see what the project does
after completing it. For example, mousing over a building could show the short description, maybe
with a "more" option to display the full description.

5. Implement tooltip popups

## Buildings

1. When the user has _some_ of the dependencies for a project, but not all, show it in the list,
but A) give a visual indication that it can't be built yet, and B) disable the add-to-queue buttons

2. Allow for displaying A) only buildings that can be built right now, or B) buildings that the user
has some (but not all of) the dependencies for, or C) all buildings. Settings option?

3. When a new project is completed, update the Allows section for the current selected project
