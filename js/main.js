// ============================================================
//  SPECIAL DELIVERY — a playable portfolio by Kingshuk Dholakia
//  World: Three.js  ·  Models: Kenney (CC0) retinted to palette
// ============================================================
import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/shaders/FXAAShader.js';

// ---------- Palette: "Postcard Afternoon" ----------
const PAL = {
  skyTop:    0x66bde6, skyBottom: 0xd9f0e8,
  sun:       0xfff6e2, ambient:   0xb7dde2,
  grass:     0x8cc48c, grassDeep: 0x568f66,
  cliff:     0x647a87, cliffDeep: 0x4b5766,
  sand:      0xe8e3cf, water:     0x75bdc3, waterDeep:0x468c92,
  path:      0xd8d2b6, ember:     0xff8a3c,
  fog:       0xafe7eb,
};
// Messenger-informed grade targets: cool-dominant, warm reserved for accents
const GRADE_PALETTE = ['#c25959','#f3c258','#8cc48c','#568f66','#4f755a','#75b9b5',
  '#6facb2','#468c92','#647a87','#4b5766','#f5fdff','#ece7d6','#8a8478','#3a4448',
  '#de794e','#b8b2a6'].map(h=>new THREE.Color(h));

// Gentle global grade applied to every imported material
const HUE_SHIFT = 0.015, SAT_MUL = 1.08, LIGHT_MUL = 1.04;

