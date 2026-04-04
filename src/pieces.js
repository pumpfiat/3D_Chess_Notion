import * as THREE from 'three';

// Procedural 3D Chess Pieces for Colosseum Clash
// Cinematic miniature wargame aesthetic using only primitive geometries

// Utility functions for materials and procedural details
function createMaterial(color, metalness = 0.5, roughness = 0.5, faction = 'kingdom') {
    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: metalness,
        roughness: roughness,
    });

    // Add faction-specific material properties
    switch (faction) {
        case 'cod':
            material.metalness = 0.8;
            material.roughness = 0.2;
            break;
        case 'kingdom':
            material.metalness = 0.9;
            material.roughness = 0.1;
            break;
        case 'tribe':
            material.metalness = 0.1;
            material.roughness = 0.8;
            break;
    }

    return material;
}

function addProceduralDetails(mesh, detailType = 'wear') {
    // Add subtle procedural details using geometry modifications
    // For now, we'll use simple scaling and positioning variations
    // In a full implementation, this could use custom shaders

    if (detailType === 'wear') {
        // Simulate edge wear by slightly deforming geometry
        mesh.scale.set(1 + Math.random() * 0.05, 1 + Math.random() * 0.05, 1 + Math.random() * 0.05);
    } else if (detailType === 'fabric') {
        // Simulate fabric texture through material properties
        mesh.material.roughness += 0.2;
    }
}

// Main piece creation function
export function createPiece(type, faction, side) {
    const group = new THREE.Group();
    group.userData = { type, faction, side, isPiece: true };

    const baseColor = side === 'white' ? 0xffffff : 0x333333;
    const accentColor = faction === 'cod' ? 0x444444 : faction === 'kingdom' ? 0xff0000 : 0x8B4513;

    switch (type) {
        case 'pawn':
            createPawn(group, faction, baseColor, accentColor);
            break;
        case 'rook':
            createRook(group, faction, baseColor, accentColor);
            break;
        case 'knight':
            createKnight(group, faction, baseColor, accentColor);
            break;
        case 'bishop':
            createBishop(group, faction, baseColor, accentColor);
            break;
        case 'queen':
            createQueen(group, faction, baseColor, accentColor);
            break;
        case 'king':
            createKing(group, faction, baseColor, accentColor);
            break;
    }

    // Scale to appropriate size (knight ~2.2-2.5 units tall)
    const scale = type === 'knight' ? 2.4 : 1.8;
    group.scale.setScalar(scale);

    return group;
}

// Pawn creation
function createPawn(group, faction, baseColor, accentColor) {
    // Simple humanoid pawn
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.8), createMaterial(baseColor, 0.3, 0.7, faction));
    body.name = 'body';
    group.add(body);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.25), createMaterial(baseColor, 0.1, 0.9, faction));
    head.position.y = 0.6;
    head.name = 'head';
    group.add(head);

    // Faction-specific details
    if (faction === 'cod') {
        const helmet = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.3), createMaterial(0x222222, 0.9, 0.1));
        helmet.position.y = 0.65;
        helmet.name = 'helmet';
        group.add(helmet);
    } else if (faction === 'kingdom') {
        const crown = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.2), createMaterial(0xffd700, 1.0, 0.0));
        crown.position.y = 0.75;
        crown.name = 'crown';
        group.add(crown);
    } else if (faction === 'tribe') {
        const feathers = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4), createMaterial(0xff4500, 0.0, 1.0));
        feathers.position.y = 0.8;
        feathers.name = 'feathers';
        group.add(feathers);
    }

    addProceduralDetails(body, 'wear');
}

// Rook creation
function createRook(group, faction, baseColor, accentColor) {
    // Tower-like structure
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.2), createMaterial(baseColor, 0.7, 0.3, faction));
    base.name = 'base';
    group.add(base);

    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 1.0), createMaterial(baseColor, 0.6, 0.4, faction));
    tower.position.y = 0.6;
    tower.name = 'tower';
    group.add(tower);

    // Battlements
    for (let i = 0; i < 8; i++) {
        const battlement = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.08), createMaterial(baseColor, 0.8, 0.2, faction));
        battlement.position.set(
            Math.cos(i * Math.PI / 4) * 0.35,
            1.05,
            Math.sin(i * Math.PI / 4) * 0.35
        );
        battlement.name = `battlement${i}`;
        group.add(battlement);
    }

    addProceduralDetails(tower, 'wear');
}

