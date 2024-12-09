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

	Vue.component('maincontent', {
		computed: {
			everSpelledName(){
				return this.$root.player.everSpelledName
			},
			everSpelledSurname(){
				return this.$root.player.everSpelledSurname
			}
		},
		template: `
			<div>
				<table style="width: 100%; border-collapse: collapse;">
					<tr>
						<td style="width: 66%; vertical-align: top;">
							I'm currently a second-year <a href="https://ccs.ucsb.edu/" target="_blank">CCS</a> <a href="https://ccs.ucsb.edu/majors/mathematics" target="_blank">Mathematics</a> Major at <a href="https://www.ucsb.edu/" target = "_blank">University of California: Santa Barbara</a>.
							<br><br>
							My primary interests are algebraic, especially algebraic number theory. I also enjoy both <i>p</i>-adic analysis and <i>L</i>-functions.
							<br><br>
							Some of my hobbies include playing tennis, playing bridge (recently I've been playing exclusively 2-over-1 + RCKB1430), coding, and designing idle games. 
							Since May 2023, I've been keeping track of what I've done during ever half hour of every day.
							<br><br>
							I tutor mathematics - competition math and (up to intro-graduate level) analysis and algebra. Feel free to find my email below to reach out.
						</td>
						<td style="width: 33%; text-align: center; vertical-align: middle;"><img src="photos/headshot.jpg" alt="Pico Headshot" style="width: 50%;"></td>
					</tr>
				</table>
				
				<span style = "position: absolute; top: 80%; left: 3%" >
					<button 
						class = "emailbutton" 
						v-html = "everSpelledName ? (atob('cGljb2dpbG1hbkBnbWFpbC5jb20') + ' (click to copy)') : 'Click or type out my first name to reveal personal email'"
						onclick = "player.everSpelledName ? navigator.clipboard.writeText(atob('cGljb2dpbG1hbkBnbWFpbC5jb20')) : mobileRevealPersonalEmail()"
						>
					</button>
					<button
						class = "emailbutton" 
						v-html = "everSpelledSurname ? (atob('cGljb2dpbG1hbkB1Y3NiLmVkdQ==') + ' (click to copy)') : 'Click or type out my last name to reveal professional email'"
						onclick = "player.everSpelledSurname ? navigator.clipboard.writeText(atob('cGljb2dpbG1hbkB1Y3NiLmVkdQ==')) : mobileRevealProfessionalEmail()"
						>
					</button>
				</span>
			</div>
		`, // note: I use base 64 encoding to get cGljb2dpbG1hbkBnbWFpbC5jb20 so that bots cant trivially get my email
		methods:{
			atob: (x) => atob(x),
		},
	})

	Vue.component('papers', {
		template: `
			<div class = "papers">
				<span>
					<i>Click on a name to highlight all repeats, type 'clear' to</i>
					<span onclick="player.highlightedNames = []"><i>clear</i></span>
				</span>
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
				<span v-html="'('+thispaper.status+')'"></span>
				<br>
				<span>Joint with 
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
		}
		//<span v-if="index < thispaper.collaborators.length - 1">{{ ', ' }}</span>
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

 