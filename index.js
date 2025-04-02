// Enum для типів героїв
var HeroType;
(function (HeroType) {
    HeroType["Warrior"] = "WARRIOR";
    HeroType["Mage"] = "MAGE";
    HeroType["Archer"] = "ARCHER";
})(HeroType || (HeroType = {}));
// Enum для типів атак
var AttackType;
(function (AttackType) {
    AttackType["Physical"] = "PHYSICAL";
    AttackType["Magical"] = "MAGICAL";
    AttackType["Ranged"] = "RANGED";
})(AttackType || (AttackType = {}));
// Функція створення нового героя
function createHero(id, name, type) {
    var stats;
    var attackType;
    switch (type) {
        case HeroType.Warrior:
            stats = { health: 120, attack: 30, defense: 20, speed: 25 };
            attackType = AttackType.Physical;
            break;
        case HeroType.Mage:
            stats = { health: 80, attack: 50, defense: 10, speed: 35 };
            attackType = AttackType.Magical;
            break;
        case HeroType.Archer:
            stats = { health: 100, attack: 40, defense: 15, speed: 30 };
            attackType = AttackType.Ranged;
            break;
    }
    return {
        id: id,
        name: name,
        type: type,
        attackType: attackType,
        stats: stats,
        isAlive: true
    };
}
// Функція розрахунку пошкодження
function calculateDamage(attacker, defender) {
    var baseDamage = Math.max(attacker.stats.attack - defender.stats.defense, 0);
    var isCritical = Math.random() < 0.2;
    var damage = isCritical ? baseDamage * 2 : baseDamage;
    defender.stats.health = Math.max(defender.stats.health - damage, 0);
    if (defender.stats.health <= 0) {
        defender.isAlive = false;
    }
    return { damage: damage, isCritical: isCritical, remainingHealth: defender.stats.health };
}
// Generic функція для пошуку героя
function findHeroByProperty(heroes, property, value) {
    for (var _i = 0, heroes_1 = heroes; _i < heroes_1.length; _i++) {
        var hero = heroes_1[_i];
        if (hero[property] === value) {
            return hero;
        }
    }
    return undefined;
}
// Функція проведення раунду бою між героями
function battleRound(hero1, hero2) {
    if (!hero1.isAlive || !hero2.isAlive) {
        return "\u0411\u0456\u0439 \u043D\u0435 \u043C\u043E\u0436\u0435 \u0432\u0456\u0434\u0431\u0443\u0442\u0438\u0441\u044F. \u041E\u0434\u0438\u043D \u0437 \u0433\u0435\u0440\u043E\u0457\u0432 \u043C\u0435\u0440\u0442\u0432\u0438\u0439.";
    }
    var attacker = hero1.stats.speed >= hero2.stats.speed ? hero1 : hero2;
    var defender = attacker === hero1 ? hero2 : hero1;
    var result = calculateDamage(attacker, defender);
    return "".concat(attacker.name, " \u0430\u0442\u0430\u043A\u0443\u0454 ").concat(defender.name, " \u043D\u0430 ").concat(result.damage, " \u0443\u0440\u043E\u043D\u0443").concat(result.isCritical ? " (КРИТ!)" : "", ". \u0423 ").concat(defender.name, " \u0437\u0430\u043B\u0438\u0448\u0438\u043B\u043E\u0441\u044C ").concat(result.remainingHealth, " HP.");
}
// Масив героїв
var heroes = [
    createHero(1, "Дмитро", HeroType.Warrior),
    createHero(2, "Мерлін", HeroType.Mage),
    createHero(3, "Робін", HeroType.Archer),
    createHero(4, "Артур", HeroType.Warrior),
    createHero(5, "Гендальф", HeroType.Mage)
];
// Виконання тестового сценарію
console.log("--- Початок тестового сценарію ---");
console.log("Пошук героя за типом Mage:", findHeroByProperty(heroes, "type", HeroType.Mage));
console.log("Пошук героя за іменем Робін:", findHeroByProperty(heroes, "name", "Робін"));
console.log("Пошук героя за ID 1:", findHeroByProperty(heroes, "id", 1));
console.log("\n=== Початок боїв ===");
while (heroes.filter(function (hero) { return hero.isAlive; }).length > 1) {
    var aliveHeroes = heroes.filter(function (hero) { return hero.isAlive; });
    var attacker = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
    var defender = void 0;
    do {
        defender = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
    } while (attacker === defender);
    console.log(battleRound(attacker, defender));
}
console.log("\n--- Кінець бою ---");
console.log("Статистика після бою:");
heroes.forEach(function (hero) {
    console.log("".concat(hero.name, " - HP: ").concat(hero.stats.health, ", Alive: ").concat(hero.isAlive));
});