// Knight creation - MOST IMPORTANT
function createKnight(group, faction, baseColor, accentColor) {
    // Horse body
    const horseBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 1.2), createMaterial(0x8B4513, 0.1, 0.8, faction));
    horseBody.name = 'horseBody';
    horseBody.rotation.z = Math.PI / 2;
    horseBody.position.set(0, 0.3, 0);
    group.add(horseBody);

    // Horse head
    const horseHead = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.4), createMaterial(0x8B4513, 0.1, 0.8, faction));
    horseHead.name = 'horseHead';
    horseHead.position.set(0.6, 0.7, 0);
    horseHead.rotation.z = -Math.PI / 6;
    group.add(horseHead);

    // Horse legs (4 legs)
    const legPositions = [
        { x: -0.2, z: -0.3, name: 'leftFrontLeg' },
        { x: 0.2, z: -0.3, name: 'rightFrontLeg' },
        { x: -0.2, z: 0.3, name: 'leftRearLeg' },
        { x: 0.2, z: 0.3, name: 'rightRearLeg' }
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.6), createMaterial(0x654321, 0.1, 0.9, faction));
        leg.position.set(pos.x, -0.1, pos.z);
        leg.name = pos.name;
        group.add(leg);
    });

    // Horse tail
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.02, 0.4), createMaterial(0x2F1B14, 0.0, 1.0, faction));
    tail.position.set(-0.5, 0.5, 0);
    tail.rotation.z = Math.PI / 4;
    tail.name = 'tail';
    group.add(tail);

    // Rider
    const rider = new THREE.Group();
    rider.name = 'rider';
    rider.position.set(0.2, 0.8, 0);
    group.add(rider);

    // Rider body
    const riderBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.5), createMaterial(baseColor, 0.5, 0.5, faction));
    riderBody.name = 'riderBody';
    rider.add(riderBody);

    // Rider head
    const riderHead = new THREE.Mesh(new THREE.SphereGeometry(0.12), createMaterial(baseColor, 0.2, 0.8, faction));
    riderHead.position.y = 0.35;
    riderHead.name = 'riderHead';
    rider.add(riderHead);

    // Rider arms
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4), createMaterial(baseColor, 0.3, 0.7, faction));
    leftArm.position.set(-0.2, 0.1, 0);
    leftArm.rotation.z = Math.PI / 3;
    leftArm.name = 'leftArm';
    rider.add(leftArm);

    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4), createMaterial(baseColor, 0.3, 0.7, faction));
    rightArm.position.set(0.2, 0.1, 0);
    rightArm.rotation.z = -Math.PI / 3;
    rightArm.name = 'rightArm';
    rider.add(rightArm);

    // Rider legs
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5), createMaterial(baseColor, 0.4, 0.6, faction));
    leftLeg.position.set(-0.1, -0.3, 0);
    leftLeg.name = 'leftLeg';
    rider.add(leftLeg);

    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5), createMaterial(baseColor, 0.4, 0.6, faction));
    rightLeg.position.set(0.1, -0.3, 0);
    rightLeg.name = 'rightLeg';
    rider.add(rightLeg);

    // Faction-specific rider details and weapons
    switch (faction) {
        case 'cod':
            // Tactical soldier with helmet and assault rifle
            const helmet = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.15), createMaterial(0x222222, 0.9, 0.1));
            helmet.position.y = 0.4;
            helmet.name = 'helmet';
            rider.add(helmet);

            // Body armor
            const armor = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.6, 0.15), createMaterial(0x333333, 0.7, 0.3));
            armor.position.y = 0.05;
            armor.name = 'armor';
            rider.add(armor);

            // Assault rifle
            const rifle = new THREE.Group();
            rifle.name = 'weapon';
            rifle.position.set(0.25, 0.15, 0.1);
            rifle.rotation.set(0, Math.PI / 6, -Math.PI / 4);
            rider.add(rifle);

            const rifleBody = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8), createMaterial(0x222222, 0.8, 0.2));
            rifle.add(rifleBody);

            const rifleStock = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.15, 0.08), createMaterial(0x654321, 0.1, 0.9));
            rifleStock.position.set(0, -0.4, 0);
            rifle.add(rifleStock);
            break;

        case 'kingdom':
            // Ornate silver armor, red cape, crowned helmet, longsword
            const crownHelmet = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.18), createMaterial(0xffd700, 1.0, 0.0));
            crownHelmet.position.y = 0.42;
            crownHelmet.name = 'helmet';
            rider.add(crownHelmet);

            // Crown spikes
            for (let i = 0; i < 5; i++) {
                const spike = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.08), createMaterial(0xffd700, 1.0, 0.0));
                spike.position.set(
                    Math.cos(i * Math.PI * 2 / 5) * 0.12,
                    0.48,
                    Math.sin(i * Math.PI * 2 / 5) * 0.12
                );
                rider.add(spike);
            }

            // Silver armor
            const silverArmor = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.55), createMaterial(0xC0C0C0, 0.95, 0.05));
            silverArmor.position.y = 0.05;
            silverArmor.name = 'armor';
            rider.add(silverArmor);

            // Red cape
            const cape = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.6), createMaterial(accentColor, 0.0, 1.0));
            cape.position.set(0, 0.1, -0.15);
            cape.rotation.x = -Math.PI / 6;
            cape.name = 'cape';
            rider.add(cape);

            // Longsword
            const sword = new THREE.Group();
            sword.name = 'weapon';
            sword.position.set(0.3, 0.2, 0);
            sword.rotation.set(0, -Math.PI / 6, Math.PI / 3);
            rider.add(sword);

            const blade = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.6, 0.01), createMaterial(0xC0C0C0, 0.9, 0.1));
            blade.position.y = 0.3;
            sword.add(blade);

            const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.15), createMaterial(0x654321, 0.1, 0.9));
            hilt.position.y = -0.05;
            sword.add(hilt);
            break;

        case 'tribe':
            // Bone armor, warpaint, feathers, giant double-headed axe
            const boneHelmet = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 0.16), createMaterial(0xF5F5DC, 0.2, 0.8));
            boneHelmet.position.y = 0.41;
            boneHelmet.name = 'helmet';
            rider.add(boneHelmet);

            // Bone armor pieces
            const boneArmor = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.52), createMaterial(0xF5F5DC, 0.3, 0.7));
            boneArmor.position.y = 0.05;
            boneArmor.name = 'armor';
            rider.add(boneArmor);

            // Feathers
            const featherHead = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3), createMaterial(0xff4500, 0.0, 1.0));
            featherHead.position.y = 0.55;
            featherHead.name = 'feathers';
            rider.add(featherHead);

            // War paint (simulated with colored spheres)
            const paint1 = new THREE.Mesh(new THREE.SphereGeometry(0.03), createMaterial(accentColor, 0.0, 1.0));
            paint1.position.set(0.08, 0.38, 0.1);
            rider.add(paint1);

            const paint2 = new THREE.Mesh(new THREE.SphereGeometry(0.03), createMaterial(accentColor, 0.0, 1.0));
            paint2.position.set(-0.08, 0.38, 0.1);
            rider.add(paint2);

            // Giant double-headed axe
            const axe = new THREE.Group();
            axe.name = 'weapon';
            axe.position.set(0.35, 0.15, 0);
            axe.rotation.set(0, Math.PI / 4, -Math.PI / 6);
            rider.add(axe);

            const axeHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0), createMaterial(0x654321, 0.1, 0.9));
            axeHandle.position.y = 0;
            axe.add(axeHandle);

            // Axe heads (double-headed)
            const axeHead1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.02), createMaterial(0x2F1B14, 0.8, 0.2));
            axeHead1.position.y = 0.5;
            axe.add(axeHead1);

            const axeHead2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.02), createMaterial(0x2F1B14, 0.8, 0.2));
            axeHead2.position.y = -0.5;
            axe.add(axeHead2);
            break;
    }

    addProceduralDetails(horseBody, 'wear');
}