// ---------- Delivery content ----------
const GH = 'https://github.com/KingshukD7';
const LI = 'https://www.linkedin.com/in/kingshuk-dholakia/';
const DELIVERIES = {
  cafe: {
    npc:'Pip', role:'the barista', building:'Cinnamon Café', stamp:null,
    tint:0xd97b52, npcTint:{cloth:0xd97b52, accent:0xf6eddb},
    dialog:[
 "Oh! The new courier! I've been waiting all morning, is that for me?",
      "It's from the old crew… we shipped something big together back at UTS.",
      "Go on, open it with me. I want to see their handwriting."
    ],
    letter:{
 title:'Spectrum Ops: Rescue Mission', sub:'Team led Unity action game · UTS Games Showcase',
      body:[
 "Dear Pip, remember the rescue mission? Kingshuk led our three person team all the way from first greybox to the UTS Games Showcase floor.",
 "The game itself: Spectrum Ops is a first person rescue shooter built around one idea, colour is your ammunition. Your revolver's six chambers each hold a colour, and the world answers to them: colour coded barriers shatter only to matching rounds, so every corridor becomes a small tactical puzzle of chamber management. Which colours do you load, which do you spend, and what do you save for the room you haven't seen yet?",
 "When our music collaboration fell through, he wrote the whole score himself, on top of building the shooting systems and keeping the schedule honest. Five builds, thirty playtesters, one finished game.",
 "Open the tabs on this letter for the full story, the snapshot, the case notes, and what actually came of it all."
      ],
      media:[
        ['so_logo','The revolver logo, six chambers, six colours'],
        ['so_corridor','A blue round meets a blue barrier'],
        ['so_encounter','Encounter design: colour-keyed doors and enemies'],
        ['so_blockout','A full level, greyboxed and readable']
      ],
      tags:['Unity','C#','Team of 3','30 playtesters','5 shipped builds'],
      links:[['Play on itch.io','https://heemo.itch.io/spectrumops']],
      sig:'with love, the old squad',
      snapshot:{
 role:'Lead Game Developer & Project Manager, plus the full audio pipeline',
        team:'3 people', duration:'4 months', status:'Shipped on itch.io',
        tools:'Unity, C#, Miro, GitHub, audio production (original composition + refined sourced assets)',
        resp:'Production schedule, milestones and scope calls; core gameplay and shooting systems; full original soundtrack and SFX; playtest coordination across five builds; release management'
      },
      cases:[
        {t:'The soundtrack that fell through',
 c:'A planned collaboration with music students collapsed mid production, leaving the game with zero audio, no budget, and no one on the team with composition experience. Audio was suddenly a hole in the schedule nobody had planned for.',
 d:'Rather than ship silent or cut features to buy time, I took over the entire audio pipeline myself, on top of my programming and production roles, composing original tracks, designing sound effects, and refining sourced assets until everything sat in one coherent soundscape.',
 f:'Early playtests made the stakes concrete, testers said placeholder audio undercut the tension of rescue missions. The score had to carry urgency the visuals alone could not, and every revision went back in front of players.',
 o:'Shipped a complete, professional soundscape, original compositions, designed SFX, and refined sourced audio, that made it to the showcase build. Beyond the music itself, it changed how I handle dependencies: the moment one dies, I decide within days whether to absorb it or cut it.'},
        {t:'Making the shooting feel right',
 c:'The shooting mechanic is the verb players use hundreds of times per session, and the first builds felt flat. When your core verb is boring, no amount of content fixes it, so this was the highest leverage problem in the game.',
 d:'I owned the mechanic end to end and refused to tune it by intuition alone. Every change, timing, feedback, hit response, difficulty, went through playtest rounds, and I watched people play rather than only asking what they thought afterwards.',
 f:'Roughly 30 playtesters across five pre release builds shaped the feel. Watching hands on keyboards revealed things surveys never would: where people hesitated, what they never noticed, which fights they replayed for fun.',
         o:'Five versions shipped before the final launch build, each one a measurable step driven by observed play rather than a redo. The final mechanic was responsive and readable enough to demo cold to strangers on a showcase floor.'},
        {t:'Leading a team of three',
 c:'On a three person team every member is a single point of failure, every scope decision is expensive, and there is nowhere to hide slippage. Losing our music collaborators mid project made that painfully real.',
 d:'As PM I organised the work in Miro, set explicit milestones, and kept accountability through structured check ins. I made cuts early, while they were still cheap, and deliberately protected a polish window before the showcase, a finished small game beats an ambitious broken one every time.',
         f:'The UTS Games Showcase date was immovable, so feedback loops had to fit the calendar rather than the other way around. Each of our five builds was scheduled backwards from that date.',
 o:'The game made it to the showcase floor complete, finished, playable, and on time, and the project earned top academic marks plus a formal commendation from the tutor and subject coordinator for leadership, technical execution and overall game quality.'},
      ],
      impact:{
        results:['Top academic marks and a formal commendation from the tutor and subject coordinator for leadership, technical execution and overall game quality',
 'We made it to the UTS Games Showcase floor with a genuinely finished game, nothing half built on display',
          'Five builds went out before the final launch, and every one of them came out of playtest feedback rather than guesswork',
          'Around 30 playtesters shaped how the shooting feels and how hard the game is',
 'I ended up wearing three hats, producer, programmer, composer, and the game still shipped on time'],
 learnings:['When a dependency dies, decide fast: absorb it or cut it. Waiting was the only wrong answer','A steady rhythm of small playtests taught us more than one big one would have','On a three person team, cutting scope early is cheap, cutting it late is a crisis']
      }
    },
 thanks:"They actually wrote to me! Thank you, courier, you're a natural."
  },
  golf: {
    npc:'Bogey', role:'the groundskeeper', building:'Fairway Hut', stamp:null,
    tint:0x6faa5e, npcTint:{cloth:0x5e8f50, accent:0xe8b34b},
    dialog:[
      "A letter? For me? Nobody writes to groundskeepers.",
      "…Wait. This postmark. It's from the dungeon."
    ],
    letter:{
 title:'Dungeon Golf', sub:'Solo Unity physics golf dungeon crawler',
      body:[
 "Bogey, the course you keep was only the beginning. Kingshuk and his team of five built an entire dungeon you putt through: physics driven golf shots as your only way to fight, explore, and escape.",
 "The game itself: Dungeon Golf is a top down pixel roguelike where the golf swing is the whole verb set. Ten holes wind through a monster filled dungeon; every stroke is both your movement and your weapon, line up a shot to cross a room, or drive the ball straight through the goblin guarding the pin. Enemies act between your shots, an inventory system lets you build for each run, and a cursed wizard narrates why you are down here putting for your life in the first place.",
        "Riot and Ubisoft developers praised it at the UTS Games Showcase, and the Powerhouse Museum's game curator gave it a shoutout. Eight builds, fifty playtesters. Par is survival.",
 "The case notes in this letter cover the fights behind it: the aiming scheme debate, the AI that kept getting lost, and the polish bet that paid off."
      ],
      media:[
        ['dg_title','Title screen, the wizard waits'],
        ['dg_story1','The story intro: a curse is explained'],
        ['dg_story2','…and the eternal torment of endless golf begins'],
        ['dg_hole','A hole in progress, enemies between you and the pin']
      ],
      tags:['Unity','C#','Team of 5','50 playtesters','Riot & Ubisoft praise','Powerhouse Museum'],
      links:[['Play on itch.io','https://shingchunglee.itch.io/dungeon-golf']],
      sig:'yours, from the 19th hole below',
      snapshot:{
 role:'Game Developer & Artist, all enemy sprites and visual assets',
 team:'5 people', duration:'3 months · Mar to May 2024', status:'Shipped on itch.io · UTS Games Showcase',
        tools:'Unity, C#, 2D sprite art',
 resp:'All enemy sprites and visual assets, created from scratch through multiple revision rounds; enemy AI systems and the pathfinding testbed behind them; gameplay mechanics and art to design integration; Trello task coordination; playtest iteration across eight builds'
      },
      cases:[
        {t:'Drag to aim, or click to shoot?',
 c:'The single most important input in the game, how you take a shot, had two competing designs, and a five person team split down the middle. Every downstream system (enemy timing, level scale, difficulty) depended on which one won, so the decision was blocking real work.',
 d:'Instead of letting the argument run, we prototyped both control schemes properly and put them in front of players head to head. The rule we set: whichever scheme players performed better with and returned to voluntarily would ship, regardless of whose idea it was.',
 f:'Around 50 playtesters across our builds made the winning scheme obvious through play, not opinion, you could see it in how quickly new players landed their first satisfying shot.',
         o:'The shipped mechanic came out of evidence, and the process permanently changed how the team worked: from that point on, when we disagreed, we tested. Meetings got shorter and the game got better.'},
        {t:'Enemies that hunt you between shots',
 c:'Enemy AI had to feel threatening in a game where the player moves in discrete golf shots, a strange rhythm no standard chase behaviour fits. Worse, pathfinding kept silently breaking in our dungeon layouts, and debugging it inside the full game build was slow and blind.',
 d:'I pulled the problem out of the game entirely and built a dedicated pathfinding testbed, what became the Pathfinding Playground, where I could draw the exact wall patterns that broke the AI and watch A* and three alternatives search in real time.',
 f:'Seeing the search visually exposed exactly where and why enemies got lost in generated rooms, failure cases that were invisible in game became obvious in seconds on the grid.',
 o:'Shipped reliable enemy AI that made the between shots tension work, kept a reusable standalone tool, and came away understanding the algorithms deeply enough to teach them, which is a different thing from having once made them run.'},
        {t:'Polish as a feature',
 c:'A showcase floor full of games meant ours had seconds to earn attention before someone walked to the next booth. One more half finished mechanic would not survive that; a complete feeling world might.',
 d:'We made a deliberate bet with the final stretch: no new mechanics. Everything went into environmental polish, roguelike progression that rewarded another run, and a proper inventory system, the things that make a game feel finished rather than promising.',
         f:'Eight versions before launch, each build tightened around what testers actually replayed rather than what we assumed they liked. Replay behaviour turned out to be a far more honest signal than verbal feedback.',
 o:'The bet paid off precisely: the project earned the highest possible grade, which secured the UTS Games Showcase invitation, and the core loop, environmental polish and progression were exactly what the visiting developers called out on the floor.'},
        {t:'Wearing the artist hat',
 c:'A programmer heavy team meant enemy visuals risked being an afterthought, but enemies are what the player aims at, dodges, and remembers.',
 d:'I created all of the enemy sprites and visual assets from scratch, iterating through multiple design revisions and folding in peer feedback each round, keeping every enemy readable at gameplay distance and consistent with the dungeon tone rather than chasing detail the camera would never show.',
         f:'Playtests were the readability check: if a tester hesitated because they could not tell what something was or what it would do, the sprite went back on the bench.',
 o:'A cohesive enemy roster that reads instantly in motion, and firsthand respect for how much game art is about communication before it is about beauty.'},
      ],
      impact:{
 results:['Highest possible grade in the subject, which earned the invitation to the UTS Games Showcase',
 'Developers from Riot and Ubisoft stopped at our showcase booth and told us they loved the loop, that one still feels good',
          'A shoutout on X from the Powerhouse Museum\'s game curator, highlighting the project\'s innovation and presentation quality',
 'Eight builds and roughly fifty playtesters, the aiming mechanic that shipped was picked by players, not by the loudest voice in the room',
          'It went out genuinely finished: working inventory, enemy AI that hunts you, and roguelike progression that made people replay it'],
        learnings:['A playtest ends a design argument faster than any meeting ever did','When a feature keeps fighting you, step back and build a tool for it','At a crowded showcase, polish is what people actually remember']
      }
    },
    thanks:"A dungeon you golf through… I need to sit down. Thank you, courier."
  },
  tower: {
    npc:'Rune', role:'the wizard', building:'The Old Tower', stamp:null,
    tint:0x7d6bb0, npcTint:{cloth:0x6b5aa0, accent:0xe8b34b},
    dialog:[
      "Hmm. The seal is algorithmic. Binary space partitions… cellular automata…",
      "Only one mortal writes in three generation algorithms at once. Open it."
    ],
    letter:{
 title:'Procedural Dungeon Generator', sub:'Three algorithm JavaScript visualiser',
      body:[
 "Rune, proof that dungeons need no architects. BSP splits, cellular automata caves, and drunkard's walk tunnels, each rendered live so you can watch the rooms carve themselves.",
 "The tool itself: open it in a browser and pick an algorithm. Binary Space Partitioning slices the map into ordered rooms and corridors; cellular automata grows organic caverns pass by pass; the drunkard's walk stumbles out winding tunnels. Each one animates its generation step by step, with parameters you can tune and regenerate instantly, so the differences between the three approaches stop being textbook descriptions and become something you can see.",
 "Pure JavaScript, no engine, no libraries, all algorithm. Built for Dungeon Golf, kept because watching procedural generation think out loud never stops being useful."
      ],
      tags:['JavaScript','BSP','Cellular Automata','Canvas','Built for Dungeon Golf'],
      links:[['Run it live','https://kingshukd7.github.io/Portfolio/dungeon-generator.html']],
 sig:'inscribed by K.D., dungeon conjurer',
      snapshot:{
        role:'Solo developer', team:'1 (tooling for the Dungeon Golf team)', duration:'Built alongside Dungeon Golf',
 status:'Live tool', tools:'JavaScript, HTML5 Canvas, no engine, no libraries',
        resp:'Algorithm implementation, live visualisation, parameter tuning UI'
      },
      cases:[
        {t:'A tool born from a game',
 c:'Dungeon Golf needed varied dungeon layouts, and hand authoring rooms does not scale for a roguelike loop where players expect every run to feel different. But procedural generation is a black box when it fails, a bad dungeon tells you nothing about which parameter produced it.',
 d:'I built a standalone generator implementing three fundamentally different algorithms. BSP splits for structured rooms, cellular automata for organic caves, and drunkard\'s walk for winding tunnels, each rendering its generation step by step so you can literally watch the rooms carve themselves and compare their character side by side.',
 f:'Seeing generation animate revealed things static output never showed: which algorithm produced chokepoints, which made spaces too open for golf shot traversal, and where tuning a single parameter changed the whole dungeon\'s personality.',
 o:'A reusable, engine free tool in plain JavaScript that turned procedural generation from a black box into a visible, debuggable process, and directly informed how Dungeon Golf\'s levels were structured. It doubles as the cleanest demonstration of my algorithm work in the portfolio.'},
      ],
      impact:{
        results:['It quietly steered how Dungeon Golf\'s levels ended up being structured','Three generation algorithms you can actually watch think, in plain JavaScript with no libraries'],
        learnings:['Watching an algorithm run taught me more than any article about it did','Tools built for one project have a habit of outliving it']
      }
    },
    thanks:"Three algorithms bound in one grimoire. The boy has talent. Deliver on."
  },
  arcade: {
    npc:'Byte', role:'the arcade kid', building:'Pixel Palace', stamp:null,
    tint:0x4d8fc4, npcTint:{cloth:0x3d7fb4, accent:0xc8553d},
    dialog:[
 "No way, mail! Actual physical mail! That's so retro!!",
      "Is it cheat codes? Please be cheat codes."
    ],
    letter:{
      title:'Pathfinding Playground', sub:'A* · Dijkstra · BFS · DFS, visualised live',
      body:[
 "Byte, better than cheat codes: the actual brains behind every game enemy that's ever hunted you down. Four pathfinding algorithms racing across a grid you can draw walls on.",
 "The tool itself: a live grid where you place a start, a goal, and any maze of walls you like, then release A*, Dijkstra, BFS and DFS onto it and watch each one search. The expanding frontier is drawn in real time, so you see A* cut a confident beeline while DFS wanders into every dead end, and you understand, not memorise, why heuristics matter. Draw the exact wall pattern that breaks an AI, and the bug explains itself.",
        "Interactive, instant, and weirdly competitive once you start betting on algorithms. Built to fix Dungeon Golf's enemies; kept because it teaches."
      ],
      tags:['JavaScript','A*','Dijkstra','BFS / DFS','Built for Dungeon Golf'],
      links:[['Run it live','https://kingshukd7.github.io/Portfolio/pathfinder-playground-fixed.html']],
      sig:'gg, K.D.',
      snapshot:{
        role:'Solo developer', team:'1 (tooling for the Dungeon Golf team)', duration:'Built alongside Dungeon Golf',
        status:'Live tool', tools:'JavaScript, HTML5 Canvas',
        resp:'Four pathfinding algorithms, interactive grid, wall drawing, live comparison'
      },
      cases:[
        {t:'When the enemies kept getting lost',
 c:'Dungeon Golf\'s enemy AI misbehaved in generated layouts, enemies stalled in doorways, circled dead ends, or ignored obvious routes. Debugging pathfinding inside a full game build was slow and blind: you saw the symptom, never the search.',
         d:'I extracted the problem into a dedicated playground: A*, Dijkstra, BFS and DFS running side by side on an interactive grid where I could draw the exact wall patterns that broke the game AI, then watch each algorithm think its way through them.',
 f:'Getting the visual comparison right was the hardest part, the tool had to show the search frontier expanding, not just the final path. Once it did, watching A* beeline while DFS wandered made every AI bug in the game suddenly explicable.',
 o:'Fixed the enemy AI in the game, kept a standalone tool good enough to teach with, and came away able to explain the trade offs between the four algorithms from experience rather than from a textbook, which is exactly the kind of question that comes up in interviews.'},
      ],
      impact:{
 results:['Dungeon Golf\'s enemy AI bugs got fixed here first, then the fixes moved into the game','Four algorithms racing on one grid, it\'s also the best explanation of A* I can hand to anyone'],
        learnings:['Pulling a hard problem out of the game and into a sandbox made it beatable','Once I could see the search patterns, the bugs stopped being mysterious']
      }
    },
    thanks:"I just made Dijkstra fight A*. This is the best mail ever!"
  },
  shrine: {
    npc:'Cinder', role:'the ember spirit', building:'Ember Shrine', stamp:null,
    tint:0xc45b3a, npcTint:{cloth:0xc8553d, accent:0xffb36b},
    dialog:[
      "…warm. The envelope is warm. It remembers the last cinder.",
      "Read it to me, courier. My hands would only burn the paper."
    ],
    letter:{
 title:'Emberlight: The Last Cinder', sub:'Solo dark cozy pixel platformer · in progress · one single HTML file',
      body:[
 "Cinder, a whole dying world in one file. Emberlight is a dark cozy pixel platformer: you are the last cinder of a dying flame, side scrolling through five acts of a world going out, jumping, dodging and outlasting what hunts you in the dark. Four named bosses stand between you and the end, the Moth Queen, The Archivist, Vesper, and Keeper Noct, with seven enemy types running their own state machine behaviours.",
 "At the centre burns the Kindlelight: your glow is simultaneously your health, your light radius, the solidity of the platforms beneath you, and your enemy aggro range. Burn bright, be hunted. Fade, and the world itself gives way beneath your feet.",
 "Underneath runs a twelve state game architecture, menus, level select, gameplay, pause, death, boss encounters, endings, with persistent data across all of it. Every sprite is rendered from ASCII pixel grids at runtime, every sound synthesized through WebAudio with per act chord progressions. Zero external assets, commercially clean, built alone, and still growing."
      ],
      tags:['JavaScript','Single HTML file','12-state architecture','4 named bosses','7 FSM enemy types','Procedural art & audio','In progress'],
      links:[],
      sig:'keep glowing. K.D.',
 status:'in progress',
      snapshot:{
 role:'Solo Game Developer, design, code, art, audio', team:'1 person', duration:'Ongoing, in active development',
        status:'In progress · playable build',
 tools:'JavaScript, HTML5 Canvas, WebAudio, one single HTML file, zero external assets',
 resp:'Everything: game design; the twelve state game architecture with persistent data; four boss AI patterns and seven FSM enemy types; four permanent powerup systems; ASCII grid procedural sprite rendering; the WebAudio synthesis engine with per act chord progressions; the traversal QA bot; the eight document design suite'
      },
      cases:[
        {t:'The Kindlelight: one number, four systems',
 c:'The core idea, your glow is simultaneously your health, your light radius, the solidity of certain platforms, and your enemy aggro radius, meant one value drove risk, visibility, traversal and difficulty at once. Tuning it was a four way tug of war: make the glow decay generous and the game loses its tension; make it harsh and players die in the dark without understanding why.',
 d:'I committed to the tension instead of softening it. Burning bright is powerful but makes you hunted; fading is safe but blinding. The design rule became: never adjust one of the four systems alone, every glow change had to be evaluated against all four consequences at once, with real mathematical balancing rather than vibes.',
 f:'Playtesting sessions kept exposing states where the loop punished without teaching, a player ambushed in darkness they had no way to anticipate learns nothing. Each pass re tuned glow decay, aggro ranges and light falloff together, and the failures were as instructive as the fixes.',
 o:'The mechanic now reads instantly and carries all five acts, new players understand the trade within a minute of play, without a tutorial. The tuning continues as content grows, which is the honest heart of why this project is still marked in progress.'},
        {t:'A bot that plays the game better than I do',
 c:'Five acts of platforming meant traversal bugs could hide anywhere, and every level edit risked silently breaking a jump three screens away. Manual QA could not replay every route after every change, and a solo developer replaying his own levels stops seeing them honestly.',
 d:'I built a tile aware traversal bot that walks the entire world, simulating the player\'s actual jump physics against the level geometry, and verifies that every required route is physically clearable, not eyeballed clearable, provably clearable.',
 f:'The bot earned its keep almost immediately: it caught a genuinely impossible jump that I, as the human tester, had signed off on, geometry that looked fine but could not be cleared with the real jump arc.',
 o:'Automated traversal QA is now part of the build process; level edits get verified in seconds rather than replayed by hand for an hour. It is the single best return on effort tool I have built, and the habit, automate the testing you dread, carried into everything since.'},
 {t:'A senior director polish pass, self administered',
 c:'Solo projects drift without an outside eye, nobody tells you the boss telegraphs are unreadable or that act three drags, because nobody but you has played it. The usual solo failure mode is shipping a game only its author can love.',
 d:'I ran a structured director style review of the whole game: playing it cold, logging every issue by discipline, design, art, audio, difficulty, pacing, the way a studio polish pass would, with severity ratings, instead of fixing whatever annoyed me most that day. Then I wrote the full eight document professional suite around it: game design, level design, art style, audio, narrative, technical design, asset provenance and QA.',
         f:'The review findings drove real rework, not a checklist: enemy readability, act pacing and boss telegraphs all changed materially because the structured pass surfaced problems casual replaying never had.',
 o:'A commercially clean build with documentation at the standard a studio would expect from a professional team, and a repeatable self review ritual that now substitutes, imperfectly but usefully, for the outside eyes a solo developer does not have.'},
        {t:'A soundtrack made of mathematics',
 c:'Zero external assets was a hard rule, the whole game had to live in one HTML file, and that included every sound in it. There is no audio file to load when there are no files at all.',
         d:'Every sound is synthesized in code at runtime through WebAudio: the music, the effects, all of it generated from oscillators and envelopes rather than recordings.',
 f:'The constraint turned out to be a teacher, when your instrument is raw waveforms, you learn quickly why certain envelopes feel percussive and others feel soft, because nothing comes for free.',
 o:'A complete, commercially clean audio layer with zero licensing risk and zero download weight, and a working knowledge of sound synthesis that most gameplay programmers never pick up.'},
      ],
      impact:{
 results:['Everything in the game, the art, the audio, five acts, four named bosses, seven FSM enemy types, four powerup systems, comes out of code, in one single HTML file',
 'A twelve state architecture (menu through boss encounters to endings) with smooth transitions and persistent data, solo built and holding steady as content grows',
          'My traversal bot found a jump that was literally impossible to make, before any human tester noticed it',
 'Behind the game sits an eight document suite, design, technical and QA docs written the way a studio would want them',
          'Every asset is original, so the whole thing is commercially clean top to bottom'],
 learnings:['One mechanic done properly can carry an entire game, if you accept everything it demands of the design','Automate the testing you dread repeating; the bot has already paid for itself','Working solo, you have to schedule your own honesty, the director style review pass is how I do that']
      }
    },
 thanks:"He understood. Light is a cost… and worth paying. Go, one flame closer."
  },
  house: {
    npc:'KD', role:'game developer', building:'The Courier Office', stamp:null,
    tint:0xd9bd8d, npcTint:{cloth:0x3a2f28, accent:0xc8553d},
    dialog:[
 "Hey, you found me. I'm KD. I, uh… may have posted every one of those letters myself.",
      "Someone had to show you around. This one's about me."
    ],
    letter:{
      title:'Kingshuk Dholakia', sub:'Game Developer · UTS Games Development graduate · Sydney',
      body:[
 "I build worlds, in Unity, in raw JavaScript, and occasionally out of six letters and a small island. I'm a Bachelor of Science in Games Development graduate from the University of Technology Sydney (2021 to 2025), and every project on this island came out of that journey: Spectrum Ops earned top marks and a formal commendation from my tutor and subject coordinator, Dungeon Golf took the highest possible grade into the UTS Games Showcase and caught the Powerhouse Museum's attention, and Emberlight is my ongoing proof that one developer and one HTML file can hold an entire game.",
 "Under the hood, I care about architecture as much as feel. My Unity and C# work leans on SOLID principles and the patterns that keep codebases scalable. Singleton, Factory, Adapter, along with generics, interfaces, events, delegates and reflection where they earn their complexity. I debug and profile builds properly, write structured documentation, and hold my own in peer code review. On the web side it's JavaScript, WebAudio synthesis, and Three.js.",
 "This site is my resume in playable form: hand wired Three.js, an original synthesized score, and a complete set of low poly models I built in Blender specifically for this island, every building, tree, lantern and the courier you're playing. Nothing here is templated, stock, or borrowed."
      ],
      tags:['Unity · C#','JavaScript · Three.js','WebAudio','Blender','SOLID & design patterns','UTS Games Development'],
      links:[['Resume (PDF)','resume.pdf'],['LinkedIn',LI],['Email','mailto:kingshuk.dholakia@gmail.com']],
      sig:'thanks for walking my island. K.D.',
      snapshot:{
 role:'Game Developer, gameplay programming, systems design, audio',
 team:'Currently a team of one, looking for yours',
 duration:'BSc Games Development, University of Technology Sydney · 2021 to 2025',
        status:'Open to game development & software engineering roles · Sydney',
        tools:'Unity, C#, JavaScript, WebAudio API, Three.js, Blender, GitHub, Trello, Miro, Piskel',
        resp:'Gameplay and systems programming; mechanics design and balancing; original audio composition and synthesis; project management and milestone planning; structured documentation and peer code review'
      },
      impact:{
 results:['Formal commendation from my tutor and subject coordinator for leadership, technical execution and overall quality on Spectrum Ops, alongside top academic marks',
          'Highest possible grade on Dungeon Golf, earning an invitation to the UTS Games Showcase, praise from professional developers, and a shoutout from the Powerhouse Museum\'s game curator',
 'A shipped quality solo project in Emberlight: procedural everything, professional documentation, automated QA tooling',
 'This island itself. Three.js world, Blender asset set, synthesized score, and the case studies you\'re reading, all built by hand'],
 learnings:['Playtests settle design arguments better than opinions do. I build my process around them',
          'When a dependency dies, decide fast: absorb it or cut it',
          'If a problem is bigger than the feature, build a tool for it',
 'Polish is not a luxury, it\'s what people remember about your work']
      }
    },
    thanks:"Someone had to write the sixth letter about themselves… thanks for carrying mine. The others are waiting on theirs!",
    thanksLast:"That's all six! Wait… there's one more envelope in your satchel. It has your name on it."
  }
};

