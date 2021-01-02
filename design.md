# Design Philosophy

The underlying idea is to create a idle-influenced game based on Master of Magic. 
- Buildings and the like should have the same names and similar function (ie, a granary should improve food and 
  population).
- Races should be the same and provide similar benefits, with the understanding that this won't translate perfectly.
- There will be the ability to conquer other cities. Doing so will let you take over the city and, if applicable, bring 
  new races into the empire 
- There will be heroes, but what role they fill is unknown. Expect both bolstering armies and missions of some sort.
- There will be armies of some sort, but it should be vague so the user doesn't need to really "control" them. 

It should be possible to leave the game idle without negative consequences, preferably with the world progressing 
forward (work, growth, etc). 
- It shouldn't be possible to come back to the computer and find out your population was killed off by an opposing army
- It's not unreasonable to come back and find out that some of your population are rebelling (not generating anything) 
  because you raised taxes before you left.

The game should not require micro-management. While it would be nice to be able to control things at a deeper level
should you wish to, it shouldn't be required. At worst, it should be fun to play the game only deciding what buildings
to construct, what general level of resources to apply to a high level setting (ie, amount of workers farming vs 
producing), and the like.

Controlling the settings for lots of cities seems like it would be annoying, so maybe something like
- There is one primary city, that is of the primary race. Perhaps it gets bonuses for other races brought into the empire.
  That city is the one the user controls (buildings, workers, etc).
- There are multiple sub-cities. Each such sub-city has one race (presumably based on the race it was conquered from, 
  at least until the idea of forming new ones manually is added).
  

Don't currently expect there to be graphics out the door, but it would be nice to have a view of the main city. 

----

# Turn

## Ordering Complexities

1. Some things need to happen in a certain order so that the player is not penalized
2. Food generation , Gold generation (from generators like buildings, production, etc)
3. Population growth - which can rely on excess food generated
4. Selling excess food for gold
5. Paying maintenance costs - things that use gold. Are there any of these?
6. Construction - buildings, etc

The general rules are
1. We want to generate all resources possible before spending any, so that the player does not "run out"
   of the resource (like gold) because we paid a bill before collecting on something that generates.
2. Before we modify the number of an asset we have (like switching a population unit from production to mandatory
   farming), we need to calculate any resource/asset changes by that asset (for example, the population unit
   have generated a production point before being switched to be a mandatory farmer)

Alternatively, we can consider that things can happen in any order, but keep track of the effects separately from
the current values. We would need to verify at the end to make sure we didn't go negative where we shouldn't
(ie, negative gold). If we did, do we need to know _what_ caused us to go negative? To report it to the user? Or do we
just act on it
- What is the repercussion of negative gold?
- Is there ever a case where a lack of gold will change something like production? Ie, only build this asset
  if we have enough gold for it, otherwise "stall" it's production.

We could keep a separate structure to hold changes to resources/assets, and only merge the outcomes at the end. Or
we could keep the original values, copy + modify, and then switch to using the modified copy. That way we have the
original around for any calculations. This seems like a reasonable approach.

Hm. We don't actually have a "current food" statistic. We figure out how much was generated and act on that, and any
excess is sold off. There's no actual "amount" of food we currently have.

## Turn Steps



1. Calculate additions to resources (ex. food) by current assets/system (ex. population)
1.1. Food generation
1.2. Gold generation - from

2. Calculate
2. Calculate changes to current assets (ex. population) based on assets/system (ex. population growth)
2.1. Population growth
2.2. Building construction

4. Calculate minimum requirements for updated assets (ex. mandatory farmers for food for population)

