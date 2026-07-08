"""Telegram Chess League Manager"""
from .elo import EloRating

class ChessLeague:
    def __init__(self):
        self.elo = EloRating()
        self.players = {}
        self.matches = []

    def register_player(self, user_id, username, initial_rating=1200):
        self.players[user_id] = {
            "username": username,
            "rating": initial_rating,
            "wins": 0,
            "losses": 0,
            "draws": 0
        }
        return self.players[user_id]

    def record_match(self, player_a_id, player_b_id, result):
        """result: 'A' for A wins, 'B' for B wins, 'draw'"""
        pa = self.players.get(player_a_id)
        pb = self.players.get(player_b_id)
        if not pa or not pb:
            return {"error": "Player not found"}

        score_a = 1 if result == "A" else (0.5 if result == "draw" else 0)
        new_a, new_b = self.elo.update_ratings(pa["rating"], pb["rating"], score_a)

        pa["rating"] = new_a
        pb["rating"] = new_b

        if result == "A":
            pa["wins"] += 1; pb["losses"] += 1
        elif result == "B":
            pb["wins"] += 1; pa["losses"] += 1
        else:
            pa["draws"] += 1; pb["draws"] += 1

        self.matches.append({"a": player_a_id, "b": player_b_id, "result": result})
        return {"new_ratings": {player_a_id: new_a, player_b_id: new_b}}

    def get_leaderboard(self):
        return sorted(self.players.values(), key=lambda p: p["rating"], reverse=True)