const FINAL_LETTER = {
  title:'To: You', sub:'the visitor who walked the whole island',
  body:[
 "If you've read this far, you've seen how I work: give the player a reason to move, make the world answer back, and sweat the small stuff, the dust puffs, the mailbox flag, the waltz in the background.",
    "I'm looking for a games or software engineering role where that instinct is useful. If your studio has a door, I'd love to deliver to it.",
  ],
  tags:['Open to work','Sydney / remote','Games · Software Engineering'],
  links:[['Resume (PDF)','resume.pdf'],['GitHub',GH],['LinkedIn',LI],['Say hello','mailto:kingshuk.dholakia@gmail.com']],
  sig:'your courier, Kingshuk'
};

// ============================================================
//  RENDERER / SCENE / CAMERA
// ============================================================
const app = document.getElementById('app');
const IS_TOUCH = matchMedia('(pointer:coarse)').matches;
const renderer = new THREE.WebGLRenderer({ antialias:true, powerPreference:'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, IS_TOUCH ? 1.75 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
app.appendChild(renderer.domElement);
renderer.domElement.style.touchAction='none';
renderer.domElement.addEventListener('contextmenu', e=>e.preventDefault());
addEventListener('gesturestart', e=>e.preventDefault());
addEventListener('orientationchange', ()=>setTimeout(()=>dispatchEvent(new Event('resize')), 350));

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(PAL.fog, 60, 150);

const camera = new THREE.PerspectiveCamera(46, innerWidth/innerHeight, .6, 400);
camera.position.set(0, 16, 22);

// Sky dome (vertex-colored gradient, live-recolored by the env system)
let skyMesh, skyT;
{
  const g = new THREE.SphereGeometry(190, 24, 12);
  const pos = g.attributes.position;
  skyT = new Float32Array(pos.count);
  const cols = new Float32Array(pos.count*3);
  for (let i=0;i<pos.count;i++)
    skyT[i] = Math.pow(THREE.MathUtils.clamp(pos.getY(i)/190*.5+.5,0,1), .75);
  g.setAttribute('color', new THREE.BufferAttribute(cols,3));
  skyMesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({vertexColors:true, side:THREE.BackSide, fog:false}));
  scene.add(skyMesh);
}
// Stars (visible at night)
let starMat;
{
  const n=420, pos=new Float32Array(n*3);
  for(let i=0;i<n;i++){
    const a=Math.random()*Math.PI*2, e=Math.random()*Math.PI*.48+.06, r=185;
    pos[i*3]=Math.cos(a)*Math.cos(e)*r; pos[i*3+1]=Math.sin(e)*r; pos[i*3+2]=Math.sin(a)*Math.cos(e)*r;
  }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  starMat=new THREE.PointsMaterial({color:0xfff6e0,size:1.4,sizeAttenuation:false,transparent:true,opacity:0,fog:false});
  scene.add(new THREE.Points(g,starMat));
}

// Lights
const hemi = new THREE.HemisphereLight(PAL.ambient, 0x9a8a68, .85);
scene.add(hemi);
const sun = new THREE.DirectionalLight(PAL.sun, 2.1);
sun.position.set(26, 38, 18);
sun.castShadow = true;
sun.shadow.mapSize.set(IS_TOUCH?1024:2048, IS_TOUCH?1024:2048);
sun.shadow.camera.left=-42; sun.shadow.camera.right=42;
sun.shadow.camera.top=42; sun.shadow.camera.bottom=-42;
sun.shadow.camera.far=120; sun.shadow.bias=-0.0002; sun.shadow.normalBias=.015;
scene.add(sun);

// ---- Post chain: Ink outlines -> Bloom -> God rays -> Illustrated grade -> Output -> FXAA ----
const InkShader = {
  uniforms:{ tDiffuse:{value:null}, resolution:{value:new THREE.Vector2(innerWidth,innerHeight)},
    strength:{value:.55}, inkColor:{value:new THREE.Color(0x2c3a40)} },
  vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
  fragmentShader:`
  uniform sampler2D tDiffuse; uniform vec2 resolution; uniform float strength; uniform vec3 inkColor;
  varying vec2 vUv;
  float lum(vec2 o){ return dot(texture2D(tDiffuse, vUv+o/resolution).rgb, vec3(.299,.587,.114)); }
  void main(){
    vec4 col=texture2D(tDiffuse, vUv);
    float tl=lum(vec2(-1., 1.)), tt=lum(vec2(0., 1.)), tr=lum(vec2(1., 1.));
    float ll=lum(vec2(-1., 0.)),                        rr=lum(vec2(1., 0.));
    float bl=lum(vec2(-1.,-1.)), bb=lum(vec2(0.,-1.)), br=lum(vec2(1.,-1.));
    float gx=-tl-2.*ll-bl+tr+2.*rr+br;
    float gy=-tl-2.*tt-tr+bl+2.*bb+br;
    float line=smoothstep(.16,.5,sqrt(gx*gx+gy*gy))*strength;
    gl_FragColor=vec4(mix(col.rgb, inkColor, line), col.a);
  }`};
const RaysShader = {
  uniforms:{ tDiffuse:{value:null}, lightPos:{value:new THREE.Vector2(.5,.7)},
    strength:{value:0}, rayColor:{value:new THREE.Color(0xfff2cf)} },
  vertexShader: InkShader.vertexShader,
  fragmentShader:`
  uniform sampler2D tDiffuse; uniform vec2 lightPos; uniform float strength; uniform vec3 rayColor;
  varying vec2 vUv;
  void main(){
    vec3 col=texture2D(tDiffuse, vUv).rgb;
    vec2 d=(vUv-lightPos)/${IS_TOUCH?'24.0':'36.0'};
    vec2 sPos=vUv; float illum=1.0; float acc=0.0;
    for(int i=0;i<${IS_TOUCH?24:36};i++){
      sPos-=d;
      float l=dot(texture2D(tDiffuse,sPos).rgb, vec3(.299,.587,.114));
      acc+=max(l-.72,0.)*illum; illum*=.94;
    }
    gl_FragColor=vec4(col+rayColor*acc*strength, 1.);
  }`};
const GradeShader = {
  uniforms:{ tDiffuse:{value:null}, shadowTint:{value:new THREE.Color(0x3a6b70)},
    warmHi:{value:new THREE.Color(1.03,.99,.93)}, sat:{value:1.07},
    lift:{value:.034}, poster:{value:.24}, vig:{value:.18} },
  vertexShader: InkShader.vertexShader,
  fragmentShader:`
  uniform sampler2D tDiffuse; uniform vec3 shadowTint, warmHi;
  uniform float sat, lift, poster, vig;
  varying vec2 vUv;
  void main(){
    vec3 col=texture2D(tDiffuse, vUv).rgb;
    float l=dot(col, vec3(.299,.587,.114));
    // teal shadows (the LUT feel), gently warm highlights
    col=mix(col, shadowTint, pow(1.-l,2.6)*.14);
    col=mix(col, col*warmHi, smoothstep(.55,1.,l)*.4);
    // soft posterize toward flat cel regions
    col=mix(col, floor(col*7.)/7., poster);
    // saturation + pastel lift
    col=mix(vec3(dot(col,vec3(.299,.587,.114))), col, sat);
    col=col*(1.-lift)+lift;
    // gentle vignette
    float d=distance(vUv, vec2(.5,.46));
    col*=1.-smoothstep(.55,.95,d)*vig;
    gl_FragColor=vec4(col,1.);
  }`};

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const inkPass = new ShaderPass(InkShader); composer.addPass(inkPass);
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight), .32, .55, .82);
composer.addPass(bloom);
const raysPass = new ShaderPass(RaysShader); composer.addPass(raysPass);
const gradePass = new ShaderPass(GradeShader); composer.addPass(gradePass);
composer.addPass(new OutputPass());
const fxaaPass = new ShaderPass(FXAAShader); composer.addPass(fxaaPass);
function setPostSize(){
  const pr=renderer.getPixelRatio();
  inkPass.uniforms.resolution.value.set(innerWidth*pr, innerHeight*pr);
  fxaaPass.material.uniforms.resolution.value.set(1/(innerWidth*pr), 1/(innerHeight*pr));
}
setPostSize();

addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight);
  setPostSize();
});

// ============================================================
//  TERRAIN — sculpted island, water, path, clouds
// ============================================================
const ISLAND_R = 34;
const world = new THREE.Group(); scene.add(world);

function seededRand(seed){ let s=seed; return ()=> (s = (s*16807)%2147483647)/2147483647; }
const rnd = seededRand(7371);

