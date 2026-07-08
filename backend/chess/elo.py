"""Elo Rating System for Telegram Chess League"""

class EloRating:
    def __init__(self, k_factor=32):
        self.k_factor = k_factor

    def expected_score(self, rating_a, rating_b):
        return 1 / (1 + 10 ** ((rating_b - rating_a) / 400))

    def update_ratings(self, rating_a, rating_b, score_a):
        """score_a: 1=win, 0.5=draw, 0=loss"""
        expected_a = self.expected_score(rating_a, rating_b)
        expected_b = self.expected_score(rating_b, rating_a)

        new_a = rating_a + self.k_factor * (score_a - expected_a)
        new_b = rating_b + self.k_factor * ((1 - score_a) - expected_b)

        return round(new_a), round(new_b)
