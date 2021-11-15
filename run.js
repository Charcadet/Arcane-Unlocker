// https://ricovz.com/
// Riot X Arcane game: Instant Rewards Unlock.
// Follow the README.md for instructions.
// Credits: Rico, Duong & CoPilot. (:
// Language: Javascript, run in browser console. 

const lang = window.location.toString().split('/')[3];
const uri = "https://xp1missions.riotgames.com";

function parseMissions() {
    let request = new XMLHttpRequest()
    request.open("GET", `${uri}/xp1missions/v1/missions/${lang}`, false)
    request.withCredentials = true;
    request.send();
    let response = request.responseText;
    let missions = JSON.parse(response);

    return missions;
}

function grabToken(missionID) {
    let preStringify = {
        "mission_uid": missionID
    }
    let stringify = JSON.stringify(preStringify)
    let request = new XMLHttpRequest()

    request.open("POST", `${uri}/xp1missions/v1/generateToken/${lang}`, false)
    request.withCredentials = true;
    request.send(stringify);
    let response = request.responseText;
    let token = JSON.parse(response).token;

    return token;
}

function pushMission(missionID) {
    let token = grabToken(missionID);
    let preStringify = {
        "mission_uid": missionID,
        "token": token
    }
    let stringify = JSON.stringify(preStringify)

    let request = new XMLHttpRequest()
    console.log("[💌] Attempting to push mission as completed...\n")
    request.open("POST", `${uri}/xp1missions/v1/completeMission/${lang}`, false)
    request.withCredentials = true;
    request.send(stringify);
    let response = request.responseText;
    let mission = JSON.parse(response);
    console.log("[💚] Pushed mission as finished.\n")
    return mission;
}

function unlockAll() {
    while (true) {
        let allMissions = parseMissions().available_missions;
        let x = 0;
        allMissions.forEach((mission) => {
            if (mission.mission_type == "simple_interactive") {
                pushMission(mission.uid);
                x += 1;
            }
        });
        if (x == 0) {
            break;
        }
    }
    location.reload()
}

console.log("[💙] Starting script...\n")
console.log("[💙] Please be patient, this might take a bit...\n")
unlockAll();