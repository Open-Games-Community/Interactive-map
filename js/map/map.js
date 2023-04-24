$(document).ready(function () {

	$('.map').parent().find('.play-button, .copy').remove();

	// close button
	$(document).on('click', '.close-sidebar', function () {
		$('.map-sidebar').removeClass('active');
	});

	// select stage
	var markerStage = parseInt($('.map-content .marker').attr('data-stage'));
	var currentStage = 5;

	function changeStages() {
		$('.map-stages li').each(function(i, obj) {
			if (parseInt($(this).attr('data-stage')) === currentStage) {
				$(this).addClass('active')
			}
			else {
				$(this).removeClass('active')
			}
		});
		$('.map-content .marker').each(function(i, obj) {
			var parseStage = parseInt($(this).attr('data-stage'));

		    if (parseStage > currentStage) {
				$(this).addClass('stage-hidden');
			}
			else {
				$(this).removeClass('stage-hidden');
			}
		});
	}
	changeStages();

	$(document).on('click', '.map-stages li', function () {
		var clickedStage = parseInt($(this).attr('data-stage'));
		currentStage = clickedStage;

		changeStages();
	});

	function imageExists(url, callback) {
		var img = new Image();
		img.onload = function() { callback(true); };
		img.onerror = function() { callback(false); };
		img.src = url;
	  }

	// side print
	function printAsideContent(objId, objName, objIcon) {
		var imageName = objName.replace(/\s/g,"_").toLowerCase();
		
		switch(imageName)
		{
			case "forest_of_mirrors":
				imageName = "the_forest_of_mirrors";
				break;
			case "antharas'_lair":
				imageName = "antharass_lair";
				break;
			case "antharas":
				imageName = "antharass";
				break;
		}

		if (locations[imageName] == undefined) {
			var textName = 'No description.';
		}
		else {
			var textName = locations[imageName];
		}

		imageExists('map/header_' + imageName + '.jpg', function(exists)
		{
			if(exists)
				$('.map-sidebar-image').css('background-image', 'url(map/header_' + imageName + '.jpg)');
			else
			{
				$('.map-sidebar-image').css('background-image', 'url(map/hellgrave_minimap.jpg)');
				$('.map-sidebar-image').css('background-size', 'cover');
			}
				
		});

		$('.map-sidebar-location-name').html(objName);
		$('.map-sidebar-text').html(textName.description);
		if(imageName === "-" || imageName === "-"|| imageName === "-"|| imageName === "-")
		{
			$('.map-sidebar-location-title').html("Epic Raid Boss");
		}
		else
		{
			$('.map-sidebar-location-title').html("Location");
		}
	}

	// sidebar open/close functions
	$('.map-content .marker').each(function(i, obj) {
		$(this).on('click', function () {
			if (!$(this).hasClass('stage-hidden')) {
				var objClicked = $(this).attr('data-id');
				var objName = $(this).find('p').text();
				var objIcon = $(this).find('img').attr('src');

				$('.map-sidebar').removeClass('active');

 				setTimeout(function () {
					printAsideContent('data_id_' + objClicked, objName, objIcon);
                }, 300);

 				setTimeout(function () {
					$('.map-sidebar').addClass('active');
                }, 600);

			}
		});
	});

	var ids = [];

	$('.map-content .marker p').each(function () {
		ids.push($(this).html().replace(/\s/g,"_").toLowerCase()); // ids.push(this.id) would work as well.
	});

	// markers content
	var locations = {

		mistfall:
			{ description: "After the war of the elves and the dwarves, the city was rebuilt by the ancient dark elves. They named the city Mistfall." },

		mordragor:
			{ description: "Former colony of warriors, it was the first city of the whole continent. After the fall of the dragon Zyrtarch, the city has grown steadily and now and become the main empire of the continent. There are mainly traveling merchants like Rashid, merchants for mages, knights, archers, druids, trainers and much more." },

		freewind:
			{ description: "The bravest warriors gathered in this city to face King Ghazbaran. No one managed to come back alive by going in search of the king's head. It is said that he would live in caves to the north." },

		dolwatha:
			{ description: "After building Mordragor, Dolwatha was the continent's second most famous city. Researchers from all villages, explorers, warriors, warriors have found refuge in this city. The city is populated by merchants of all kinds. The continent is full of secrets." },

		falanaar:
			{ description: "Among the sections in Elven Forest, the place where Mother Tree's influence is the strongest is called Shadow of the Mother Tree. Mother Tree is the tree from the very beginning of the world and is the center of the Elven society. It is known that gods made the Elf race using the leaves of Mother Tree." },

		goshnar_entrance:
			{ description: "Here is the entrance of Soul Bosses. You can access to entrance from Roshamuul Sight of Surrenders spawn, at north." },

		ghazharagoth:
			{ description: "Raid Ghaz'haragoth and Omrafir." },

		nightmare_cave:
			{ description: "An Hight level cave, warning before enter here, a demon reside inside." },

		twisted_cave:
		{ description: "Twisted Shape Cave." },

		insectoid_cave:
		{ description: "Here you will find, turtles, slugs and insectoid Workers." },

		golem_cave:
		{ description: "Here you will find, Ghouls, skeletons, demon skeletons. There is a Worker Golem Cave, requiered level 35. Quest: Assassin Dagger, Minotaur Backpack, Crown Helmet, 50 platinum Coins." },
		
		rascacoon:
		{ description: "Here you will find, Pirate Scoundrel, Cutthroat, exotic caves and Tentuglys Head Boss." },

		tentuglys_boss:
		{ description: "To acess on Tentuglys Boss, reach east of Rascacoon Island and enter on teleport." },
		
		cobra_bastion:
		{ description: "Cobra Bastion, you will find Scarlett Etzel." },
		
		entrance_king_zelos:
		{ description: "Here you will find Grave Danger Bosses." },
		
		entrance_fear_feaster:
		{ description: "Here you will find The Fear Feaster Bosses." },
		
		falcon_bastion:
		{ description: "Falcon Bastion, you will find Grand Master Oberon." },
		
		passage_rascacoon:
		{ description: "Here is the passage to Rascacoon Island." },

		npc_elyotrope:
		{ description: "Npc Elyotrope Location. Start a mission in order to obtain 10 Dragon tail's and obtain a pickaxe to start mining and become rich. For more information about mining see the wiki page on the menu." },

		npc_tamoril:
		{ description: "Npc Tamoril." },

		warlock_cave:
		{ description: "Warlock Dungeon, the entrance is reserved to players 100+, you will find, Furys, warlocks, hand of cursed fate, Diabolic Imps, Dark Torturers, heros, Hellfire Fighter and some more. One of the most popular caves for start leveling and make money." },

		mages_quest:
		{ description: "Here is the entrance for the Mages Quest, Rewards, sneaky stabber of eliteness, wand of vodoo, underworld rod and spellbook of mind control." },

		vampire_lands:
		{ description: "Vampire Lands. Haunted treelings, vampires, elder beholder, demon skeletons, war wolfs. The road to the Vampire lands is infested of Haunted Treelings. " },

		anihilator:
		{ description: "Here is the entrance to some quests ( Knight Set Quest - Vampire Shield - Anihilator ). Warning, when you enter here until you didnt reach the final you cannot get back! Also this cave connects directly to the north of Falanaar Lands, is one of the most bigger caves. You will face to many dangerous creatures.  " },

		trinity_island:
		{ description: "To Access on this Island, you will need reach Mordragor Temple and enter on the Teleport. Here you can make your Daily Quest, Dungeons, Arena Waves each day. " },

		dwarf_caves:
		{ description: "A Caves of Dwarfs. Quest: 20 Iron Ores. " },

		minotaur_lands:
		{ description: "Minotaur Lands. There is quest on mountains, Steel Helmet Quest. " },

		behemoth_cave:
		{ description: "Small Behemoth cave, level required 70. " },

		dragon_quest:
		{ description: "Dragon Shield Quest, noble armor and 25 Platinum Coins.  " },

		hell_cave:
		{ description: "Golden Armor Quest. You will face some Warlocks. Here you will find the entrance of Hell Cave, warning, required level 150+ with team.  " },

		mawhawk:
		{ description: "Mawhawk Raid.  " },

		barbarian_camp:
		{ description: "Barbarian Camp.  " },

		frost_dragon_lands:
		{ description: "Big Spawn of Frost Dragons.  " },

		hell_mines:
		{ description: "Here you will face a creatures of level 150+. Be Aware there is the king Ghazbaran.  " },

		asura_palace:
		{ description: "Asura Palace, One of the most privileged places for players.  " },

		ferumbras_tower:
		{ description: "Ferumbras Tower, here will be the place of the Ferumbras Raid.  " },

		elder_lands:
		{ description: "Elder Lands. Prepare to face to many Wyrms, Elder Wyrms you can found a rare monster called Tyrn. Under the mountain you can face to Plagueroot. " },

		depth_hell:
		{ description: "Depth Hell, you can find Here Hydras, Serpent Spawn, Medusas, also on depth cave you will find a challenge to fight Lisa, recomended level 150+.  " },

		behemoht_mountain:
		{ description: "Boots of Haste quest, required level 30 to pass the gate. Under the mountain you can face to The Welter." },

		mutated_cave:
		{ description: "Mutated Tigers Cave." },

		apes_land:
		{ description: "Apes Land. Under the ground you can go to Mordragor Vampires Land." },

		deeplings_land:
		{ description: "Here you will find all kind of Deeplings, underground you will find, Minotaur Amazon, Hunter, Mages, Moohtant, but also you will find Glooths ." },

		quara_tower:
		{ description: "Many Quara Spawns." },

		zaoan_quest:
		{ description: "Here you will find the entrance of Zaoan Quest, prepare to face at many Drakens and Ghastly Dragons." },

		fungus_cave:
		{ description: "Fungi Spawn, here you will find Hideous Fungus and Humongous Fungus." },

		necro_cave:
		{ description: "Necromancer, stalker, demons skeletons and some more." },

		grim_reaper_cave:
		{ description: "Entrance of Grim Reaper Cave, you will face also to some Nightmares." },

		gravedigger_passage:
		{ description: "Gravedigger Passage, here is the quest of beastslayer axe, golden falcon and 100 platinum coins." },

		djinn_fortress:
		{ description: "Djinn Fortress." },

		orc_lands:
		{ description: "Some king of Orcs." },

		cyclop_fortress:
		{ description: "Cyclop Fortress." },

		scarab_cave:
		{ description: "Scarab Cave." },

		tomb_of_pharaos:
		{ description: "Tomb of Pharaos, quest crusader helmet and blue robe." },

		dangerous_passage:
		{ description: "The evil seems causing some chaos here." },

		death_passage:
		{ description: "This passage goes to Morgaroth Raid, you will face some evils. To the depth you can face Plagirath." },

		dragon_lair:
		{ description: "Here is the famous Dragon Lair." },

		lava_golem_quest:
		{ description: "Here is the Lava Golem Quest: 50 Tibia Coins, 10 Silver Tokens and 5 Gold Tokens. You will face some Vulcongras, Magma Crawlers and Weepers. " },

		demon_cave:
		{ description: "Demon Cave." },

	}

});