// Bishop creation
function createBishop(group, faction, baseColor, accentColor) {
    // Mitre-like structure
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.3), createMaterial(baseColor, 0.6, 0.4, faction));
    base.name = 'base';
    group.add(base);

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 0.8), createMaterial(baseColor, 0.5, 0.5, faction));
    body.position.y = 0.55;
    body.name = 'body';
    group.add(body);

    // Mitre hat
    const mitre = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.4), createMaterial(accentColor, 0.1, 0.9, faction));
    mitre.position.y = 1.0;
    mitre.name = 'mitre';
    group.add(mitre);

    // Cross on top
    const crossVertical = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.15, 0.02), createMaterial(0xffd700, 1.0, 0.0));
    crossVertical.position.y = 1.15;
    group.add(crossVertical);

    const crossHorizontal = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.02), createMaterial(0xffd700, 1.0, 0.0));
    crossHorizontal.position.y = 1.15;
    group.add(crossHorizontal);

    addProceduralDetails(body, 'fabric');
}

// Queen creation
function createQueen(group, faction, baseColor, accentColor) {
    // Crown-like structure
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.3), createMaterial(baseColor, 0.6, 0.4, faction));
    base.name = 'base';
    group.add(base);

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.9), createMaterial(baseColor, 0.5, 0.5, faction));
    body.position.y = 0.6;
    body.name = 'body';
    group.add(body);

    // Crown
    const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.28, 0.15), createMaterial(0xffd700, 1.0, 0.0));
    crownBase.position.y = 1.05;
    crownBase.name = 'crownBase';
    group.add(crownBase);

    // Crown spikes
    for (let i = 0; i < 8; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.12), createMaterial(0xffd700, 1.0, 0.0));
        spike.position.set(
            Math.cos(i * Math.PI / 4) * 0.22,
            1.12,
            Math.sin(i * Math.PI / 4) * 0.22
        );
        spike.name = `crownSpike${i}`;
        group.add(spike);
    }

    addProceduralDetails(body, 'fabric');
}

