var app;

function load() {
	// data = a function returning the content (actually HTML)
	Vue.component('display-text', {
		props: ['layer', 'data'],
		template: `
			<span class="instant" v-html="data"></span>
		`
	})

	Vue.component('photocontent', { // can add other photos from conferences
		template: `
			<div style="overflow: auto">
				<img src="photos/3b1b_photo.jpeg" alt="Pico and Grant Sanderson" style="width: 400px;"> 
				<br><i>Photo with Grant Sanderson from 3b1b</i>
				<br><br>
				<img src="photos/AFW37.jpeg" alt="Talk at 37th AFW" style="width: 400px;"> 
				<br><i>37th Automorphic Forms Workshop at University of North Texas</i>
				<br><br>
				<img src="photos/ymc2024.jpg" alt="Talk at Young Mathematicians Conference 2024" style="width: 400px;"> 
				<br><i>Young Mathematicians Conference 2024 at Ohio State University</i>
				<br><br>
				<img src="photos/ross2023.png" alt="Ross 2023" style="width: 400px;"> 
				<br><i>Ross Mathematics Program 2023</i>
				<br><br>
				<img src="photos/ross2023counselors.png" alt="Ross 2023 Counselors" style="width: 400px;"> 
				<br><i>Ross Mathematics Program Counselors 2023</i>
				<br><br>
			</div>
		`, 
		// photos from rossprogram and sjm
	})

	Vue.component('othercontent', {
		computed: {
			everalec(){
				return this.$root.player.everAlec
			}
		},
		template: `
			<div>
				My <a class="link" href="pdfs/cv_encr.pdf" target="_blank">CV</a> is password protected with [firstname][lastname] (all lower case no spaces).
				<br><br>
				Expected Fall 2025 math courses: Seminar in Algebra (18.704), Algebraic Geometry I (18.725), Elliptic Curves (18.783), Topics in Number Theory (18.787). 
				<br><br>
				Notes available upon request for: 
				<ul>
					<li>2024-25</li>
					<ul>
						<li>Algebraic Topology (at UCPH)</li>
						<li>Computability, Turing Machines, and Go&#776;del's Incompleteness Theorem (at UCPH)</li>
						<li>Real Analysis (Math 201ABC at UCSB)</li>
						<li>Complex Analysis (Math 202BC at UCSB)</li>
						<li>Topics in Number Theory (Math 225B at UCSB)</li>
						<li>Homological Algebra (Math 236AB at UCSB)</li>
						<li>Local Fields (through <a class="link" href="https://swc-math.github.io/aws/2025/2025PAWS.html" target="_blank">PAWS</a>)</li>
						<li>Stellar Structure and Evolution (Physics 132 at UCSB)</li>
					</ul>
					<li>2023-24</li>
					<ul>
						<li>A proof of Hasse-Minkowski</li>
						<li>Linear Algebra (Math CS 108 at UCSB)</li>
						<li>Non-Euclidean Geometry (Math 113 at UCSB)</li>
						<li>Intro to Number Theory (Math 115 at UCSB)</li>
						<li>Intro to Real Analysis (Math 118ABC at UCSB)</li>
						<li>The Ellipse (Math CS 120 EL at UCSB)</li>
						<li>Topologicial Combinatorics (Math CS 120 TC at UCSB)</li>
						<li>Probability (Math CS 121 at UCSB)</li>
						<li>Modern Algebra (Math 220ABC at UCSB)</li>
						<li>Topics in Number Theory (Math 225AB at UCSB)</li>
						<li>Cosmology (Physics 133 at UCSB)</li>
					</ul>
					<li>Prior</li>
					<ul>
						<li>Algebraic Number Theory and Class Field Theory</li>
						<li>Elliptic Curves</li>
						<li>Erd&#337;s-Falconer Problem over Finite Fields (with Alexander McDonald)</li>
						<li>Bernoulli Numbers (with Stefan Patrikis)</li>
					</ul>
				</ul>
				<br>
				<span v-if="everalec">
					Link to my friend <a class="link" href="https://xz.ax/" target="_blank">Alec's Website</a>.<br>
				</span>
				<br>
			</div>
		`, 
		methods:{
			atob: (x) => atob(x),
		},
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
					<button v-bind:class="{'headerbuttonMOBILE': isMobile(), 'headerbutton': !isMobile()}" onclick="papersbutton()" v-html="currentTabState == 'papers' ? 'PAPERS' : 'Papers'">Papers</button>
					<button v-bind:class="{'headerbuttonMOBILE': isMobile(), 'headerbutton': !isMobile()}" onclick="photosbutton()" v-html="currentTabState == 'photos' ? 'PHOTOS' : 'Photos'">Photos</button>
					<button v-bind:class="{'headerbuttonMOBILE': isMobile(), 'headerbutton': !isMobile()}" onclick="otherbutton()"  v-html="currentTabState == 'other' ? 'OTHER' : 'Other'">Other</button>
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
							I am currently a <a class="link" href="https://math.mit.edu/" target="_blank">Course 18</a> Major at <a class="link" href="https://mit.edu/" target="_blank">MIT</a>.
							I am a 2025 <a class = "link" target="_blank" href="https://goldwaterscholarship.gov/">Barry Goldwater</a> scholar.
							<br><br>
							Previously, I attended <a class="link" href="https://www.ucsb.edu/" target = "_blank">University of California: Santa Barbara</a> for two years as part of the <a class="link" href="https://ccs.ucsb.edu/" target="_blank">CCS</a> <a class="link" href="https://ccs.ucsb.edu/majors/mathematics" target="_blank">Mathematics</a> program. 
							I was <a class = "link" target="_blank" href="https://kskedlaya.org/putnam-archive/AnnouncementOfWinners2024.pdf">6th place</a> individually and part of the 5th place team in the William Lowell Putnam Mathematical Competition in 2024.
							<br><br>
							My primary interests are algebraic, especially algebraic number theory. I also enjoy both <i>p</i>-adic analysis and <i>L</i>-functions.
							<br><br>
							Some of my hobbies include tennis, bridge 
							(recently I've been playing exclusively <a class="link" href="https://en.wikipedia.org/wiki/2/1_game_forcing" target="_blank">2-over-1</a> and <a class="link" href="https://www.bridgewebs.com/porthcawl/ROMAN%20KEY%20CARD%20BLACKWOOD.htm" target = "_blank">RCKB1430</a>), 
							coding, and designing idle games. 
							Since May 2023, I've been keeping track of what I've done during ever half hour of every day.
							<br><br>
							I tutor mathematics - from competition math and calculus up to graduate level analysis and algebra.  Feel free to find my email below to reach out.
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
						v-html = "everSpelledSurname ? (atob('cGljb0BtaXQuZWR1Cg==') + ' (click to copy)') : 'Click or type out my last name to reveal institutional email'"
						onclick = "player.everSpelledSurname ? navigator.clipboard.writeText(atob('cGljb0BtaXQuZWR1Cg==')) : mobileRevealProfessionalEmail()"
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
				<span style="fontsize: 17px"v-html="'('+thispaper.status+')'"></span>
				<br>
				<span>Joint with 
					<span v-for="(person, index) in thispaper.collaborators" :key="index">
						<span v-html='0 < index ? "," : ""'></span>
						<span v-bind:class="{ 'nameHighlighted': highlightedNames.includes(person.toLowerCase()) }" @click="nameClicked(person)"
							v-html='capitalizeName(person)'
						></span>
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

 