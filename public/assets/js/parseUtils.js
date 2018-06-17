var Parse;
var Story;
var Character;
var Interaction;

function ParseInit() {
 	console.log(Parse);
    //Parse.$ = jQuery;

    Parse.initialize("character-map");
	Parse.serverURL = "https://fansourced-character-map.herokuapp.com/parse"

	Story = Parse.Object.extend('Story', {
		//Instance methods
			initialize: function(attrs={}, options){
				this.set('type', "TV")
				this.set('title', "Story Title");
				this.set('characters', {});
				this.set('nodes', []);
				this.set('edges', []);
			},
			toString: function(){
				return this.get('type') + ": " + this.get('title');
			}
		}, 	{
			//Class methods
			getHierarchy: function(type){
				switch(type){
					case "TV":
						return ["Story", "Season", "Episode", "Scene", "Interaction"];
					case "Movie":
						return ["Story", "Scene", "Interaction"];
					case "Book":
						return ["Story", "Chapter", "Scene", "Interaction"];
					default:
						return ["Story", "Interaction"];
				}
			}
		}
	);
	Parse.Object.registerSubclass('Story', Story);

	Section = Parse.Object.extend("Section", {
		//Instance methods
		initialize: function(attrs={}, options){
			this.set("type", "Type");
			this.set("title", "Title");
			this.set("summary", "Summary");
			this.set("position", -1);
			this.set("parent", null);
			this.set("story", null);
			this.set('nodes', []);
			this.set('edges', []);
		},
		toString: function(){
			var result = "";
			result += this.get("type") + " " + this.get('position').toString() + ": " + this.get('title');
			result += "\n" + this.get('summary');
			return result;
		}
	}, {

	});
	Parse.Object.registerSubclass('Section', Section);

	Scene = Parse.Object.extend("Scene");

	Interaction = Parse.Object.extend("Interaction", {
		initialize: function(attrs={}, options){
			this.set('characters', []);
			this.set('summary', "");
			this.set('position', -1);
			this.set('parent', null);
			this.set('significance', 1);
			this.set('charge', 0);
		},
		toString: function(){
			var chargeString = "";
			if(this.get('charge'))
			var result = "";
			result += this.get('summary');
			result += "\n" + JSON.stringify(this.get('characters'));
			result += "\n" + this.getChargeString() + " " + this.get('significance').toString();
			return result;
		},
		getChargeString: function(){
			var result = "";
			var charge = this.get('charge');
			if(charge < 0){
				result = "Negative";
			} else if(charge > 0){
				result = "Positive";
			} else{
				result = "Neutral";
			}
			return result;
		}
	}, {

	});
	Parse.Object.registerSubclass('Interaction', Interaction);
}

console.log("Initializing Parse");
ParseInit();