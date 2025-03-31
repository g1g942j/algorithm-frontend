const pheromoneInfluens = 1;
const distanceInfluens = 1;
const pheromoneEvaporation = 0.5;

class Ant{
    constructor(countSpot){
        this.visitedPlace = [];
        this.visitedPlace.push(Math.floor(Math.random()*countSpot));
    }

    visitPlace(pheromoneMass){
        lastPlace = this.visitPlace[-1];

    }

    getDistance(ant){
        distance = 0;
        for(index = 1; index < length(ant.visitPlace); index++){
            distance += distanceMass[index-1][index];
        }
        return distance;
    }
}

function getPheromone(countPlace){
    pheromoneMass = [countPlace][countPlace];
    for(i=0; i < countPlace; i++){
        for(j=0; j < countPlace; j++){
            pheromoneMass[i][j] = 1;
        }
    }
    return pheromoneMass;
}

function builAntColony(countAnt, countPlace){
    antColony = [];
    for(i=0; i < countAnt; i++){
        antColony.push(Ant(countPlace));
    }
    return antColony;
}

function epoch(antColony){
}

function updatePheromone(pheromoneMass, countPlace, antColony, pheromoneEvaporation){
    for(i=0; i < countPlace; i++){
        for(j=0; j < countPlace; j++){
            pheromoneMass[i][j] *= pheromoneEvaporation;
            for(ant in antColony){
                pheromoneMass[i][j] += 1 / ant.getDistance();
            }
        }
    }
}

function findBestAnt(antColony,  lastBestAnt){
    bestAnt = lastBestAnt;
    for(ant in antColony){
        if(ant.getDistance() < bestAnt.getDistance()){
            bestAnt = ant;
        }
    }
    return bestAnt;
}

function antAlgorithm(distanceMass, countPlace, countAnt, countEpoch){
    bestAnt;
    pheromoneMass = getPheromone(countPlace);
    for(i=0;i!=countEpoch;i++){
        antColony = builAntColony(countAnt, countPlace);
        for(j=0; j < countEpoch-1; j++){
            epoch(antColony);
            updatePheromone(pheromoneMass, countPlace, antColony, pheromoneEvaporatio);
            bestAnt = findBestAnt(antColony, bestAnt);
        }
    }
}