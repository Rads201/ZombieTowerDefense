import Projectile from "./Projectile.js";
export default class Tower extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, projectileTexture, damage, range, speed) {
        super(scene, x, y, texture);

        this.damage = damage || 100;
        this.range = range || 200;
        this.speed = speed || 5000;
        this.canAttack = true;

        this.projectileTexture = projectileTexture;

        // Graphics to draw the range
        //this.rangeGraphics = scene.add.graphics({ lineStyle: {width: 1, color:"#ff0000"} });
        //this.drawRange();

        scene.add.existing(this);
    }

    drawRange() {
        this.rangeGraphics.clear(); // Clear previous drawings
        this.rangeGraphics.strokeCircle(this.x, this.y, this.range);
    }

    enemyInRange(zombie) {
        const distance = Phaser.Math.Distance.Between(this.x, this.y, zombie.x, zombie.y);
        return distance <= this.range;
    }

    attack(zombies) {
        if (this.canAttack) {
            
            console.log("shoot");

            // attack delay
            this.canAttack = false;
            
            // find closest zombie
            const closestZombie = this.findClosetZombie(zombies);

            // create projectile
            if (closestZombie) {
                let projectile = new Projectile(this.scene, this.x, this.y, closestZombie.x, closestZombie.y, this.projectileTexture);
                projectile.fire(this.x, this.y, closestZombie.x, closestZombie.y);
                closestZombie.reduceHealth(this.damage);
                this.scene.audioManager.playSniperShootAudio();
            }

            setTimeout(() => {
                this.canAttack = true;
            }, this.speed);
        }

    }

    rotateTower(zombie) {
        let targetX = zombie.x;
        let targetY = zombie.y;

        // Calculate the angle towards the target
        let angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);

        // Set the turret roation to face the target
        const offset = Math.PI / 2;
        this.rotation = angle + offset;
    }

    findClosetZombie(zombies) {
        let closestZombie = null;
        let closestDistance = Infinity;

        for (const zombie of zombies) {
            if (this.enemyInRange(zombie)) {
                const distance = Phaser.Math.Distance.Between(this.x, this.y, zombie.x, zombie.y);
                if (distance < closestDistance) {
                    closestZombie = zombie;
                    closestDistance = distance;
                }
            }
        }

        return closestZombie;
    }

    update() { 
    let closestZombie = this.findClosetZombie(this.scene.zombies.children.entries);
    if (closestZombie) {
        this.rotateTower(closestZombie);
    }
}
}