// King creation
function createKing(group, faction, baseColor, accentColor) {
    // Larger crown-like structure
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.3), createMaterial(baseColor, 0.6, 0.4, faction));
    base.name = 'base';
    group.add(base);

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 1.0), createMaterial(baseColor, 0.5, 0.5, faction));
    body.position.y = 0.65;
    body.name = 'body';
    group.add(body);

    // Crown
    const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.33, 0.18), createMaterial(0xffd700, 1.0, 0.0));
    crownBase.position.y = 1.15;
    crownBase.name = 'crownBase';
    group.add(crownBase);

    // Crown spikes (larger than queen)
    for (let i = 0; i < 10; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.15), createMaterial(0xffd700, 1.0, 0.0));
        spike.position.set(
            Math.cos(i * Math.PI * 2 / 10) * 0.25,
            1.22,
            Math.sin(i * Math.PI * 2 / 10) * 0.25
        );
        spike.name = `crownSpike${i}`;
        group.add(spike);
    }

    // Orb and cross
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.08), createMaterial(0x4169E1, 0.9, 0.1));
    orb.position.y = 1.35;
    orb.name = 'orb';
    group.add(orb);

    const cross = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.1, 0.02), createMaterial(0xffd700, 1.0, 0.0));
    cross.position.y = 1.4;
    group.add(cross);

    addProceduralDetails(body, 'wear');
}

// Walking animation system
export function animatePieceWalk(piece, time, isMoving) {
    if (!isMoving) return;

    const speed = 2; // Animation speed multiplier
    const t = time * speed;

    // Find named children for animation
    const horseBody = piece.getObjectByName('horseBody');
    const horseHead = piece.getObjectByName('horseHead');
    const leftFrontLeg = piece.getObjectByName('leftFrontLeg');
    const rightFrontLeg = piece.getObjectByName('rightFrontLeg');
    const leftRearLeg = piece.getObjectByName('leftRearLeg');
    const rightRearLeg = piece.getObjectByName('rightRearLeg');
    const rider = piece.getObjectByName('rider');
    const weapon = rider ? rider.getObjectByName('weapon') : null;

    if (piece.userData.type === 'knight' && horseBody) {
        // Horse walking animation
        const walkCycle = Math.sin(t) * 0.3;

        // Horse body bob
        horseBody.position.y = 0.3 + Math.abs(walkCycle) * 0.05;

        // Horse head bob
        if (horseHead) {
            horseHead.position.y = 0.7 + walkCycle * 0.02;
        }

        // Leg animations (diagonal pairs move together)
        if (leftFrontLeg && rightRearLeg) {
            leftFrontLeg.rotation.x = walkCycle;
            rightRearLeg.rotation.x = walkCycle;
        }
        if (rightFrontLeg && leftRearLeg) {
            rightFrontLeg.rotation.x = -walkCycle;
            leftRearLeg.rotation.x = -walkCycle;
        }

        // Rider body bob
        if (rider) {
            rider.position.y = 0.8 + Math.abs(walkCycle) * 0.03;
        }

        // Weapon sway
        if (weapon) {
            weapon.rotation.z = -Math.PI / (piece.userData.faction === 'cod' ? 4 : piece.userData.faction === 'kingdom' ? 3 : 6) + walkCycle * 0.1;
        }

    } else {
        // Simplified walking for other pieces (if they had legs)
        // For now, just a simple bob animation
        piece.position.y = Math.abs(Math.sin(t)) * 0.05;
    }
}
