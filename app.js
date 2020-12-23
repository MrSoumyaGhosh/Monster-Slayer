function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			gameRound: 0,
			winner: null,
			messageLogs: [],
		};
	},
	computed: {
		monsterHealthBarStyle() {
			if (this.monsterHealth < 0) {
				return { width: "0%" };
			}
			return { width: this.monsterHealth + "%" };
		},
		playerHealthBarStyle() {
			if (this.playerHealth < 0) {
				return { width: "0%" };
			}
			return { width: this.playerHealth + "%" };
		},
		isAvailableSpecialAttack() {
			return this.gameRound % 3 !== 0;
		},
	},
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.monsterHealth <= 0) {
				//draw
				this.winner = "draw";
			} else if (value <= 0) {
				//monster wins
				this.winner = "monster";
			}
		},
		monsterHealth(value) {
			if (value <= 0 && this.playerHealth <= 0) {
				//draw
				this.winner = "draw";
			} else if (value <= 0) {
				//player wins
				this.winner = "player";
			}
		},
	},
	methods: {
		attackMonster() {
			this.gameRound += 1;
			let attackValue = generateRandomNumber(5, 10);
			this.monsterHealth -= attackValue;
			this.addMessageLog("player", "attack", attackValue);
			this.attackPlayer();
		},
		attackPlayer() {
			let attackValue = generateRandomNumber(8, 12);
			this.playerHealth -= attackValue;
			this.addMessageLog("monster", "attack", attackValue);
		},
		specialAttackMonster() {
			this.gameRound += 1;
			let attackValue = generateRandomNumber(10, 25);
			this.monsterHealth -= attackValue;
			this.addMessageLog("player", "attack", attackValue);
			this.attackPlayer();
		},
		healPlayer() {
			this.gameRound += 1;
			let randomHealValue = generateRandomNumber(10, 20);
			if (this.playerHealth + randomHealValue > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += randomHealValue;
			}
			this.addMessageLog("player", "heals", randomHealValue);
			this.attackPlayer();
		},
		restartGame() {
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.gameRound = 0;
			this.winner = null;
			this.messageLogs = [];
		},
		surrender() {
			this.playerHealth = 0;
		},
		addMessageLog(who, what, value) {
			this.messageLogs.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value,
			});
		},
	},
});
app.mount("#game");
