"""Affiliate Link Tracker"""
import hashlib
import time

class AffiliateTracker:
    def __init__(self):
        self.links = {}
        self.clicks = []

    def create_link(self, user_id: str, campaign: str):
        link_id = hashlib.md5(f"{user_id}:{campaign}:{time.time()}".encode()).hexdigest()[:12]
        self.links[link_id] = {"user_id": user_id, "campaign": campaign, "clicks": 0}
        return link_id

    def track_click(self, link_id: str, ip: str = None):
        if link_id in self.links:
            self.links[link_id]["clicks"] += 1
            self.clicks.append({"link_id": link_id, "ip": ip, "time": time.time()})
            return True
        return False

    def get_stats(self, link_id: str = None):
        if link_id:
            return self.links.get(link_id, {})
        return self.links