// Island top: displaced disc with vertex-painted grass
let islandGeo;
{
  const g = new THREE.CylinderGeometry(ISLAND_R, ISLAND_R*.86, 5.5, 64, 4);
  const pos = g.attributes.position; const cols = [];
  const grass = new THREE.Color(PAL.grass), deep = new THREE.Color(PAL.grassDeep);
  const cliff = new THREE.Color(PAL.cliff), cliffD = new THREE.Color(PAL.cliffDeep);
  const sand = new THREE.Color(PAL.sand);
  for (let i=0;i<pos.count;i++){
    const x=pos.getX(i), y=pos.getY(i), z=pos.getZ(i);
    const r = Math.hypot(x,z);
    if (y > 2.7){ // top face: gentle rolling bumps
      const h = Math.sin(x*.35)*Math.cos(z*.3)*.35 + Math.sin(x*.13+z*.21)*.5;
      pos.setY(i, y + h*(r/ISLAND_R));
      const t = THREE.MathUtils.clamp(r/ISLAND_R,0,1);
      const c = grass.clone().lerp(deep, t*.45 + Math.abs(h)*.3);
      if (r > ISLAND_R*.94) c.lerp(sand,.65);
      cols.push(c.r,c.g,c.b);
    } else {
      const t = THREE.MathUtils.clamp((y+2.75)/5.5,0,1);
      const c = cliffD.clone().lerp(cliff, t);
      cols.push(c.r,c.g,c.b);
    }
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols,3));
  g.computeVertexNormals();
  islandGeo = g;
  const islandMat = new THREE.MeshStandardMaterial({vertexColors:true, roughness:.95, metalness:0, flatShading:true});
  islandMat.onBeforeCompile = sh => {
    sh.uniforms.uG1={value:new THREE.Color(0x8cc48c)};
    sh.uniforms.uG2={value:new THREE.Color(0x63a06f)};
    sh.uniforms.uG3={value:new THREE.Color(0x4a7d5c)};
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWPos=(modelMatrix*vec4(transformed,1.)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vWPos;
uniform vec3 uG1,uG2,uG3;
float hash21(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x), mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x), f.y); }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  // repaint only the grassy top (green-dominant vertex color), keep cliffs & sand
  if (vColor.g > vColor.r && vColor.g > vColor.b){
    float n = vnoise(vWPos.xz*.32)*.62 + vnoise(vWPos.xz*1.35)*.38;
    float patches = smoothstep(.42,.78, vnoise(vWPos.xz*.11+7.3));
    vec3 gcol = mix(uG1, uG2, n);
    gcol = mix(gcol, uG3, patches*.55);
    diffuseColor.rgb = mix(diffuseColor.rgb, gcol, .85);
  }
}`);
  };
  const island = new THREE.Mesh(g, islandMat);
  island.position.y = -2.75; island.receiveShadow = true; island.castShadow = true;
  island.updateMatrixWorld(true);
  window.__islandMesh = island;
  world.add(island);
}

// Water: two counter-rotating discs + rim foam ring
const waterGroup = new THREE.Group();
let waterMats = {};
{
  const w1 = new THREE.Mesh(new THREE.CircleGeometry(170, 48),
    (waterMats.deep = new THREE.MeshStandardMaterial({color:PAL.waterDeep, roughness:.8, metalness:0})));
  w1.rotation.x = -Math.PI/2; w1.position.y = -3.4; waterGroup.add(w1);
  const g2 = new THREE.CircleGeometry(168, 48);
  // dapple: push random verts up slightly & tint lighter
  const p=g2.attributes.position, cols=[];
  const cA=new THREE.Color(PAL.water), cB=new THREE.Color(PAL.waterDeep);
  for(let i=0;i<p.count;i++){ const t=rnd(); cols.push(...(t>.5?cA:cB).toArray()); }
  g2.setAttribute('color', new THREE.Float32BufferAttribute(cols,3));
  const w2 = new THREE.Mesh(g2, new THREE.MeshStandardMaterial({vertexColors:true, transparent:true, opacity:.55, roughness:.6}));
  w2.rotation.x = -Math.PI/2; w2.position.y = -3.15; waterGroup.add(w2);
  const foam = new THREE.Mesh(new THREE.TorusGeometry(ISLAND_R*.88, .55, 8, 64),
    new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:.5}));
  foam.rotation.x = Math.PI/2; foam.position.y = -3.0; foam.scale.setScalar(1.02); waterGroup.add(foam);
  scene.add(waterGroup);
}

// Dirt path: flattened ring + spokes made of overlapping discs
const pathMat = new THREE.MeshStandardMaterial({color:PAL.path, roughness:1});
function pathBlob(x,z,s){
  const m = new THREE.Mesh(new THREE.CircleGeometry(s, 10), pathMat);
  m.rotation.x = -Math.PI/2; m.rotation.z = rnd()*Math.PI;
  m.position.set(x, groundY(x,z)+.03, z); m.receiveShadow = true; world.add(m);
}
const _gRay = new THREE.Raycaster();
const _gOrigin = new THREE.Vector3(), _gDown = new THREE.Vector3(0,-1,0);
function groundY(x,z){
  // raycast the actual island mesh so every placement matches the rendered surface exactly
  const mesh = window.__islandMesh;
  if (mesh){
    _gOrigin.set(x, 12, z);
    _gRay.set(_gOrigin, _gDown); _gRay.far = 24;
    const hit = _gRay.intersectObject(mesh, false)[0];
    if (hit) return hit.point.y;
  }
  const r = Math.hypot(x,z); if (r > ISLAND_R) return -3.4;
  const h = Math.sin(x*.35)*Math.cos(z*.3)*.35 + Math.sin(x*.13+z*.21)*.5;
  return h*(r/ISLAND_R);
}

// Clouds: soft low-poly clusters drifting
const clouds = new THREE.Group();
{
  var cloudMat = new THREE.MeshStandardMaterial({color:0xffffff, roughness:1, transparent:true, opacity:.92, fog:false});
  const mat = cloudMat;
  for(let i=0;i<9;i++){
    const c = new THREE.Group();
    const n = 3+Math.floor(rnd()*3);
    for(let j=0;j<n;j++){
      const s = 2.2+rnd()*3.4;
      const b = new THREE.Mesh(new THREE.IcosahedronGeometry(s,0), mat);
      b.position.set(j*2.6-(n*1.3), rnd()*1.2, rnd()*2-1);
      b.scale.y=.55; c.add(b);
    }
    const ang = rnd()*Math.PI*2, rad = 55+rnd()*50;
    c.position.set(Math.cos(ang)*rad, 26+rnd()*14, Math.sin(ang)*rad);
    c.userData.speed = .35+rnd()*.5;
    clouds.add(c);
  }
  scene.add(clouds);
}

// ============================================================
//  ASSET PIPELINE — load, grade to palette, fit, place
// ============================================================
const loader = new GLTFLoader();
const ASSETS = ['cafe','arcade','golfhut','tower','office','shrine','courier',
  'tree_round','tree_pine','lantern','mailbox','fence','well','crates','signpost',
  'flowers','rock_small','rock_big','bench_new'];
const LIB = {};

function gradeMaterial(mat, tintHex, noRemap=false){
  if (!mat || !mat.color) return;
  if (!noRemap){
    // pull every color halfway toward its nearest curated Messenger-ish tone
    let best=null, bd=1e9;
    for (const c of GRADE_PALETTE){
      const d=(c.r-mat.color.r)**2+(c.g-mat.color.g)**2+(c.b-mat.color.b)**2;
      if (d<bd){ bd=d; best=c; }
    }
    mat.color.lerp(best, .5);
  }
  if (tintHex !== undefined) mat.color.lerp(new THREE.Color(tintHex), .28);
  mat.roughness = .92; mat.metalness = 0;
}

const EMISSIVE = [
  [/^a_door_glow/, 0xff8a3c, 1.6], [/^a_bulb/, 0xfff2d4, 1.2], [/^t_star/, 0xe8b34b, 1.4],
  [/^l_glass/, 0xffd9a0, 2.0], [/^s_ember/, 0xff8a3c, 2.6], [/^t_ownd$/, 0xe8b34b, .9],
];
function prepModel(root, {tint, shadow=true, noRemap=false} = {}){
  root.traverse(o=>{
    if (o.isMesh){
      o.castShadow = shadow; o.receiveShadow = true;
      if (Array.isArray(o.material)) o.material = o.material.map(m=>m.clone());
      else o.material = o.material.clone();
      const mats = Array.isArray(o.material)?o.material:[o.material];
      mats.forEach(m=>gradeMaterial(m, tint, noRemap));
      for (const [re, col, inten] of EMISSIVE)
        if (re.test(o.name)){ mats.forEach(m=>{ m.emissive=new THREE.Color(col); m.emissiveIntensity=inten; }); }
    }
  });
  return root;
}

function fitHeight(obj, h){
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const s = h/size.y; obj.scale.setScalar(s);
  return obj;
}
function settle(obj, x, z, rotY=0, sink=.05){
  obj.rotation.y = rotY;
  obj.position.set(x, 0, z);
  const box = new THREE.Box3().setFromObject(obj);
  obj.position.y = groundY(x,z) - box.min.y - sink;
  world.add(obj);
  return obj;
}

async function loadAll(){
  const EM = (typeof window!=='undefined') && window.EMBEDDED_MODELS;
  await Promise.all(ASSETS.map(name => new Promise((res, rej)=>{
    if (EM && EM[name]){
      const bin=atob(EM[name]); const buf=new Uint8Array(bin.length);
      for(let i=0;i<bin.length;i++) buf[i]=bin.charCodeAt(i);
      loader.parse(buf.buffer, './', g=>{ LIB[name]=g.scene; res(); }, rej);
    }
    else loader.load(`./assets/models/${name}.glb`, g=>{ LIB[name]=g.scene; res(); }, undefined, rej);
  })));
}
function recenter(root){
  // Some Kenney exports carry world offsets — pull bbox XZ-center to origin, feet to y=0
  const box = new THREE.Box3().setFromObject(root);
  const c = box.getCenter(new THREE.Vector3());
  root.position.x -= c.x; root.position.z -= c.z; root.position.y -= box.min.y;
  const holder = new THREE.Group(); holder.add(root);
  return holder;
}
function spawn(name, opts={}){ return recenter(prepModel(LIB[name].clone(true), opts)); }

// ============================================================
//  WORLD LAYOUT — six stops around a ring + mailbox hub
// ============================================================
const STOPS = {}; // key -> {pos, radius, data, npcObj, lantern}
const interactables = []; // {pos, radius, label, onUse, id}

const RING = 21;
const STOP_DEFS = [
  { key:'cafe',   model:'cafe',    ang: -.42, h:5.6 },
  { key:'golf',   model:'golfhut', ang:  .58, h:5.2 },
  { key:'tower',  model:'tower',   ang: 1.62, h:9.5 },
  { key:'arcade', model:'arcade',  ang: 2.62, h:5.8 },
  { key:'shrine', model:null,      ang: 3.66, h:0, npcA:2.4, npcD:3.4 },  // Cinder beside the gate
  { key:'house',  model:'office',  ang: 4.72, h:5.6 },
];

function buildStops(){
  for (const def of STOP_DEFS){
    const x = Math.cos(def.ang)*RING, z = Math.sin(def.ang)*RING;
    const data = DELIVERIES[def.key];
    let obj;
    if (def.model){
      obj = fitHeight(spawn(def.model, {}), def.h); // bespoke art, no tint pull
      settle(obj, x, z, Math.atan2(-x, -z), .18); // doors face the island center
    } else {
      obj = buildShrine(x, z);
    }
    if (def.model) addSolid(obj);            // building footprint box
    else obj.traverse(o=>{                   // shrine: every stone, post and plinth is solid
      if (o.isMesh && /^(s_stone|s_plinth|s_g[12]|s_bowl)/.test(o.name)){
        const b=new THREE.Box3().setFromObject(o);
        colliders.push({x:(b.min.x+b.max.x)/2, z:(b.min.z+b.max.z)/2,
          r:Math.max(.3, Math.max(b.max.x-b.min.x, b.max.z-b.min.z)/2*.8)});
      }
    });
    registerOccluder(obj, .32);   // buildings & shrine fade translucent when the player walks behind them
    // door-step path blobs toward center
    for(let i=1;i<=4;i++){
      const t=i/5; pathBlob(x*(1-t*.5), z*(1-t*.5), 1.4-t*.5);
    }
    // NPC beside the door
    const nA = def.npcA ?? 1.7, nD = def.npcD ?? 2.2;
    const nx = x*.82 + Math.cos(def.ang+nA)*nD, nz = z*.82 + Math.sin(def.ang+nA)*nD;
    const npc = makeCharacter(data.npcTint);
    npc.group.scale.setScalar(.92);
    settle(npc.group, nx, nz, Math.atan2(-nx,-nz), .02);
    npc.group.userData.bobSeed = rnd()*10;
    addSolid(npc.group, {circle:true, shrink:.5, minR:.45});
    const marker = new THREE.Group();
    const env = new THREE.Mesh(new THREE.BoxGeometry(.52,.34,.05),
      new THREE.MeshStandardMaterial({color:0xf6eddb, emissive:0xf6eddb, emissiveIntensity:.35}));
    const seal = new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.06,8),
      new THREE.MeshStandardMaterial({color:0xc8553d, emissive:0xc8553d, emissiveIntensity:.6}));
    seal.rotation.x=Math.PI/2; seal.position.z=.03;
    marker.add(env, seal);
    marker.position.copy(npc.group.position); marker.position.y+=2.6;
    marker.visible=false; world.add(marker);
    STOPS[def.key] = { pos:npc.group.position.clone(), baseY:npc.group.position.y, data, npc, def, x, z, marker };
    interactables.push({ id:def.key, pos:STOPS[def.key].pos, radius:3.2,
      label:`Deliver to <b>${data.npc}</b>`, type:'npc' });
  }
  // central ring path
  for(let a=0; a<Math.PI*2; a+=.16) pathBlob(Math.cos(a)*RING*.62, Math.sin(a)*RING*.62, 1.15+rnd()*.3);
}

// Ember shrine: bespoke GLB — the ember crystal inside it comes alive
let emberCore, emberLight, emberBaseY = 0;
function buildShrine(x, z){
  const g = fitHeight(spawn('shrine', {}), 4.4);
  g.traverse(o=>{ if (o.isMesh && o.name.startsWith('s_ember')) emberCore = o; });
  settle(g, x, z, Math.atan2(-x,-z), .16);
  if (emberCore){
    emberBaseY = emberCore.position.y + .12;   // lift the resting point clear of the bowl
    emberLight = new THREE.PointLight(PAL.ember, 28, 16, 2);
    emberCore.parent.add(emberLight);
    emberLight.position.copy(emberCore.position);
  }
  return g;
}

// Mailbox hub at island center — bespoke, with animated flag
let mailFlag;
function buildMailbox(){
  const g = fitHeight(spawn('mailbox', {noRemap:true}), 2.3);
  // wrap the flag parts in a pivot at the stick base so it can drop
  let stick=null, flag=null;
  g.traverse(o=>{ if(o.isMesh){ if(o.name.startsWith('m_flag_stick')) stick=o; else if(o.name.startsWith('m_flag')) flag=o; } });
  if (stick){
    const box = new THREE.Box3().setFromObject(stick);
    const base = new THREE.Vector3((box.min.x+box.max.x)/2, box.min.y, (box.min.z+box.max.z)/2);
    const parent = stick.parent;
    mailFlag = new THREE.Group(); parent.add(mailFlag);
    parent.updateWorldMatrix(true,false);
    mailFlag.position.copy(parent.worldToLocal(base.clone()));
    mailFlag.attach(stick); if (flag) mailFlag.attach(flag);
  } else mailFlag = new THREE.Group();
  settle(g, 0, 2.5, .4, .07);
  interactables.push({ id:'mailbox', pos:new THREE.Vector3(0, 0, 2.5), radius:2.8,
    label:'Collect the <b>letters</b>', type:'mailbox', get relabel(){ return state.finaleDone ? 'Read <b>your</b> letter again' : null; } });
  colliders.push({x:0, z:2.5, r:.6});
  // welcome bench + present
  addSolid(settle(fitHeight(spawn('bench_new',{}),1.15), 2.8, 4.6, -.7, .09));
}

// Nature scatter
function buildNature(){
  const treeDefs = [];
  for(let i=0;i<34;i++){
    const a = rnd()*Math.PI*2;
    const r = 8 + rnd()*(ISLAND_R-11);
    const x = Math.cos(a)*r, z = Math.sin(a)*r;
    // keep clear of stops & center
    if (Math.hypot(x,z-2.5) < 5) continue;
    let clear = true;
    for (const d of STOP_DEFS){
      const sx=Math.cos(d.ang)*RING, sz=Math.sin(d.ang)*RING;
      if (Math.hypot(x-sx,z-sz) < 6.5){ clear=false; break; }
      // also keep clear of each NPC's actual offset spot (e.g. Cinder sits 3.4u off the shrine)
      const nA = d.npcA ?? 1.7, nD = d.npcD ?? 2.2;
      const nx = sx*.82 + Math.cos(d.ang+nA)*nD, nz = sz*.82 + Math.sin(d.ang+nA)*nD;
      if (Math.hypot(x-nx,z-nz) < 4){ clear=false; break; }
    }
    if (!clear) continue;
    treeDefs.push({x,z});
  }
  treeDefs.forEach((t,i)=>{
    const kind = i%3===0 ? 'tree_pine' : 'tree_round';
    const h = kind==='tree_round' ? 3.4+rnd()*1.6 : 3.8+rnd()*1.8;
    const tr = fitHeight(spawn(kind,{}), h);
    settle(tr, t.x, t.z, rnd()*Math.PI*2, .16);
    addSolid(tr, {circle:true, shrink:.5, minR:.55});
    registerOccluder(tr);
  });
  // rocks near cliff edge
  for(let i=0;i<10;i++){
    const a=rnd()*Math.PI*2, r=ISLAND_R-2.2;
    const rock = fitHeight(spawn(i%2?'rock_small':'rock_big',{}), .9+rnd()*1.4);
    settle(rock, Math.cos(a)*r, Math.sin(a)*r, rnd()*Math.PI*2, .22);
    addSolid(rock, {circle:true, shrink:.6});
  }
}

// Instanced grass blades with wind sway
let grassShader=null;
function buildGrass(){
  const COUNT = IS_TOUCH ? 1400 : 3200;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute([
    -.045,0,0,  .045,0,0,  0,.34,0 ], 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ color:0x8cc48c, roughness:1, side:THREE.DoubleSide });
  mat.onBeforeCompile = sh => {
    sh.uniforms.uTime={value:0}; grassShader=sh;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTime;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  float wx = instanceMatrix[3][0], wz = instanceMatrix[3][2];
  float sway = sin(uTime*1.7 + wx*1.9 + wz*1.3) * transformed.y * .5;
  transformed.x += sway; transformed.z += sway*.4;
}`);
  };
  const mesh = new THREE.InstancedMesh(geo, mat, COUNT);
  mesh.receiveShadow = true;
  const m = new THREE.Matrix4(), q=new THREE.Quaternion(), sc=new THREE.Vector3(), pos=new THREE.Vector3();
  const cA=new THREE.Color(0x9ccf98), cB=new THREE.Color(0x568f66), tmp=new THREE.Color();
  let placed=0, guard=0;
  while(placed<COUNT && guard++<COUNT*8){
    const a=rnd()*Math.PI*2, r=Math.sqrt(rnd())*(ISLAND_R-3);
    const x=Math.cos(a)*r, z=Math.sin(a)*r;
    if (Math.abs(r - RING*.62) < 1.7) continue;          // keep the ring path clear
    if (Math.hypot(x, z-2.5) < 3.6) continue;            // mailbox plaza
    let nearStop=false;
    for (const d of STOP_DEFS){
      if (Math.hypot(x-Math.cos(d.ang)*RING, z-Math.sin(d.ang)*RING) < 4.6){ nearStop=true; break; }
    }
    if (nearStop) continue;
    pos.set(x, groundY(x,z)+.02, z);
    q.setFromAxisAngle(new THREE.Vector3(0,1,0), rnd()*Math.PI*2);
    const h=.7+rnd()*.8; sc.set(1, h, 1);
    m.compose(pos,q,sc);
    mesh.setMatrixAt(placed, m);
    mesh.setColorAt(placed, tmp.copy(cA).lerp(cB, rnd()));
    placed++;
  }
  mesh.count=placed;
  mesh.instanceMatrix.needsUpdate=true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate=true;
  world.add(mesh);
}

