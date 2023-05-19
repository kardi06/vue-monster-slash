function randomValue(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHp : 100,
            monHp : 100,
            currentRound : 0,
            winner : null,
            logMessages : []
        }
    },
    computed:{
        monBarStyle(){
            if(this.monHp < 0){
                return {width:'0%'};
            }
            return {width:this.monHp + '%'};
        },
        playerBarStyle(){
            if(this.playerHp < 0){
                return {width:'0%'};
            }
            return {width:this.playerHp + '%'};
        },
        canUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },
    watch:{
        playerHp(value){
            if(value <= 0 && this.monHp <= 0){
                this.winner = 'draw';
            }else if(value <=0){
                this.winner = 'monster';
            }
        },
        monHp(value){
            if(value <= 0 && this.playerHp <= 0){
                this.winner = 'draw';
            }else if(value <=0){
                this.winner = 'player';
            }
        }
    },
    methods: {
        attackMon(){
            // const attackVal = Math.floor(Math.random() * (12 - 5)) + 5;
            this.currentRound++;
            const attackVal = randomValue(5,12);
            this.monHp -= attackVal;
            this.addLogMessage('player','attack',attackVal);
            this.attackPlayer();
        },
        attackPlayer()
        {
            // const attackVal = Math.floor(Math.random() * (15 - 8)) + 8;
            const attackVal = randomValue(8,15);
            this.playerHp -= attackVal;
            this.addLogMessage('monster','attack',attackVal);
        },
        specialAttackMon()
        {
            this.currentRound++;
            const attackVal = randomValue(10,20);
            this.monHp -= attackVal;
            this.addLogMessage('player','attack',attackVal);
            this.attackPlayer();
        },

        healPlayer()
        {
            this.currentRound++;
            const healVal = randomValue(8,20);
            if(this.playerHp + healVal > 100){
                this.playerHp = 100
            }else{
                this.playerHp = this.playerHp + healVal;
            }
            this.addLogMessage('player','heal',healVal);
            this.attackPlayer();
        },
        newGame(){
            this.playerHp = 100;
            this.monHp = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surren(){
            this.winner = 'monster';
        },

        addLogMessage(who,what,value){
            this.logMessages.unshift({
                actionBy : who,
                actionType : what,
                actionValue : value
            });
        }
    }    
});

app.mount('#game');