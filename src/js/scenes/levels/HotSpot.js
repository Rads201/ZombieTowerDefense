import SniperTower from "../../objects/towers/SniperTower.js"
import MissileTower from "../../objects/towers/MissileTower.js"
import FlamethrowerTower from "../../objects/towers/FlamethrowerTower.js"

export function createHotSpot(object, scene, displayManager) {

    const tower = scene.add.sprite(object.x, object.y, 'hotspot').setOrigin(0.5);
    tower.setInteractive({cursor: 'pointer'});
    tower.on('pointerdown', () => {
        //console.log(displayManager.playerCurrencyManager.currentCurrency)
        const popUpMenu = scene.add.group();
        popUpMenu.setVisible(false);

        const menuBackground = scene.add.rectangle(105, 540, 350, 140, 0x333333);
        popUpMenu.add(menuBackground);
        menuBackground.setDepth(0);

        const menuItem1 = scene.add.text(10, 490, 'Sniper Tower - $100', {fill: '#ffffff'});
        const menuItem2 = scene.add.text(10, 520, 'Missile Tower - $200', {fill: '#ffffff'});
        const menuItem3 = scene.add.text(10, 550, 'Flamethrower Tower - $150', {fill: '#ffffff'});
        const menuExit = scene.add.text(10, 580, "Cancel", {fill: '#ffffff'});

        popUpMenu.add(menuItem1);
        popUpMenu.add(menuItem2);
        popUpMenu.add(menuItem3);
        popUpMenu.add(menuExit);

        menuItem1.setInteractive();
        menuItem2.setInteractive();
        menuItem3.setInteractive();
        menuExit.setInteractive();

        popUpMenu.setVisible(true);

        //Sniper Tower
        menuItem1.on('pointerdown', () => {
            if (displayManager.playerCurrencyManager.currentCurrency >= 100) {
                tower.destroy();
                const towerBase = scene.add.sprite(object.x, object.y, 'tower_base').setOrigin(0.5);
                towerBase.setScale(0.15);
                const sniperTower = new SniperTower(scene, object.x, object.y);
                scene.add.existing(sniperTower);
                scene.towers.push(sniperTower);
                sniperTower.setScale(0.15);
                displayManager.playerCurrencyManager.reduceCurrency(100);
            }
            popUpMenu.setVisible(false);
        });

        //Missile Tower
        menuItem2.on('pointerdown', () => {
            if (displayManager.playerCurrencyManager.currentCurrency >= 200) {
                tower.destroy();
                const towerBase = scene.add.sprite(object.x, object.y, 'tower_base');
                towerBase.setScale(0.15);
                const missileTower = new MissileTower(scene, object.x, object.y);
                scene.add.existing(missileTower);
                scene.towers.push(missileTower);
                missileTower.setScale(0.15);
                displayManager.playerCurrencyManager.reduceCurrency(200);
            }
            popUpMenu.setVisible(false);
        });

        //Flamethrower Tower
        menuItem3.on('pointerdown', () => {
            if (displayManager.playerCurrencyManager.currentCurrency >= 150) {
                tower.destroy();
                const towerBase = scene.add.sprite(object.x, object.y, 'tower_base');
                towerBase.setScale(0.15);
                const flamethrowerTower = new FlamethrowerTower(scene, object.x, object.y);
                scene.add.existing(flamethrowerTower);
                scene.towers.push(flamethrowerTower);
                flamethrowerTower.setScale(0.2);
                displayManager.playerCurrencyManager.reduceCurrency(150);
            }
            popUpMenu.setVisible(false);
        });

        menuExit.on('pointerdown', () => {
            popUpMenu.setVisible(false);
        });
    })

}