// Village props: well, crates, signposts, fences, flower patches
function buildProps(){
  // stone well near the plaza
  const well = fitHeight(spawn('well', {}), 2.3);
  settle(well, 4.8, -1.2, .6, .1);
  addSolid(well, {circle:true, shrink:.6});
  // crates beside the café and the arcade
  for (const [key,dx,dz] of [['cafe',2.6,1.4],['arcade',-2.2,1.8]]){
    const d=STOP_DEFS.find(v=>v.key===key);
    const x=Math.cos(d.ang)*RING+dx, z=Math.sin(d.ang)*RING+dz;
    const c=fitHeight(spawn('crates',{}),1.0);
    settle(c, x, z, rnd()*Math.PI, .08);
    addSolid(c, {circle:true, shrink:.6});
  }
  // signposts at two path junctions
  for (const a of [.1, 2.1]){
    const x=Math.cos(a)*RING*.62, z=Math.sin(a)*RING*.62;
    const sp=fitHeight(spawn('signpost',{}),2.0);
    settle(sp, x+1.6, z+1.2, a+.8, .1);
    addSolid(sp, {circle:true, shrink:.4, minR:.25});
  }
  // fences skirting the outer path — placed midway between stops, tilted to follow the slope
  const angs = STOP_DEFS.map(d=>d.ang).sort((a,b)=>a-b);
  for (let i=0;i<angs.length;i++){
    const a0=angs[i], a1=(i+1<angs.length)?angs[i+1]:angs[0]+Math.PI*2;
    const a=(a0+a1)/2;
    const r=RING*.62+2.2;
    const fx=Math.cos(a)*r, fz=Math.sin(a)*r;
    const f=fitHeight(spawn('fence',{}),1.0);
    const ry=-(a+Math.PI/2);            // long axis follows the path
    f.rotation.y=ry;
    f.position.set(fx,0,fz);
    world.add(f);
    let box=new THREE.Box3().setFromObject(f);
    const L=Math.max(box.max.x-box.min.x, box.max.z-box.min.z);
    const dir={x:Math.cos(ry), z:-Math.sin(ry)};
    const y1=groundY(fx-dir.x*L/2, fz-dir.z*L/2);
    const y2=groundY(fx+dir.x*L/2, fz+dir.z*L/2);
    f.rotateZ(Math.atan2(y2-y1, L));    // pitch the rails along the hillside
    box=new THREE.Box3().setFromObject(f);
    f.position.y=(y1+y2)/2 - (box.min.y - f.position.y) - .03;
    for (const tt of [-.45,-.22,0,.22,.45])
      colliders.push({x:fx+dir.x*L*tt, z:fz+dir.z*L*tt, r:.24});
  }
  // flower patches scattered in the grass
  for (let i=0;i<9;i++){
    const a=rnd()*Math.PI*2, r=6+rnd()*(ISLAND_R-10);
    const x=Math.cos(a)*r, z=Math.sin(a)*r;
    if (Math.abs(r-RING*.62)<1.8) continue;
    let clear=true;
    for (const d of STOP_DEFS)
      if (Math.hypot(x-Math.cos(d.ang)*RING, z-Math.sin(d.ang)*RING)<5){ clear=false; break; }
    if (!clear) continue;
    const fl=settle(fitHeight(spawn('flowers',{}), .45+rnd()*.2), x, z, rnd()*Math.PI*2, .06);
    addSolid(fl, {circle:true, shrink:.55, minR:.35});
  }
}

// Lantern posts along the ring (bloom accents)
const lanternFlames = [];
const lanternByKey = {};
function refreshLanterns(){
  for (const d of STOP_DEFS){
    const f=lanternByKey[d.key]; if(!f) continue;
    const done=state.delivered.has(d.key);
    const wasDone = f.userData.mode==='done';
    f.userData.mode = done ? 'done' : (state.hasLetters ? 'pending' : 'idle');
    f.material.emissive.set(done ? 0xffc46a : 0xffb35c);
    f.material.color.set(done ? 0xfff0d0 : 0xffd9a0);
    if (done && !wasDone){
      // light-up moment: flash + a real light source is born
      f.userData.flash = 1;
      if (!lanternLights[d.key]){
        const wp = new THREE.Vector3(); f.getWorldPosition(wp);
        const li = new THREE.PointLight(0xffcf8a, 0, 15, 2);   // wider reach so it lights the ground below
        li.position.copy(wp);
        li.position.y += .2;   // sit the source at the flame, a touch above the glass centre
        scene.add(li);
        lanternLights[d.key] = li;
      }
    }
    if (lanternBeams[d.key]){
      const b = lanternBeams[d.key];
      b.userData.on = (!done && state.hasLetters);
      if (done){ b.userData.on = false; b.visible = false; b.material.opacity = 0; }
    }
  }
}
const lanternBeams = {};
const lanternLights = {};
function buildLanterns(){
  for (const d of STOP_DEFS){
    const a = d.ang + .45;
    const x = Math.cos(a)*RING*.8, z = Math.sin(a)*RING*.8;
    const g = fitHeight(spawn('lantern', {noRemap:true}), 2.5);
    let flame=null;
    g.traverse(o=>{ if (o.isMesh && o.name.startsWith('l_glass')) flame=o; });
    if (flame) flame.userData.lampIdx = lanternFlames.length;   // stable index for flicker phase
    lanternFlames.push(flame);
    lanternByKey[d.key]=flame;
    settle(g, x, z, 0, .12);
    addSolid(g, {circle:true, shrink:.35, minR:.3});
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(.14,.22,7,10,1,true),
      new THREE.MeshBasicMaterial({ color:0xf3c258, transparent:true, opacity:0,
        blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide, fog:false }));
    beam.position.set(x, groundY(x,z)+5.4, z);
    world.add(beam);
    lanternBeams[d.key]=beam;
  }
}

// ============================================================
//  CHARACTERS — Kenney pirate-crew retinted, limb-pivot walk
// ============================================================
const colliders = window.__cols || (window.__cols = []); // circles {x,z,r}
const boxColliders = [];                                    // rects {minx,maxx,minz,maxz}
function addSolid(obj, opts={}){
  const box = new THREE.Box3().setFromObject(obj);
  const cx=(box.min.x+box.max.x)/2, cz=(box.min.z+box.max.z)/2;
  if (opts.circle){
    const r = Math.max(box.max.x-box.min.x, box.max.z-box.min.z)/2*(opts.shrink ?? .8);
    colliders.push({x:cx, z:cz, r:Math.max(opts.minR ?? .3, r)});
  } else {
    const sh = opts.shrink ?? .82;
    boxColliders.push({minx:cx-(box.max.x-box.min.x)/2*sh, maxx:cx+(box.max.x-box.min.x)/2*sh,
                       minz:cz-(box.max.z-box.min.z)/2*sh, maxz:cz+(box.max.z-box.min.z)/2*sh});
  }
}

function makeCharacter(tints={}){
  const root = spawn('courier', {});
  // retint by palette material name: pal_terra = cap/belt cloth, pal_cream = shirt
  root.traverse(o=>{
    if (!o.isMesh) return;
    const mats = Array.isArray(o.material)?o.material:[o.material];
    mats.forEach(m=>{
      const n = (m.name||'').toLowerCase();
      if (n.includes('pal_terra') && tints.cloth) m.color.set(tints.cloth);
      else if (n.includes('pal_cream') && tints.accent) m.color.lerp(new THREE.Color(tints.accent), .35);
    });
  });
  fitHeight(root, 1.85);
  // wrap limbs in pivots at their top so they swing from shoulder/hip
  const limbs = {};
  const wants = ['armLeft','armRight','legLeft','legRight'];
  const found = [], extras = {};
  root.traverse(o=>{
    if (!o.isMesh) return;
    if (wants.some(w=>o.name.startsWith(w))) found.push(o);
    if (/^(shoeL|handL)/.test(o.name)) extras[o.name[0]==='s'?'legLeft':'armLeft']=(extras[o.name[0]==='s'?'legLeft':'armLeft']||[]).concat(o);
    if (/^(shoeR|handR)/.test(o.name)) extras[o.name[0]==='s'?'legRight':'armRight']=(extras[o.name[0]==='s'?'legRight':'armRight']||[]).concat(o);
  });
  for (const mesh of found){
    const key = wants.find(w=>mesh.name.startsWith(w));
    const box = new THREE.Box3().setFromObject(mesh);
    const top = new THREE.Vector3((box.min.x+box.max.x)/2, box.max.y - (key.startsWith('arm')?.06:.02), (box.min.z+box.max.z)/2);
    const parent = mesh.parent;
    const pivot = new THREE.Group();
    parent.add(pivot);
    parent.updateWorldMatrix(true,false);
    const local = parent.worldToLocal(top.clone());
    pivot.position.copy(local);
    pivot.attach(mesh);
    for (const ex of (extras[key]||[])) pivot.attach(ex); // shoes & hands swing with their limb
    limbs[key] = pivot;
  }
  const group = new THREE.Group(); group.add(root);
  return { group, limbs, root, phase: 0 };
}

// The courier — player character with a satchel
let courier;
function buildCourier(){
  courier = makeCharacter({}); // the bespoke model already wears the cap & satchel
  courier.group.traverse(o=>{if(o.isMesh){o.castShadow=true;}});
  courier.group.position.set(0, groundY(0,6), 6);
  world.add(courier.group);
}

// Camera-blocking foliage fades so the player and tracker stay visible under trees
const occluders=[];
function registerOccluder(root, fadeTo=.18){
  const mats=[];
  root.traverse(o=>{ if(o.isMesh){ const ms=Array.isArray(o.material)?o.material:[o.material];
    ms.forEach(m=>{ m.transparent=true; mats.push(m); }); } });
  occluders.push({root, mats, target:1, fadeTo});
}
const _ocRay=new THREE.Raycaster(); const _ocDir=new THREE.Vector3();
function updateOccluders(dt){
  if (!courier) return;
  for (const o of occluders) o.target=1;
  const cp=courier.group.position;
  _ocDir.set(cp.x-camera.position.x, cp.y+1-camera.position.y, cp.z-camera.position.z);
  const dist=_ocDir.length(); _ocDir.normalize();
  _ocRay.set(camera.position, _ocDir); _ocRay.far=dist;
  const hits=_ocRay.intersectObjects(occluders.map(o=>o.root), true);
  for (const h of hits){
    let node=h.object;
    while(node){
      const oc=occluders.find(o=>o.root===node);
      if (oc){ oc.target=oc.fadeTo; break; }
      node=node.parent;
    }
  }
  for (const o of occluders){
    for (const m of o.mats){
      m.opacity += (o.target-m.opacity)*Math.min(1,dt*6);
      m.depthWrite = m.opacity>.6;
    }
  }
}

