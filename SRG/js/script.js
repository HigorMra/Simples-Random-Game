const characters = [
    { name: 'Guerreiro', health: 100, attack: 10, defense: 5 },
    { name: 'Mago', health: 80, attack: 15, defense: 3 },
    { name: 'Arqueiro', health: 90, attack: 12, defense: 4 }
];

let player = { name: '', health: 0, attack: 0, defense: 0, xp: 0 };

function chooseCharacter() {
    const characterIndex = document.getElementById('characterSelect').value;
    const character = characters[characterIndex];
    player = { ...character, xp: 0 };
    document.getElementById('output').innerText = `Você escolheu o ${character.name}! Status: HP ${character.health}, Ataque ${character.attack}, Defesa ${character.defense}`;
}

function battle() {
    if (!player.name) {
        document.getElementById('output').innerText = 'Escolha um personagem antes de começar a batalha!';
        return;
    }

    const enemy = { name: 'Inimigo', health: 50, attack: 8, defense: 2 };

    document.getElementById('output').innerText = `Batalha contra o ${enemy.name}!`;
    document.getElementById('output').innerText += `\nStatus do ${player.name}: HP ${player.health}, Ataque ${player.attack}, Defesa ${player.defense}`;
    document.getElementById('output').innerText += `\nStatus do ${enemy.name}: HP ${enemy.health}, Ataque ${enemy.attack}, Defesa ${enemy.defense}`;

    while (player.health > 0 && enemy.health > 0) {
        const playerDamage = Math.max(0, player.attack - enemy.defense);
        const enemyDamage = Math.max(0, enemy.attack - player.defense);

        enemy.health -= playerDamage;
        player.health -= enemyDamage;

        document.getElementById('output').innerText += `\n${player.name} ataca o ${enemy.name} e causa ${playerDamage} de dano.`;
        document.getElementById('output').innerText += `\n${enemy.name} ataca o ${player.name} e causa ${enemyDamage} de dano.`;

        if (player.health <= 0) {
            document.getElementById('output').innerText += `\n${player.name} foi derrotado!`;
            break;
        } else if (enemy.health <= 0) {
            document.getElementById('output').innerText += `\n${enemy.name} foi derrotado!`;
            player.xp += 10;
            document.getElementById('output').innerText += `\n${player.name} ganhou 10 pontos de experiência.`;
        }
    }

    document.getElementById('output').innerText += `\nStatus final do ${player.name}: HP ${player.health}, XP ${player.xp}`;
}
