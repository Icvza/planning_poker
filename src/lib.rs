use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use uuid::Uuid;
use wasm_bindgen::prelude::*;

#[derive(Debug)]
pub struct Player {
    name: String,
    is_anonymous: bool,
}

#[derive(Debug)]
pub enum GamePhase {
    Voting,
    Results,
    Created,
}

#[wasm_bindgen]
pub struct GameState {
    players: HashMap<String, Player>,
    votes: HashMap<String, u32>,
    phase: GamePhase,
}

#[wasm_bindgen]
impl GameState {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            players: HashMap::new(),
            votes: HashMap::new(),
            phase: GamePhase::Created,
        }
    }

    #[wasm_bindgen]
    pub fn add_player(&mut self, name: String, anonymous: bool) -> String {
        let id = Uuid::new_v4().to_string();
        self.players.insert(
            id.clone(),
            Player {
                name,
                is_anonymous: anonymous,
            },
        );
        id
    }

    #[wasm_bindgen]
    pub fn submit_vote(&mut self, player_id: String, points: u32) {
        self.votes.insert(player_id, points);
    }

    #[wasm_bindgen]
    pub fn clear_votes(&mut self) {
        self.votes.clear();
    }
}