// Guidance compass: a soft chevron circling the courier's feet, pointing at the next stop
let guide=null;
function buildGuide(){
  guide = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color:0xf5fdff, transparent:true, opacity:0, side:THREE.DoubleSide });
  const ringGroup = new THREE.Group(); guide.add(ringGroup);
  for(let i=0;i<10;i++){
    const d=new THREE.Mesh(new THREE.PlaneGeometry(.2,.06), mat);
    const a=i/10*Math.PI*2;
    d.position.set(Math.cos(a)*1.18, .05, Math.sin(a)*1.18);
    d.rotation.x=-Math.PI/2; d.rotation.z=-a;
    ringGroup.add(d);
  }
  // the chevron
  const g=new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([
    -.14,0,0,  .14,0,0,  0,0,.26,   // arrow head triangle (points +Z)
  ],3));
  g.computeVertexNormals();
  const arrowMat = new THREE.MeshBasicMaterial({ color:0xf3c258, transparent:true, opacity:0, side:THREE.DoubleSide });
  const arrow=new THREE.Mesh(g, arrowMat);
  arrow.scale.setScalar(1.45);
  arrow.rotation.x=0; arrow.position.set(0,.06,1.42);
  const arrowPivot=new THREE.Group(); arrowPivot.add(arrow);
  guide.add(arrowPivot);
  guide.userData={ringMat:mat, arrowMat, arrowPivot, ringGroup, shown:0};
  world.add(guide);
}
function updateGuide(dt, t){
  if (!guide || !courier) return;
  const u=guide.userData;
  // pick target: mailbox first, then nearest undelivered stop
  let target=null;
  if (!state.hasLetters) target=new THREE.Vector3(0,0,2.5);
  else {
    let bd=1e9;
    for (const k in STOPS){
      if (state.delivered.has(k)) continue;
      const d=STOPS[k].pos.distanceToSquared(courier.group.position);
      if (d<bd){ bd=d; target=STOPS[k].pos; }
    }
  }
  const p=courier.group.position;
  // rotate ring + aim arrow FIRST, so we sample ground under where each piece truly ends up this frame
  u.ringGroup.rotation.y += dt*.25; // ring drifts lazily; arrow heading stays true
  if (target){
    const ang=Math.atan2(target.x-p.x, target.z-p.z);
    let dr=ang-u.arrowPivot.rotation.y;
    while(dr>Math.PI)dr-=Math.PI*2; while(dr<-Math.PI)dr+=Math.PI*2;
    u.arrowPivot.rotation.y+=dr*Math.min(1,dt*6);
  }
  // anchor the rig at courier feet; each dot/arrow then rides the ground beneath where it ACTUALLY renders
  const baseY = groundY(p.x,p.z);
  guide.position.set(p.x, 0, p.z);
  guide.position.y = baseY;
  guide.updateWorldMatrix(true, true);
  const LIFT = .12;
  const _wp = new THREE.Vector3();
  // ring dots: sample ground under each dot's true world XZ (ring rotation included), lift above local terrain
  const rg = u.ringGroup;
  for (const d of rg.children){
    d.position.y = 0;                       // neutralize before reading world pos
    d.updateWorldMatrix(true, false);
    d.getWorldPosition(_wp);                // true rendered XZ, rotation applied
    d.position.y = (groundY(_wp.x, _wp.z) - baseY) + LIFT;
  }
  // arrow: sample the ground under the arrow tip's true world position
  const ap = u.arrowPivot;
  const arrow = ap.children[0];
  ap.position.y = 0;
  ap.updateWorldMatrix(true, false);
  arrow.getWorldPosition(_wp);
  ap.position.y = (groundY(_wp.x, _wp.z) - baseY) + LIFT;
  let want = (target && state.started) ? 1 : 0;   // always on while there's somewhere to go
  u.shown+=(want-u.shown)*Math.min(1,dt*3);
  const pulse=.85+Math.sin(t*3)*.15;
  u.ringMat.opacity=u.shown*.45;
  u.arrowMat.opacity=u.shown*pulse;
}

// Dust puffs
const puffs = [];
const puffMat = new THREE.MeshBasicMaterial({color:0xf2e6c8, transparent:true, opacity:.75});
function dustPuff(x,y,z){
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(.12,0), puffMat.clone());
  m.position.set(x+(Math.random()-.5)*.3, y+.08, z+(Math.random()-.5)*.3);
  m.userData = {life:.6, vy:.9+Math.random()*.6};
  scene.add(m); puffs.push(m);
}

// Confetti
const confetti = [];
function burstConfetti(center, n=140){
  const colors=[0xc8553d,0xe8b34b,0x5fb7d4,0x79c06e,0xf6eddb,0x7d6bb0];
  for(let i=0;i<n;i++){
    const m = new THREE.Mesh(new THREE.PlaneGeometry(.16,.22),
      new THREE.MeshBasicMaterial({color:colors[i%colors.length], side:THREE.DoubleSide, transparent:true}));
    m.position.copy(center).add(new THREE.Vector3((Math.random()-.5)*1.4, Math.random()*1.2+1.4,(Math.random()-.5)*1.4));
    const a=Math.random()*Math.PI*2, sp=2.4+Math.random()*3.4;
    m.userData={v:new THREE.Vector3(Math.cos(a)*sp*.5,(Math.random()*.7+.55)*sp,Math.sin(a)*sp*.5),
      rot:new THREE.Vector3(Math.random()*6,Math.random()*6,Math.random()*6), life:2.6+Math.random()*1.4};
    scene.add(m); confetti.push(m);
  }
}

// ============================================================
//  INPUT — keyboard + touch joystick
// ============================================================
const input = { x:0, z:0, interact:false };
const keys = {};
addEventListener('keydown', e=>{
  keys[e.code]=true;
  if (e.code==='Escape' && state.mode==='letter'){ UI.lclose.onclick && UI.lclose.onclick(); e.preventDefault(); return; }
  if (e.code==='KeyE' || e.code==='Enter' || e.code==='Space'){ input.interact=true; e.preventDefault(); }
});
addEventListener('keyup', e=>keys[e.code]=false);

const isTouch = IS_TOUCH;
if (isTouch) document.body.classList.add('touch');
const joy = document.getElementById('joy'), knob = document.getElementById('knob');
let joyActive=false, joyVec={x:0,y:0};
function joyHandle(e){
  const t = e.touches[0]; const r = joy.getBoundingClientRect();
  const cx=r.left+r.width/2, cy=r.top+r.height/2;
  let dx=(t.clientX-cx)/(r.width/2), dy=(t.clientY-cy)/(r.height/2);
  const len=Math.hypot(dx,dy); if(len>1){dx/=len;dy/=len;}
  joyVec={x:dx,y:dy};
  knob.style.left=`${50+dx*34}%`; knob.style.top=`${50+dy*34}%`;
}
joy.addEventListener('touchstart', e=>{joyActive=true;joyHandle(e);e.preventDefault();},{passive:false});
joy.addEventListener('touchmove', e=>{joyHandle(e);e.preventDefault();},{passive:false});
joy.addEventListener('touchend', ()=>{joyActive=false;joyVec={x:0,y:0};knob.style.left='50%';knob.style.top='50%';});
document.getElementById('interact').addEventListener('touchstart', e=>{input.interact=true;e.preventDefault();},{passive:false});

function readInput(){
  let x=0,z=0;
  if (keys['KeyW']||keys['ArrowUp']) z-=1;
  if (keys['KeyS']||keys['ArrowDown']) z+=1;
  if (keys['KeyA']||keys['ArrowLeft']) x-=1;
  if (keys['KeyD']||keys['ArrowRight']) x+=1;
  if (joyActive){ x=joyVec.x; z=joyVec.y; }
  const l=Math.hypot(x,z); if(l>1){x/=l;z/=l;}
  input.x=x; input.z=z;
}

// ============================================================
//  GAME STATE / UI
// ============================================================
const UI = {
  title:document.getElementById('title'), start:document.getElementById('start'),
  loadnote:document.getElementById('loadnote'), hud:document.getElementById('hud'),
  count:document.getElementById('count'), toast:document.getElementById('toast'),
  dialogue:document.getElementById('dialogue'), dspeaker:document.getElementById('dspeaker'),
  dline:document.getElementById('dline'), prompt:document.getElementById('prompt'),
  letterwrap:document.getElementById('letterwrap'), ltitle:document.getElementById('ltitle'),
  lsub:document.getElementById('lsub'), lbody:document.getElementById('lbody'),
  ltags:document.getElementById('ltags'), llinks:document.getElementById('llinks'),
  lsig:document.getElementById('lsig'),
  leyebrow:document.getElementById('leyebrow'), lclose:document.getElementById('lclose'),
  lx:document.getElementById('lx'),
  hint:document.getElementById('hint'), mute:document.getElementById('mute'),
  fader:document.getElementById('fader'), interactBtn:document.getElementById('interact'),
};

const state = {
  started:false, hasLetters:false, delivered:new Set(),
  mode:'walk', // walk | dialogue | letter
  dialogueQueue:[], afterDialogue:null,
  finaleDone:false,
};

let toastTimer;
function toast(msg, ms=3200){
  UI.toast.innerHTML = msg; UI.toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>UI.toast.classList.remove('show'), ms);
}
let hintTimer;
function hint(msg, ms=4500){
  UI.hint.innerHTML = msg; UI.hint.classList.add('show');
  clearTimeout(hintTimer); hintTimer=setTimeout(()=>UI.hint.classList.remove('show'), ms);
}

function showDialogue(speaker, lines, after){
  state.mode='dialogue';
  state.dialogueQueue=[...lines]; state.afterDialogue=after||null;
  UI.dspeaker.textContent=speaker;
  UI.dialogue.classList.add('show');
  advanceDialogue(true);
}
function advanceDialogue(first=false){
  if (!first && finishTyping()) return;   // first tap reveals the whole line
  if (!first && state.dialogueQueue.length===0){
    UI.dialogue.classList.remove('show');
    const f=state.afterDialogue; state.afterDialogue=null;
    state.mode='walk';
    if (f) f();
    return;
  }
  const line = state.dialogueQueue.shift();
  typeLine(line);
  SFX.blip();
}
let typeTimer, typingLine=null;
function typeLine(line){
  clearInterval(typeTimer);
  typingLine=line;
  UI.dline.textContent=''; let i=0;
  typeTimer=setInterval(()=>{
    UI.dline.textContent=line.slice(0,++i);
    if(i>=line.length){ clearInterval(typeTimer); typingLine=null; }
  }, 16);
}
function finishTyping(){
  if (typingLine===null) return false;
  clearInterval(typeTimer);
  UI.dline.textContent=typingLine;
  typingLine=null;
  return true;
}
UI.dialogue.addEventListener('click', ()=>{ if(state.mode==='dialogue') advanceDialogue(); });

function pageHTML(L, page){
  if (page==='letter'){
    let html = L.body.map(p=>`<p>${p}</p>`).join('');
    if (L.media && window.SHOTS){
      html += '<div class="photos">' + L.media.map(([k,cap],i)=>
        window.SHOTS[k] ? `<figure class="photo p${i%3}"><img src="data:image/jpeg;base64,${window.SHOTS[k]}" alt="${cap}" loading="lazy"><figcaption>${cap}</figcaption></figure>` : ''
      ).join('') + '</div>';
    }
    return html;
  }
  if (page==='snapshot'){
    const S=L.snapshot;
    return `<dl class="snapgrid">
      <dt>Role</dt><dd>${S.role}</dd>
      <dt>Team</dt><dd>${S.team}</dd>
      <dt>Duration</dt><dd>${S.duration}</dd>
      <dt>Status</dt><dd>${S.status}</dd>
      <dt>Tools</dt><dd>${S.tools}</dd>
      <dt>Owned</dt><dd>${S.resp}</dd></dl>`;
  }
  if (page==='cases')
    return L.cases.map(c=>`<div class="case"><h4>${c.t}</h4>
      <div class="kv"><b>Challenge</b>${c.c}</div>
      <div class="kv"><b>Decision</b>${c.d}</div>
      <div class="kv"><b>Feedback</b>${c.f}</div>
      <div class="kv"><b>Outcome</b>${c.o}</div></div>`).join('');
  if (page==='impact')
    return `<div class="impact-h">What came of it</div><ul class="impact-list">${L.impact.results.map(r=>`<li>${r}</li>`).join('')}</ul>
      <div class="impact-h">What I took away</div><ul class="impact-list">${L.impact.learnings.map(r=>`<li>${r}</li>`).join('')}</ul>`;
  return '';
}
function showLetter(L, eyebrow, stamp, onClose){
  state.mode='letter';
  UI.leyebrow.textContent=eyebrow;
  UI.ltitle.textContent=L.title; UI.lsub.textContent=L.sub;
  document.getElementById('lwip').style.display = L.status==='in-progress' ? 'block' : 'none';
  const tabs=document.getElementById('ltabs');
  const PAGES=[['letter','The Letter']];
  if (L.snapshot) PAGES.push(['snapshot','Snapshot']);
  if (L.cases)    PAGES.push(['cases','Case Notes']);
  if (L.impact)   PAGES.push(['impact','Impact']);
  const hasStudy = PAGES.length>1;
  let cur='letter';
  function renderPage(){
    UI.lbody.innerHTML=pageHTML(L,cur);
    UI.ltags.style.display = cur==='letter' ? 'flex' : 'none';
    UI.lsig.style.display  = cur==='letter' ? 'block' : 'none';
    document.getElementById('letter').scrollTop=0;
    if (hasStudy) [...tabs.children].forEach(b=>b.classList.toggle('on', b.dataset.p===cur));
  }
  if (hasStudy){
    tabs.style.display='flex';
    tabs.innerHTML=PAGES.map(([k,lab])=>`<button data-p="${k}">${lab}</button>`).join('');
    [...tabs.children].forEach(b=>b.onclick=()=>{ cur=b.dataset.p; SFX.rustle(); renderPage(); });
  } else tabs.style.display='none';
  UI.ltags.innerHTML=L.tags.map(t=>`<span>${t}</span>`).join('');
  UI.llinks.innerHTML=L.links.map(([t,u])=>`<a href="${u}" target="_blank" rel="noopener">${t}</a>`).join('');
  UI.lsig.textContent=L.sig;
  renderPage();
  UI.letterwrap.classList.add('show');
  SFX.rustle();
  const closeLetter=()=>{
    UI.letterwrap.classList.remove('show');
    state.mode='walk'; SFX.rustle();
    if(onClose) onClose();
  };
  UI.lclose.onclick=closeLetter;
  UI.lx.onclick=closeLetter;
}

