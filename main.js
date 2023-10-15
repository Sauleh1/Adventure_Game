#!/usr/bin/env node
import inquirer from "inquirer";
import randomInteger from "random-int";
import chalk from "chalk";
// Project 7: __Adventure-Game__
console.log("----------------------------------------");
console.log("\tWelcome to the dungeon!");
console.log("----------------------------------------");
class _Player_ {
    PlayerHP = 100;
    PlayerDMG = randomInteger(20, 25);
    PotionsOHealth = 3;
    DropChance = 50;
}
class _Enemys_ {
    EnemyHP = 80;
    Enemies = [`Zombie`, `Skeleton`, `Warrior`, `Assasin`];
    EnemyDMG = 20;
}
let Player = new _Player_();
let Enemy = new _Enemys_();
// Game starts Now
const make_game = await inquirer.prompt([
    {
        message: chalk.redBright(`A ${Enemy.Enemies[randomInteger(0, 3)]} has appeared! What will you do?`),
        type: "list",
        choices: [`Attack`, `Run away!`],
        name: "ChoicesToPlayer"
    }
]);
while (true) {
    let { ChoicesToPlayer } = make_game;
    if (make_game) {
        if (ChoicesToPlayer === "Attack") {
            let DifferentAttacks = await inquirer.prompt([
                {
                    message: chalk.cyan.italic("Which action to do?"),
                    type: "list",
                    choices: [`Slash`, `High Jump Kick`, `Rockfall`, `Ancient Power`, `Drink Health Potion`],
                    name: "AttackChoices"
                },
            ]);
            let { AttackChoices } = DifferentAttacks;
            if (AttackChoices) {
                if (DifferentAttacks.AttackChoices === "Slash") {
                    Enemy.EnemyHP = Enemy.EnemyHP - Player.PlayerDMG;
                    Player.PlayerHP = Player.PlayerHP - Enemy.EnemyDMG;
                    console.log(`You Slashed the enemy with your sword, dealing ${Player.PlayerDMG} Damage! The enemy now has ${Enemy.EnemyHP} HP left!`);
                    console.log(chalk.cyanBright.italic(`The enemy retaliated, hitting you for ${Enemy.EnemyDMG} Damage! You now have ${Player.PlayerHP} HP Left!`)); // 2
                }
                else if (DifferentAttacks.AttackChoices === "High Jump Kick") {
                    Enemy.EnemyHP = Enemy.EnemyHP - Player.PlayerDMG;
                    Player.PlayerHP = Player.PlayerHP - Enemy.EnemyDMG;
                    console.log(`You Jumped high in the sky and Kicked the enemy, dealing ${Player.PlayerDMG} Damage! The enemy now has ${Enemy.EnemyHP} HP left!`);
                    console.log(chalk.cyanBright.italic(`The enemy retaliated, hitting you for ${Enemy.EnemyDMG} Damage! You now have ${Player.PlayerHP} HP Left!`)); // 2
                }
                else if (DifferentAttacks.AttackChoices === "Rockfall") {
                    Enemy.EnemyHP = Enemy.EnemyHP - Player.PlayerDMG;
                    Player.PlayerHP = Player.PlayerHP - Enemy.EnemyDMG;
                    console.log(chalk.cyanBright.italic(`You Sent a huge wall of rocks falling down on the enemy, dealing ${Player.PlayerDMG} Damage! The enemy now has ${Enemy.EnemyHP} HP left!`));
                    console.log(chalk.cyanBright.italic(`The enemy retaliated, hitting you for ${Enemy.EnemyDMG} Damage! You now have ${Player.PlayerHP} HP Left!`)); // 2
                }
                else if (DifferentAttacks.AttackChoices === "Ancient Power") {
                    Enemy.EnemyHP = Enemy.EnemyHP - Player.PlayerDMG;
                    Player.PlayerHP = Player.PlayerHP - Enemy.EnemyDMG;
                    console.log(chalk.cyanBright.italic(`You Used the power of stones from the ground and threw them at your opponent, dealing ${Player.PlayerDMG} Damage! The enemy now has ${Enemy.EnemyHP} HP left!`));
                    console.log(chalk.cyanBright.italic(`The enemy retaliated, hitting you for ${Enemy.EnemyDMG} Damage! You now have ${Player.PlayerHP} HP Left!`)); // 2
                }
                else if (DifferentAttacks.AttackChoices === "Drink Health Potion") {
                    if (Player.PotionsOHealth > 0) {
                        Player.PlayerHP = Player.PlayerHP + 60;
                        Player.PotionsOHealth = Player.PotionsOHealth - 1;
                        console.log(chalk.redBright(`You drank a Health potion and Regained 60 Health!`));
                        console.log(chalk.redBright(`You now have ${Player.PotionsOHealth} Potions of Health left.!`));
                    }
                    else {
                        console.log(chalk.redBright.bold("You dont have any Health Potions left!"));
                    }
                }
            }
        }
        if (Player.PlayerHP <= 0) {
            console.log(chalk.red(`You were too weak to go on, so You limped out of the dungeon.`));
            console.log("----------------------------------------------------------");
            console.log("\tTHANKS FOR PLAYING!");
            console.log("----------------------------------------------------------");
            process.exit();
        }
        else if (Enemy.EnemyHP <= 0) {
            let Escape_Or_Not = await inquirer.prompt([
                {
                    message: chalk.italic("You defeated the enemy! What to do now?"),
                    type: "list",
                    choices: [`1. Go on`, `2. Escape the Dungeon`],
                    name: "EscapeOrGoOn"
                }
            ]);
            let randomInt = randomInteger(1, 100);
            if (Escape_Or_Not.EscapeOrGoOn === "1. Go on") {
                if (randomInt <= Player.DropChance) {
                    Enemy.EnemyHP = Enemy.EnemyHP + 120;
                    console.log(chalk.greenBright.italic(`The enemy Dropped a health potion!`));
                    Player.PotionsOHealth = Player.PotionsOHealth + 1;
                    console.log(chalk.grey.italic(`You encountered a ${Enemy.Enemies[randomInteger(0, 3)]}!`));
                }
                else {
                    Enemy.EnemyHP = Enemy.EnemyHP + 120;
                    console.log(chalk.grey.italic(`You encountered a ${Enemy.Enemies[randomInteger(0, 3)]}!`));
                }
            }
            else {
                console.log(chalk.greenBright(`You left the dungeon, successful in your Adventures!`));
                console.log("----------------------------------------------------------");
                console.log("\tTHANKS FOR PLAYING!");
                console.log("----------------------------------------------------------");
                process.exit();
            }
        }
    }
    if (make_game.ChoicesToPlayer === "Run away!") {
        console.log(`------------------------`);
        console.log(chalk.yellowBright(`You Ran away with your remaining strength!`));
        process.exit();
    }
}
