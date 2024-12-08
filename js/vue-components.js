var app;

function load() {
	// data = a function returning the content (actually HTML)
	Vue.component('display-text', {
		props: ['layer', 'data'],
		template: `
			<span class="instant" v-html="data"></span>
		`
	})

	Vue.component('mainheader', {
		computed: {
			currentTabState(){
				return this.$root.player.currentTabState
			}
		},
		template: `
			<header class = "header">
				<div class = "leftheader">
					<span onclick="returnToMain()" v-bind:class="{'headerNameMOBILE': isMobile(), 'headerName': !isMobile()}" v-html='currentTabState == "main" ? "PICO GILMAN" : "Pico Gilman"'>PICO GILMAN</span>
				</div>
				<div class = "rightheader">
					<button class="headerFixedWidth" v-bind:class="{'headerbuttonMOBILE': isMobile(), 'headerbutton': !isMobile()}" onclick="papersbutton()" v-html="currentTabState == 'papers' ? 'PAPERS' : 'Papers'">Papers</button>
					<button class="headerFixedWidth" v-bind:class="{'headerbuttonMOBILE': isMobile(), 'headerbutton': !isMobile()}" onclick="photosbutton()" v-html="currentTabState == 'photos' ? 'PHOTOS' : 'Photos'">Photos</button>
					<button class="headerFixedWidth" v-bind:class="{'headerbuttonMOBILE': isMobile(), 'headerbutton': !isMobile()}" onclick="otherbutton()"  v-html="currentTabState == 'other' ? 'OTHER' : 'Other'">Other</button>
				</div>
			</header>
		`,
		methods:{
			isMobile: (x) => isMobile(x),
		},
	})

	Vue.component('papers', {
		template: `
			<div class = "papers">
				<paper v-for="(paper, paper_dir) in PAPERS"
					:key="paper_dir" :paper_dir="paper_dir"> 
				</paper>
			</div>
		`,
		computed: {
			// Accessing PAPERS from the root Vue instance
			PAPERS() {
				return this.$root.PAPERS;
			}
		}
	});

	Vue.component('paper', {
		props: ['paper_dir'],
		computed: {
			thispaper() {
				return this.$root.PAPERS[this.paper_dir]; // Access the paper dynamically based on paper_dir
			},
			highlightedNames(){
				return this.$root.player.highlightedNames;
			}
		},
		template: `
			<div class="paper">
				<a :href="thispaper.link" target="_blank" class = "textleft paperlink">
				<span v-html="thispaper.name"></span>
				</a>
				<span v-html="'('+thispaper.status+')'" class = "textindented"></span>
				<br>
				<span class = "textindented">Joint with 
					<span v-for="(person, index) in thispaper.collaborators" :key="index">
						<span v-bind:class="{ 'nameHighlighted': highlightedNames.includes(person.toLowerCase()) }" @click="nameClicked(person)">
							{{ 
								capitalizeName(person) 
								+ ((index < thispaper.collaborators.length - 1) ? "," : "")	
							}}
						</span>
					</span>
				</span>
			</div>
		`,
		methods: {
			capitalizeName: (x) => capitalizeName(x),
			nameClicked: (x) => nameClicked(x),
		}//<span v-if="index < thispaper.collaborators.length - 1">{{ ', ' }}</span>
		//<span v-if="index < thispaper.collaborators.length - 1">, </span>
	});

	console.log("yep")

	app = new Vue({
		el: "#app",
		data: {
			player,
			PAPERS
		},
	})
}

 