function updateCount(){
  UI.count.textContent = `${state.delivered.size} / 6 delivered`;
}

// ---------- Interaction resolution ----------
const promptEl = UI.prompt;
let nearest=null;
function checkInteractables(){
  nearest=null; let best=1e9;
  const p=courier.group.position;
  for (const it of interactables){
    if (it.type==='mailbox' && state.hasLetters && !state.finaleDone) continue;
    if (it.type==='npc' && !state.hasLetters) continue;
    const d=Math.hypot(p.x-it.pos.x, p.z-it.pos.z);
    if (d<it.radius && d<best){ best=d; nearest=it; }
  }
  if (nearest && state.mode==='walk'){
    const done = nearest.type==='npc' && state.delivered.has(nearest.id);
    const label = (nearest.relabel) || (done ? `Read <b>${STOPS[nearest.id].data.npc}</b>'s letter again` : nearest.label);
    promptEl.innerHTML=`${label} <span style="opacity:.6">· E</span>`;
    const sp=nearest.pos.clone(); sp.y+=3.1;
    sp.project(camera);
    promptEl.style.left=`${(sp.x*.5+.5)*innerWidth}px`;
    promptEl.style.top=`${(-sp.y*.5+.5)*innerHeight}px`;
    promptEl.classList.add('show');
    UI.interactBtn.classList.add('show');
  } else {
    promptEl.classList.remove('show');
    UI.interactBtn.classList.remove('show');
  }
}

function doInteract(){
  if (state.mode==='dialogue'){ advanceDialogue(); return; }
  if (state.mode!=='walk' || !nearest) return;
  if (nearest.id==='mailbox'){
    if (state.finaleDone){
      showLetter(FINAL_LETTER, 'The envelope with your name on it', null, null);
      return;
    }
    state.hasLetters=true;
    mailFlagDown=true;
    refreshLanterns();
    SFX.jingle();
    toast('Six letters collected. Find their owners around the island!');
    hint('Follow the glowing lanterns. An envelope floats over anyone still waiting.');
    updateCount();
    return;
  }
  // NPC delivery (or re-read an already-delivered letter)
  const stop=STOPS[nearest.id]; const D=stop.data;
  if (state.delivered.has(nearest.id)){
    showLetter(D.letter, `Delivered to ${D.npc} · ${D.building}`, D.stamp, null);
    return;
  }
  showDialogue(`${D.npc} — ${D.role}`, D.dialog, ()=>{
    showLetter(D.letter, `Delivered to ${D.npc} · ${D.building}`, D.stamp, ()=>{
      state.delivered.add(nearest.id); updateCount();
      refreshLanterns();
      SFX.jingle();
      burstConfetti(stop.pos, 60);
      const isLast = state.delivered.size===6;
      const line = isLast
        ? (D.thanksLast || D.thanks + " …wait — that was the very last one! And there's still an envelope in your satchel. It has your name on it.")
        : D.thanks;
      showDialogue(D.npc, [line], ()=>{
        if (isLast && !state.finaleDone) finale();
        else toast(`${6-state.delivered.size} letters left in the satchel`);
      });
    });
  });
}

function finale(){
  state.finaleDone=true;
  SFX.fanfare();
  burstConfetti(courier.group.position.clone(), 240);
  setTimeout(()=>{
    showLetter(FINAL_LETTER, 'One last envelope — addressed to', null, ()=>{
      showDialogue('Postmaster (voice from everywhere)', [
        "Every last letter, delivered. Thank you, courier. The island has never read this much in one day.",
        "The residents will gladly show you their letters again, just knock. And the island is yours now. Wander it, watch the lanterns you lit, stay as long as you like."
      ], ()=>toast('All letters delivered. Read any of them again, or just explore.'));
    });
  }, 1600);
}

// ============================================================
//  AUDIO — procedural chiptune waltz + SFX (WebAudio)
// ============================================================
const SFX = (()=>{
  let ctx=null, master=null, musicBus=null, muted=false, musicOn=false;
  function ensure(){
    if (!ctx){
      ctx = new (window.AudioContext||window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value=.55; master.connect(ctx.destination);
      // warm low-passed bus for the lo-fi track
      const lp = ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=3800; lp.Q.value=.4;
      musicBus = ctx.createGain(); musicBus.gain.value=.44;
      musicBus.connect(lp); lp.connect(master);
    }
    if (ctx.state==='suspended') ctx.resume();
  }
  function osc(type,freq,t0,dur,vol=.2,glide=0,dest){
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.type=type; o.frequency.setValueAtTime(freq,t0);
    if(glide) o.frequency.exponentialRampToValueAtTime(glide,t0+dur);
    g.gain.setValueAtTime(0,t0);
    g.gain.linearRampToValueAtTime(vol,t0+.03);
    g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
    o.connect(g); g.connect(dest||master);
    o.start(t0); o.stop(t0+dur+.05);
  }
  // --- bright island plucks: kalimba-style, warm pads, no noise at all ---
  const N = n=>440*Math.pow(2,(n-69)/12);
  // C  G  Am  F — sunny and simple
  const CHORDS=[[48,[0,4,7]],[43,[0,4,7]],[45,[0,3,7]],[41,[0,4,7]]];
  const ARP=[0,7,12,16, 12,7,12,16]; // rolling 8th-note broken chord (semitone offsets)
  const PHRASES=[ // pentatonic answers on alternating bars [midi, beat, len]
    [[76,0,1],[79,1,.75],[81,2,1.5]],
    [],
    [[84,0,1.5],[81,1.5,.75],[79,2.5,1.2]],
    [],
    [[79,.5,1],[76,1.5,1],[74,2.5,1.2]],
    [],
    [[81,0,.75],[79,1,.75],[76,2,1.6]],
    [],
  ];
  const BPM=76, BEAT=60/BPM, BAR=BEAT*4;
  let nextBar=0, barIdx=0, schedTimer=null;
  function pluck(note,t,vol){ // kalimba/marimba voice: fast attack, warm ring
    osc('sine',N(note),t,.9,vol,0,musicBus);
    osc('sine',N(note+12),t,.5,vol*.3,0,musicBus);
    osc('triangle',N(note),t,.14,vol*.5,0,musicBus);
  }
  function scheduleMusic(){
    if(!musicOn||muted) return;
    const ahead=ctx.currentTime+1.5;
    while(nextBar<ahead){
      const t=nextBar, [root,iv]=CHORDS[barIdx%4], mel=PHRASES[barIdx%8];
      // rolling pluck arpeggio
      for(let e=0;e<8;e++){
        const semi=ARP[e];
        pluck(root+12+((semi>=12&&iv[1]===3)?(semi===16?15:semi):semi), t+e*BEAT*.5, .028);
      }
      // warm pad + gentle bass
      osc('sine',N(root)*1.002,t,BAR,.02,0,musicBus);
      osc('sine',N(root+7)*0.998,t,BAR,.016,0,musicBus);
      osc('sine',N(root-12),t,BEAT*1.8,.085,0,musicBus);
      osc('sine',N(root-12+7),t+BEAT*2,BEAT*1.6,.05,0,musicBus);
      // melody answers
      for(const [note,beat,len] of mel) pluck(note, t+beat*BEAT, .05);
      nextBar+=BAR; barIdx++;
    }
    schedTimer=setTimeout(scheduleMusic,450);
  }
  return {
    startMusic(){ ensure(); musicOn=true; nextBar=ctx.currentTime+.1; barIdx=0; scheduleMusic(); },
    toggleMute(){
      ensure(); muted=!muted;
      master.gain.linearRampToValueAtTime(muted?0:.55, ctx.currentTime+.15);
      if(!muted && musicOn){ nextBar=ctx.currentTime+.1; scheduleMusic(); }
      else clearTimeout(schedTimer);
      return muted;
    },
    blip(){ if(!ctx||muted)return; osc('sine',620,ctx.currentTime,.07,.04,500); },
    rustle(){ if(!ctx||muted)return;
      const t=ctx.currentTime, len=.22, buf=ctx.createBuffer(1,ctx.sampleRate*len,ctx.sampleRate);
      const d=buf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*(1-i/d.length);
      const s=ctx.createBufferSource(); s.buffer=buf;
      const f=ctx.createBiquadFilter(); f.type='highpass'; f.frequency.value=1600;
      const g=ctx.createGain(); g.gain.value=.09;
      s.connect(f); f.connect(g); g.connect(master); s.start(t);
    },
    jingle(){ if(!ctx||muted)return; const t=ctx.currentTime;
      [72,76,79].forEach((n,i)=>{ osc('triangle',N(n),t+i*.16,.7,.04); osc('sine',N(n+12),t+i*.16,.5,.012); }); },
    fanfare(){ if(!ctx||muted)return; const t=ctx.currentTime;
      [60,64,67,72,76].forEach((n,i)=>osc('sine',N(n),t+i*.2,1.1,.045));
      osc('sine',N(36),t,2.2,.08); osc('triangle',N(48),t+.4,1.8,.03); },
    step(){ if(!ctx||muted)return; osc('triangle',150+Math.random()*30,ctx.currentTime,.05,.028); },
  };
})();
// Resume: in the single-file build the PDF ships embedded — turn its links into a live blob
if (typeof window!=='undefined' && window.RESUME_B64){
  addEventListener('click', e=>{
    const a=e.target.closest && e.target.closest('a[href$="resume.pdf"]');
    if (!a) return;
    e.preventDefault();
    const bin=atob(window.RESUME_B64), buf=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) buf[i]=bin.charCodeAt(i);
    const url=URL.createObjectURL(new Blob([buf],{type:'application/pdf'}));
    const dl=document.createElement('a'); dl.href=url; dl.download='Kingshuk_Dholakia_Game_Developer.pdf';
    dl.click(); setTimeout(()=>URL.revokeObjectURL(url), 5000);
  }, true);
}
UI.mute.addEventListener('click', ()=>{ UI.mute.textContent = SFX.toggleMute() ? 'off' : 'on'; });

// ============================================================
//  MOVEMENT / CAMERA / MAIN LOOP
// ============================================================
const SPEED=6.2;
let mailFlagDown=false;
const camTarget=new THREE.Vector3();
let stepAcc=0;

function updateCourier(dt){
  const gp=courier.group.position;
  gp.y=groundY(gp.x,gp.z);
  if (state.mode!=='walk'){ animateIdle(courier,dt); return; }
  readInput();
  const mv=new THREE.Vector3(input.x,0,input.z);
  const moving=mv.lengthSq()>.001;
  if (moving){
    mv.normalize().multiplyScalar(SPEED*dt);
    const p=courier.group.position;
    let nx=p.x+mv.x, nz=p.z+mv.z;
    // island bounds
    const r=Math.hypot(nx,nz);
    if (r>ISLAND_R-1.6){ const s=(ISLAND_R-1.6)/r; nx*=s; nz*=s; }
    // simple prop colliders
    for(const c of colliders){
      const d=Math.hypot(nx-c.x,nz-c.z);
      if(d<c.r+.45 && d>1e-4){ const push=(c.r+.45-d); nx+=(nx-c.x)/d*push; nz+=(nz-c.z)/d*push; }
    }
    const PAD=.45;
    for(const b of boxColliders){
      if(nx>b.minx-PAD && nx<b.maxx+PAD && nz>b.minz-PAD && nz<b.maxz+PAD){
        const dl=nx-(b.minx-PAD), dr=(b.maxx+PAD)-nx, dn=nz-(b.minz-PAD), df=(b.maxz+PAD)-nz;
        const m=Math.min(dl,dr,dn,df);
        if(m===dl) nx=b.minx-PAD; else if(m===dr) nx=b.maxx+PAD;
        else if(m===dn) nz=b.minz-PAD; else nz=b.maxz+PAD;
      }
    }
    p.x=nx; p.z=nz; p.y=groundY(nx,nz)+Math.abs(Math.sin(courier.phase))*.05;
    const targetRot=Math.atan2(mv.x,mv.z);
    let dr=targetRot-courier.group.rotation.y;
    while(dr>Math.PI)dr-=Math.PI*2; while(dr<-Math.PI)dr+=Math.PI*2;
    courier.group.rotation.y+=dr*Math.min(1,dt*11);
    // walk cycle
    courier.phase+=dt*9.5;
    const s=Math.sin(courier.phase);
    if(courier.limbs.armLeft){
      courier.limbs.armLeft.rotation.x=s*.75;
      courier.limbs.armRight.rotation.x=-s*.75;
      courier.limbs.legLeft.rotation.x=-s*.85;
      courier.limbs.legRight.rotation.x=s*.85;
    }
    courier.group.rotation.z=Math.sin(courier.phase)*.02;
    stepAcc+=dt;
    if(stepAcc>.24){ stepAcc=0; dustPuff(p.x,p.y,p.z); SFX.step(); }
  } else {
    animateIdle(courier,dt);
  }
}
function animateIdle(ch,dt){
  ch.phase+=dt*2;
  const s=Math.sin(ch.phase)*.08;
  if(ch.limbs.armLeft){
    ch.limbs.armLeft.rotation.x+= (s-ch.limbs.armLeft.rotation.x)*.1;
    ch.limbs.armRight.rotation.x+= (-s-ch.limbs.armRight.rotation.x)*.1;
    ch.limbs.legLeft.rotation.x*=.86; ch.limbs.legRight.rotation.x*=.86;
  }
}

