// Enum для типів героїв
enum HeroType {
    Warrior = "WARRIOR",
    Mage = "MAGE",
    Archer = "ARCHER"
}

// Enum для типів атак
enum AttackType {
    Physical = "PHYSICAL",
    Magical = "MAGICAL",
    Ranged = "RANGED"
}

// Interface для характеристик героя
interface HeroStats {
    health: number;
    attack: number;
    defense: number;
    speed: number;
}

// Interface для героя
interface Hero {
    id: number;
    name: string;
    type: HeroType;
    attackType: AttackType;
    stats: HeroStats;
    isAlive: boolean;
}

// Type для результату атаки
type AttackResult = {
    damage: number;
    isCritical: boolean;
    remainingHealth: number;
};

// Функція створення нового героя
function createHero(id: number, name: string, type: HeroType): Hero {
    let stats: HeroStats;
    let attackType: AttackType;

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
        id,
        name,
        type,
        attackType,
        stats,
        isAlive: true
    };
}

// Функція розрахунку пошкодження
function calculateDamage(attacker: Hero, defender: Hero): AttackResult {
    const baseDamage = Math.max(attacker.stats.attack - defender.stats.defense, 0);
    const isCritical = Math.random() < 0.2;
    const damage = isCritical ? baseDamage * 2 : baseDamage;

    defender.stats.health = Math.max(defender.stats.health - damage, 0);
    if (defender.stats.health <= 0) {
        defender.isAlive = false;
    }

    return { damage, isCritical, remainingHealth: defender.stats.health };
}

// Generic функція для пошуку героя
function findHeroByProperty<T extends keyof Hero>(
    heroes: Hero[],
    property: T,
    value: Hero[T]
): Hero | undefined {
    for (let hero of heroes) {
        if (hero[property] === value) {
            return hero;
        }
    }
    return undefined;
}

// Функція проведення раунду бою між героями
function battleRound(hero1: Hero, hero2: Hero): string {
    if (!hero1.isAlive || !hero2.isAlive) {
        return `Бій не може відбутися. Один з героїв мертвий.`;
    }

    const attacker = hero1.stats.speed >= hero2.stats.speed ? hero1 : hero2;
    const defender = attacker === hero1 ? hero2 : hero1;

    const result = calculateDamage(attacker, defender);
    return `${attacker.name} атакує ${defender.name} на ${result.damage} урону${result.isCritical ? " (КРИТ!)" : ""}. У ${defender.name} залишилось ${result.remainingHealth} HP.`;
}

// Масив героїв
const heroes: Hero[] = [
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
while (heroes.filter(hero => hero.isAlive).length > 1) {
    const aliveHeroes = heroes.filter(hero => hero.isAlive);
    const attacker = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
    let defender;
    do {
        defender = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
    } while (attacker === defender);

    console.log(battleRound(attacker, defender));
}

console.log("\n--- Кінець бою ---");
console.log("Статистика після бою:");
heroes.forEach(hero => {
    console.log(`${hero.name} - HP: ${hero.stats.health}, Alive: ${hero.isAlive}`);
});