const _camWant=new THREE.Vector3(), _camBack=new THREE.Vector3(0,10.5,14.5), _camDesired=new THREE.Vector3();
function updateCamera(dt){
  const p=courier.group.position;
  _camWant.set(p.x,p.y+1.2,p.z);
  camTarget.lerp(_camWant, Math.min(1,dt*4));
  _camDesired.copy(camTarget).add(_camBack);
  camera.position.lerp(_camDesired, Math.min(1,dt*3.2));
  camera.lookAt(camTarget);
}


// ============================================================
//  ENVIRONMENT — real local time of day
// ============================================================
const ENV = (()=>{
  const C = h=>new THREE.Color(h);
  // 24h keyframes: [hour, skyTop, skyBottom, fog, sunColor, sunI, hemiI, exposure]
  const KEYS = [
    [0.0,  C(0x1a2c40), C(0x30485a), C(0x223a48), C(0xa8c4e2), .6,  .46, .98],
    [4.5,  C(0x1e3448), C(0x365064), C(0x264050), C(0xaec8e0), .56, .48, 1.0],
    [5.8,  C(0x3a6a8a), C(0xd8a878), C(0x8aa0a0), C(0xffc890), .8,  .45, .95],
    [7.0,  C(0x5cb0da), C(0xd8ecda), C(0xb0dcda), C(0xffe9c2), 1.6, .7, 1.05],
    [9.0,  C(0x66bde6), C(0xd9f0e8), C(0xafe7eb), C(0xfff6e2), 2.1, .85, 1.12],
    [15.0, C(0x66bde6), C(0xd9f0e8), C(0xafe7eb), C(0xfff6e2), 2.1, .85, 1.12],
    [17.5, C(0x58a4ce), C(0xf0d8a8), C(0xb8d8ce), C(0xffe2b0), 1.8, .75, 1.08],
    [19.0, C(0x3c6a94), C(0xda9068), C(0x88a0a4), C(0xffb082), 1.0, .5, .98],
    [20.2, C(0x24425e), C(0x4c6478), C(0x34505e), C(0xb4c8dc), .68, .52, 1.0],
    [22.0, C(0x1a2c40), C(0x30485a), C(0x223a48), C(0xa8c4e2), .6,  .46, .98],
    [24.0, C(0x1a2c40), C(0x30485a), C(0x223a48), C(0xa8c4e2), .6,  .46, .98],
  ];
  const cur = { top:C(0), bot:C(0), fog:C(0), sunC:C(0xffffff), sunI:2, hemiI:.85, exp:1.12, night:0 };
  let firstFrame = true;

  function sample(h){
    let a=KEYS[0], b=KEYS[KEYS.length-1];
    for (let i=0;i<KEYS.length-1;i++)
      if (h>=KEYS[i][0] && h<=KEYS[i+1][0]){ a=KEYS[i]; b=KEYS[i+1]; break; }
    const t=(h-a[0])/Math.max(.001,b[0]-a[0]);
    return {
      top:a[1].clone().lerp(b[1],t), bot:a[2].clone().lerp(b[2],t),
      fog:a[3].clone().lerp(b[3],t), sunC:a[4].clone().lerp(b[4],t),
      sunI:THREE.MathUtils.lerp(a[5],b[5],t), hemiI:THREE.MathUtils.lerp(a[6],b[6],t),
      exp:THREE.MathUtils.lerp(a[7],b[7],t),
    };
  }

  function update(dt, elapsed){
    const now=new Date();
    const hour=now.getHours()+now.getMinutes()/60+now.getSeconds()/3600;
    const tgt=sample(hour);
    const night=THREE.MathUtils.clamp(1-(tgt.sunI-.26)/1.4, 0, 1);
    const sunI=tgt.sunI, hemiI=tgt.hemiI;
    // smooth toward targets (snap on first frame)
    const k=firstFrame?1:Math.min(1,dt*.8); firstFrame=false;
    cur.top.lerp(tgt.top,k); cur.bot.lerp(tgt.bot,k); cur.fog.lerp(tgt.fog,k);
    cur.sunC.lerp(tgt.sunC,k);
    cur.sunI+=(sunI-cur.sunI)*k; cur.hemiI+=(hemiI-cur.hemiI)*k;
    cur.exp+=(tgt.exp-cur.exp)*k; cur.night+=(night-cur.night)*k;

    // apply: sky vertex colors
    const attr=skyMesh.geometry.attributes.color;
    for(let i=0;i<skyT.length;i++){
      const t=skyT[i];
      attr.setXYZ(i,
        cur.bot.r+(cur.top.r-cur.bot.r)*t,
        cur.bot.g+(cur.top.g-cur.bot.g)*t,
        cur.bot.b+(cur.top.b-cur.bot.b)*t);
    }
    attr.needsUpdate=true;
    scene.fog.color.copy(cur.fog);
    scene.fog.near=60; scene.fog.far=150;
    // sun arc: rises east, sets west; below horizon at night it becomes moonlight
    const dayT=THREE.MathUtils.clamp((hour-6)/12,0,1);
    if (cur.night<.85){
      const a=dayT*Math.PI;
      sun.position.set(Math.cos(a)*36, Math.sin(a)*34+4, 16);
    } else {
      const m=((hour+6)%24)/12*Math.PI;
      sun.position.set(Math.cos(m)*30, Math.abs(Math.sin(m))*26+8, -14);
    }
    sun.intensity=Math.max(cur.sunI, .55);
    sun.color.copy(cur.night>.8 ? new THREE.Color(0xb8cdf0) : cur.sunC);
    hemi.intensity=cur.hemiI;
    renderer.toneMappingExposure=cur.exp;
    // night accents
    starMat.opacity=cur.night*.9;
    bloom.strength=.32+cur.night*.28;
    if (emberLight) emberLight.intensity=(26+Math.sin(elapsed*5.2)*6)*(1+cur.night*.8);
    lanternFlames.forEach((f,i)=>{
      const m=f.userData.mode||'idle';
      f.userData.flash = Math.max(0, (f.userData.flash||0) - dt*.9);
      let pulse;
      if (m==='done'){
        // delivered: a steady warm lamp glow. NEVER touch f.scale — the glass mesh has an authored
        // non-uniform scale (~0.2 x 0.24 x 0.2); overwriting it inflated the head into a giant cube.
        pulse = 1.6 + Math.sin(elapsed*2.2+i)*.15;
      } else if (m==='pending'){
        pulse = (3.2+Math.sin(elapsed*3.2+i)*.9) * (1+cur.night*.9);
      } else {
        pulse = (2+Math.sin(elapsed*6+i*2)*.5) * (1+cur.night*1.2);
      }
      f.material.emissiveIntensity = pulse;
    });
    for (const k in lanternLights){
      const f = lanternByKey[k];
      const fl = (f && f.userData.flash) || 0;
      const idx = f ? f.userData.lampIdx : 0;   // stored at build time; no per-frame array scan
      const flicker = 1 + Math.sin(elapsed*7 + idx*1.7)*.06;   // gentle candle flicker
      // a warm pool that stays visible by day and swells at night; the delivery flash gives it a bright burst
      lanternLights[k].intensity = (6 + fl*10) * (1 + cur.night*2.4) * flicker;
    }
    for (const k in lanternBeams){
      const b=lanternBeams[k];
      if (!b.visible) continue;   // delivered lanterns: beam is gone for good
      const want=b.userData.on ? .3+Math.sin(elapsed*2.4)*.08 : 0;
      b.material.opacity += (want-b.material.opacity)*.06;
      b.rotation.y += .004;
    }
    // clouds
    cloudMat.opacity=.85;
    cloudMat.color.setScalar(1-cur.night*.45);
    // water follows the sky
    waterMats.deep.color.copy(new THREE.Color(PAL.waterDeep).lerp(cur.top,.35).multiplyScalar(1-cur.night*.5));
  }

  const _sunV = new THREE.Vector3();
  function updateRays(){
    // project a far point toward the sun into screen space
    _sunV.copy(sun.position).normalize().multiplyScalar(300).add(camera.position);
    _sunV.project(camera);
    const onScreen = _sunV.z < 1 && _sunV.x>-1.4 && _sunV.x<1.4 && _sunV.y>-1.4 && _sunV.y<1.4;
    raysPass.uniforms.lightPos.value.set(_sunV.x*.5+.5, _sunV.y*.5+.5);
    const target = onScreen ? .5*(1-cur.night*.9) : 0;
    raysPass.uniforms.strength.value += (target - raysPass.uniforms.strength.value)*.06;
  }
  function updateChip(){
    const el=document.getElementById('envchip'); if(!el) return;
    const now=new Date();
    const hh=now.getHours(), mm=String(now.getMinutes()).padStart(2,'0');
    const phase = hh<5 ? 'night' : hh<12 ? 'morning' : hh<17 ? 'afternoon' : hh<21 ? 'evening' : 'night';
    el.textContent=`${hh}:${mm} · ${phase} on the island`;
  }
  setInterval(updateChip, 20000);
  return { update, updateChip, updateRays, get night(){return cur.night} };
})();

const UP=new THREE.Vector3(0,1,0);
const clock=new THREE.Clock();
function tick(){
  requestAnimationFrame(tick);
  const dt=Math.min(clock.getDelta(),.05);
  const t=clock.elapsedTime;
  ENV.update(dt, t);
  ENV.updateRays();
  if (grassShader) grassShader.uniforms.uTime.value = t;
  updateGuide(dt, t);
  updateOccluders(dt);
  if (state.started){
    updateCourier(dt);
    updateCamera(dt);
    checkInteractables();
    if (input.interact){ doInteract(); input.interact=false; }
  }
  // ambient life
  clouds.children.forEach(c=>c.position.applyAxisAngle(UP, dt*.012*c.userData.speed));
  waterGroup.children[1].rotation.z+=dt*.02;
  waterGroup.children[2].scale.setScalar(1.02+Math.sin(t*1.4)*.012);
  if (emberCore){ emberCore.position.y=emberBaseY + .08 + Math.sin(t*2.1)*.08; emberCore.rotation.y+=dt;
    if(emberLight) emberLight.position.y=emberCore.position.y; }
  if (mailFlag) mailFlag.rotation.z+=((mailFlagDown?-1.35:0)-mailFlag.rotation.z)*Math.min(1,dt*6);
  // NPC idle bob + envelope markers
  for (const k in STOPS){
    const mk=STOPS[k].marker;
    if (mk){
      mk.visible = state.hasLetters && !state.delivered.has(k);
      if (mk.visible){ mk.rotation.y+=dt*1.6; mk.position.y=STOPS[k].baseY+2.6+Math.sin(t*2+STOPS[k].npc.group.userData.bobSeed)*.12; }
    }
    const n=STOPS[k].npc;
    animateIdle(n,dt);
    n.group.position.y=STOPS[k].baseY+Math.sin(t*1.6+n.group.userData.bobSeed)*.03;
  }
  // dust
  for(let i=puffs.length-1;i>=0;i--){ const m=puffs[i];
    m.userData.life-=dt; m.position.y+=m.userData.vy*dt; m.scale.multiplyScalar(1+dt*2.4);
    m.material.opacity=m.userData.life*1.1;
    if(m.userData.life<=0){scene.remove(m);puffs.splice(i,1);} }
  // confetti
  for(let i=confetti.length-1;i>=0;i--){ const m=confetti[i]; const u=m.userData;
    u.life-=dt; u.v.y-=dt*5.4; m.position.addScaledVector(u.v,dt);
    m.rotation.x+=u.rot.x*dt; m.rotation.y+=u.rot.y*dt; m.rotation.z+=u.rot.z*dt;
    u.v.multiplyScalar(1-dt*.6);
    if(u.life<1) m.material.opacity=u.life;
    if(u.life<=0){scene.remove(m);confetti.splice(i,1);} }
  composer.render();
}

// ============================================================
//  BOOT
// ============================================================
async function init(){
  try {
    await loadAll();
  } catch(err){
    UI.loadnote.textContent='Model files failed to load — serve this folder over http(s), not file://';
    console.error(err); return;
  }
  buildCourier();
  buildStops();
  buildMailbox();
  buildNature();
  buildGrass();
  buildProps();
  buildGuide();
  buildLanterns();
  UI.loadnote.textContent='The island is ready.';
  const gh=new Date().getHours();
  const greetEl=document.getElementById('greet');
  if (greetEl) greetEl.textContent =
    gh<5  ? "It's deep night on the island. The lanterns stayed up for you." :
    gh<12 ? "It's morning on the island. The kettle at the café just went on." :
    gh<17 ? "It's a bright afternoon on the island. Perfect delivery weather." :
    gh<21 ? "It's evening on the island. The lanterns are being lit for you." :
            "It's late on the island, but the mail never sleeps.";
  UI.start.disabled=false;
  tick();
  UI.fader.classList.add('clear');
}
UI.start.addEventListener('click', ()=>{
  state.started=true;
  UI.title.classList.add('hide');
  UI.hud.classList.add('show');
  UI.mute.classList.add('show');
  SFX.startMusic();
  ENV.updateChip();
  updateCount();
  setTimeout(()=>{
    const h=new Date().getHours();
    const greet = h<5 ? "Working the night shift, courier?" :
                  h<12 ? "Good morning, courier!" :
                  h<17 ? "Good afternoon, courier!" :
                  h<21 ? "Good evening, courier!" : "Burning the midnight oil, courier?";
    showDialogue('Postmaster (voice from the mailbox)', [
      `${greet} Six letters came in, and every one of them matters.`,
      "Grab them from the red mailbox, then find their owners. The lanterns mark the way."
    ], ()=>hint(isTouch?'Drag the joystick to walk · tap the envelope to interact':'WASD / arrows to walk · E to interact'));
  }, 900);
});
init();
